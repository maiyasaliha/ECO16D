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

    const fetchData = () => {
        axios.get('http://localhost:3001/cellRows')
            .then(response => {
                const data = response.data.map((row, index) => ({
                    ...row,
                    index: index + 1
                }));
                setRowData(data);
                generateColDefs(data);
            })
            .catch(err => {
                console.log('Error fetching data:', err);
            });
    }
    
    useEffect(() => {
        fetchData();
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
    
    const generateColDefs = async (data) => {
        if (data.length > 0) {
            const keys = Object.keys(data[0]);
            const filteredKeys = keys.filter(key => key !== '_id' && key !== 'index');
            const promises = filteredKeys.map(async key => {
                return {
                    headerName: key,
                    field: key,
                    editable: true,
                    filter: true,
                    suppressMovable: true,
                    valueGetter: (params) => params.data[key].value || '',
                    cellStyle: (params) => {
                        const style = params.data[key];
                        return {
                            fontFamily: style.fontFamily,
                            fontSize: style.fontSize,
                            fontWeight: style.fontWeight,
                            fontStyle: style.fontStyle,
                            textDecoration: style.textDecoration,
                            color: style.color,
                            backgroundColor: style.backgroundColor,
                            textAlign: style.textAlign,
                            verticalAlign: style.verticalAlign,
                            borderTop: style.borderTop,
                            borderRight: style.borderRight,
                            borderBottom: style.borderBottom,
                            borderLeft: style.borderLeft,
                            wrapText: style.wrapText
                        };
                    }
                };
            });
            const resolvedColDefs = await Promise.all(promises);
            const colDefs = [
                {
                    headerName: '',
                    field: 'index',
                    pinned: 'left',
                    lockPinned: true,
                    width: 70,
                    sortable: false
                },
                ...resolvedColDefs
            ];
            setColDefs(colDefs);
        }
    };

    const onCellValueChanged = (params) => {
        const field = params.colDef.field;
        const updateData = {
            _id: params.data._id,
            field: field,
            property: "value",
            value: params.data[field]
        };

        socket.emit('updateCell', updateData);

        axios.post('http://localhost:3001/updateCellProperty', updateData)
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
       suppressDragLeaveHidesColumns={true}
   />
 </div>
  )
}

export default Spreadsheet