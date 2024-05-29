import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css"; 
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

function Spreadsheet() {
    const [rowData, setRowData] = useState([]);
    const [colDefs, setColDefs] = useState([]);

    useEffect(() => {
        socket.on('connect', () => {
        });
    
        return () => {
            socket.off('connect');
        };
    }, []);
    
    useEffect(() => {
        axios.get('http://localhost:3001/principale')
            .then(response => {
                setRowData(response.data);
                generateColDefs(response.data);
            })
            .catch(err => {
                console.log('Error fetching data:', err)
            });
            socket.on('cellUpdated', (updatedCell) => {
                updateGridCell(updatedCell);
            });
    
            return () => {
                socket.off('cellUpdated');
            };
    }, []);

    const updateGridCell = (updatedCell) => {
        setRowData(prevRowData => {
            const rowIndex = prevRowData.findIndex(row => row._id === updatedCell._id);
    
            if (rowIndex !== -1) {
                const updatedRowData = [...prevRowData];
                updatedRowData[rowIndex][updatedCell.field] = updatedCell.value;
                return updatedRowData;
            }
    
            return prevRowData;
        });
    };
    
    const generateColDefs = (data) => {
        if (data.length > 0) {
            const keys = Object.keys(data[0]);
            const filteredKeys = keys.filter(key => key !== '_id');
            const colDefs = filteredKeys.map(key => ({
                field: key,
                editable: true,
                filter: true,
            }));
            setColDefs(colDefs);
        }
    };

    const onCellValueChanged = (params) => {
        const updateData = {
            _id: params.data._id,
            field: params.colDef.field,
            value: params.newValue
        };

        socket.emit('updateCell', updateData);

        axios.post('http://localhost:3001/updatePrincipale', updateData)
            .then(response => {
                console.log("Data updated successfully:", response.data);
            })
            .catch(err => {
                console.log('Error updating data:', err);
            });
    };

    const cellStyle = {
        borderRight: '1px solid #ccc',
        borderBottom: '1px solid #ccc'
    };

  return (
    <div
  className="ag-theme-quartz"
  style={{ height: '100vh', width: '100%' }}
 >
   <AgGridReact
       rowData={rowData}
       columnDefs={colDefs}
       rowSelection={'multiple'}
       defaultColDef={{ cellStyle, editable: true }}
       onCellValueChanged={onCellValueChanged}
       columnHoverHighlight={true}
   />
 </div>
  )
}

export default Spreadsheet