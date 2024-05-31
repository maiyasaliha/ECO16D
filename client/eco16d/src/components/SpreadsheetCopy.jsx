import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css"; 
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

function SpreadsheetCopy() {
    const [rowData, setRowData] = useState([]);
    const [colDefs, setColDefs] = useState([]);
    const [cellData, setCellData] = useState([]);

    useEffect(() => {
        socket.on('connect', () => {
        });
    
        return () => {
            socket.off('connect');
        };
    }, []);
    
    useEffect(() => {
        axios.get('http://localhost:3001/cellRows')
            .then(response => {
                const data = response.data.map((row, index) => ({
                    ...row,
                    index: index + 1
                }));
                setRowData(data);
                console.log("setting rows")
                generateColDefs(data);
            })
            .catch(err => {
                console.log('Error fetching data:', err);
            });
        socket.on('cellUpdated', (updatedCell) => {
            updateGridCell(updatedCell);
        });
    
        return () => {
            socket.off('cellUpdated');
        };
    }, []);
    

    const updateGridCell = (updatedCell) => {
        setCellData(prevCellData => {
            const updatedCellData = [...prevCellData];
            const cellIndex = updatedCellData.findIndex(cell => cell._id === updatedCell.cellId);
            if (cellIndex !== -1) {
                updatedCellData[cellIndex].value = updatedCell.value;
            }
            return updatedCellData;
        });
    };
    
    
    const generateColDefs = async (data) => {
        if (data.length > 0) {
            const firstRow = data[0];
            const promises = firstRow.cells.map(async cell => {
                const fetchedCellData = await fetchCellData(cell.cellId);
                return {
                    field: cell.col,
                    editable: true,
                    filter: true,
                    suppressMovable: true,
                    cellEditor: fetchedCellData.cellRenderer,
                    valueGetter: () => {
                        return fetchedCellData.value ? fetchedCellData.value : '';
                    },
                    cellStyle: () => {
                        return {
                            fontFamily: fetchedCellData.fontFamily,
                            fontSize: fetchedCellData.fontSize,
                            fontWeight: fetchedCellData.fontWeight,
                            fontStyle: fetchedCellData.fontStyle,
                            textDecoration: fetchedCellData.textDecoration,
                            color: fetchedCellData.color,
                            backgroundColor: fetchedCellData.backgroundColor,
                            textAlign: fetchedCellData.textAlign,
                            verticalAlign: fetchedCellData.verticalAlign,
                            borderTop: fetchedCellData.borderTop,
                            borderRight: fetchedCellData.borderRight,
                            borderBottom: fetchedCellData.borderBottom,
                            borderLeft: fetchedCellData.borderLeft,
                            wrapText: fetchedCellData.wrapText
                        };
                    }
                };
            });
            const resolvedColDefs = await Promise.all(promises);
            setColDefs([
                {
                    headerName: '',
                    field: 'index',
                    pinned: 'left',
                    lockPinned: true,
                    width: 70,
                    sortable: false
                },
                ...resolvedColDefs
            ]);
        }
    };

    const fetchCellData = async (cellId) => {
        try {
            const response = await axios.get(`http://localhost:3001/cell/${cellId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching cell data here:', error);
            return null;
        }
    };

    const onCellValueChanged = (params) => {
        const updateData = {
            _id: params.data._id,
            value: params.newValue
        };


        socket.emit('updateCell', updateData);

        axios.post('http://localhost:3001/updateCellText', updateData)
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

export default SpreadsheetCopy