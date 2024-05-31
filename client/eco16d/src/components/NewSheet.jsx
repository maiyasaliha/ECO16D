import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css"; 
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

function NewSheet() {
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
        fetchData();
        socket.on('cellUpdated', (updatedCell) => {
            updateGridCell(updatedCell);
        });
    
        return () => {
            socket.off('cellUpdated');
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
    };

    const updateGridCell = (updatedCell) => {
        setRowData(prevRowData => {
            return prevRowData.map(row => {
                if (row._id === updatedCell._id) {
                    return {
                        ...row,
                        [updatedCell.field]: updatedCell.value
                    };
                }
                return row;
            });
        });
    };

    const generateColDefs = async (data) => {
        if (data.length > 0) {
            const keys = Object.keys(data[0]);
            const filteredKeys = keys.filter(key => key !== '_id' && key !== 'rowNumber' & key !== 'index');
            const promises = filteredKeys.map(async key => {
                const cellId = data[0][key];
                const cellData = await fetchCellData(cellId);
                return {
                    field: key,
                    editable: true,
                    filter: true,
                    suppressMovable: true,
                    valueGetter: () => {
                        return cellData ? cellData.value : '';
                    },
                    cellStyle: () => {
                        return {
                            fontFamily: cellData.fontFamily,
                            fontSize: cellData.fontSize,
                            fontWeight: cellData.fontWeight,
                            fontStyle: cellData.fontStyle,
                            textDecoration: cellData.textDecoration,
                            color: cellData.color,
                            backgroundColor: cellData.backgroundColor,
                            textAlign: cellData.textAlign,
                            verticalAlign: cellData.verticalAlign,
                            borderTop: cellData.borderTop,
                            borderRight: cellData.borderRight,
                            borderBottom: cellData.borderBottom,
                            borderLeft: cellData.borderLeft,
                            wrapText: cellData.wrapText
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

    const fetchCellData = async (cellId) => {
        try {
            const response = await axios.get(`http://localhost:3001/cell/${cellId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching cell data:', error);
            return null;
        }
    };

    const fetchCellId = async (cellId, field) => {
        try {
            const response = await axios.get(`http://localhost:3001/cellRow/${cellId}/${field}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching cell data:', error);
            return null;
        }
    };

    const onCellValueChanged = async (params) => {
        const updateCellRowData = {
            _id: params.data._id,
            field: params.colDef.field
        };
        const cellId = await fetchCellId(updateCellRowData._id, updateCellRowData.field);
        
        const updateData = {
            _id: cellId.value,
            value: params.data[params.colDef.field]
        };

        socket.emit('updateCell', updateData);

        axios.post('http://localhost:3001/updateCellText', updateData)
            .then(response => {
                console.log("Data updated successfully:", response.data);
                // updateGridCell(
                //     {
                //      _id: params.data._id, 
                //      field: params.colDef.field, 
                //      cellId: cellId.value,
                //      value: params.data[params.colDef.field] 
                //     }
                // );
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

export default NewSheet
