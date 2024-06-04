import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css"; 
import axios from 'axios';
import io from 'socket.io-client';
import './styles.css'

const socket = io('http://localhost:3001');

function Spreadsheet({ selectedCell, 
    setSelectedCell, bgcolor, color, clear, setClear, bold, italic, 
    underline, strikeThrough, b, i, s, u, fontFamily, w, wrapText, fontSize, textAlign, a }) {
    const [rowData, setRowData] = useState([]);
    const [colDefs, setColDefs] = useState([]);

    useEffect(() => {
        socket.on('connect', () => {});

        const handleCellUpdated = (updatedCell) => {
            fetchData();
        };

        socket.on('cellUpdated', handleCellUpdated);

        return () => {
            socket.off('connect');
            socket.off('cellUpdated', handleCellUpdated);
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
    }, []);
    
    const generateColDefs = async (data) => {
        if (data.length > 0) {
            const keys = Object.keys(data[0]);
            const filteredKeys = keys.filter(key => key !== '_id' && key !== 'index' && key != 'undefined');
            const promises = filteredKeys.map(async key => {
                return {
                    headerName: key,
                    field: key,
                    editable: true,
                    filter: true,
                    suppressMovable: true,
                    cellClass: (params) => params.data[key].wrapText ? 'wrap-text' : '',
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
                            whiteSpace: style.wrapText ? 'normal' : 'nowrap'
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

        axios.post('http://localhost:3001/updateCellProperty', updateData)
            .then(response => {
                socket.emit('updateCell', updateData);
                fetchData();
            })
            .catch(err => {
                console.log('Error updating data:', err);
            });
    };

    const onCellClicked = (params) => {
        const colId = params.column.getId();
        const cellData = params.data[colId];
        setSelectedCell({
            rowIndex: params.rowIndex,
            colId: colId,
            data: cellData ? cellData.value : null,
            _id: params.data._id
        });
    };

    useEffect(() => {
        if (selectedCell && selectedCell._id && selectedCell.colId && bgcolor) {
            const updateData = {
                _id: selectedCell._id,
                field: selectedCell.colId,
                property: 'backgroundColor',
                value: bgcolor
            };

            axios.post('http://localhost:3001/updateCellProperty', updateData)
                .then(response => {
                    socket.emit('updateCell', updateData);
                    fetchData();
                })
                .catch(err => {
                    console.log('Error updating data:', err);
                });
        }
    }, [bgcolor]);

    useEffect(() => {
        if (selectedCell && selectedCell._id && selectedCell.colId && color) {
            const updateData = {
                _id: selectedCell._id,
                field: selectedCell.colId,
                property: 'color',
                value: color
            };

            axios.post('http://localhost:3001/updateCellProperty', updateData)
                .then(response => {
                    socket.emit('updateCell', updateData);
                    fetchData();
                })
                .catch(err => {
                    console.log('Error updating data:', err);
                });
        }
    }, [color]);

    useEffect(() => {
        if (selectedCell && selectedCell._id && selectedCell.colId && fontFamily) {
            const updateData = {
                _id: selectedCell._id,
                field: selectedCell.colId,
                property: 'fontFamily',
                value: fontFamily
            };

            axios.post('http://localhost:3001/updateCellProperty', updateData)
                .then(response => {
                    socket.emit('updateCell', updateData);
                    fetchData();
                })
                .catch(err => {
                    console.log('Error updating data:', err);
                });
        }
    }, [fontFamily]);

    useEffect(() => {
        if (selectedCell && selectedCell._id && selectedCell.colId && fontSize) {
            console.log("increasing size " + fontSize)
            const updateData = {
                _id: selectedCell._id,
                field: selectedCell.colId,
                property: 'fontSize',
                value: fontSize
            };

            axios.post('http://localhost:3001/updateCellProperty', updateData)
                .then(response => {
                    socket.emit('updateCell', updateData);
                    fetchData();
                })
                .catch(err => {
                    console.log('Error updating data:', err);
                });
        }
    }, [fontSize]);

    useEffect(() => {
        if (selectedCell && selectedCell._id && selectedCell.colId && bold && b) {
            console.log("updating bold " + bold)
            const updateData = {
                _id: selectedCell._id,
                field: selectedCell.colId,
                property: 'fontWeight',
                value: bold
            };

            axios.post('http://localhost:3001/updateCellProperty', updateData)
                .then(response => {
                    socket.emit('updateCell', updateData);
                    fetchData();
                })
                .catch(err => {
                    console.log('Error updating data:', err);
                });
        }
    }, [b]);

    useEffect(() => {
        if (selectedCell && selectedCell._id && selectedCell.colId && italic && i) {
            const updateData = {
                _id: selectedCell._id,
                field: selectedCell.colId,
                property: 'fontStyle',
                value: italic
            };

            axios.post('http://localhost:3001/updateCellProperty', updateData)
                .then(response => {
                    socket.emit('updateCell', updateData);
                    fetchData();
                })
                .catch(err => {
                    console.log('Error updating data:', err);
                });
        }
    }, [i]);

    useEffect(() => {
        if (selectedCell && selectedCell._id && selectedCell.colId && underline && u) {
            const updateData = {
                _id: selectedCell._id,
                field: selectedCell.colId,
                property: 'textDecoration',
                value: underline
            };

            axios.post('http://localhost:3001/updateCellProperty', updateData)
                .then(response => {
                    socket.emit('updateCell', updateData);
                    fetchData();
                })
                .catch(err => {
                    console.log('Error updating data:', err);
                });
        }
    }, [u]);

    useEffect(() => {
        if (selectedCell && selectedCell._id && selectedCell.colId && strikeThrough && s) {
            const updateData = {
                _id: selectedCell._id,
                field: selectedCell.colId,
                property: 'textDecoration',
                value: strikeThrough
            };

            axios.post('http://localhost:3001/updateCellProperty', updateData)
                .then(response => {
                    socket.emit('updateCell', updateData);
                    fetchData();
                })
                .catch(err => {
                    console.log('Error updating data:', err);
                });
        }
    }, [s]);

    useEffect(() => {
        if (selectedCell && selectedCell._id && selectedCell.colId && w) {
            console.log("wrap is " + wrapText)
            const updateData = {
                _id: selectedCell._id,
                field: selectedCell.colId,
                property: 'wrapText',
                value: wrapText
            };

            axios.post('http://localhost:3001/updateCellProperty', updateData)
                .then(response => {
                    socket.emit('updateCell', updateData);
                    fetchData();
                })
                .catch(err => {
                    console.log('Error updating data:', err);
                });
        }
    }, [w]);

    useEffect(() => {
        if (selectedCell && selectedCell._id && selectedCell.colId && clear) {
            const updateData = {
                _id: selectedCell._id,
                field: selectedCell.colId
            };
            axios.post('http://localhost:3001/clearCellProperty', updateData)
            .then(response => {
                console.log(response.data.message);
                socket.emit('updateCell', updateData);
                fetchData();
            })
            .catch(error => {
                console.error('Error clearing formatting:', error);
            });
        } else {
        }
        setClear(false);
    }, [clear]);

    useEffect(() => {
        if (selectedCell && selectedCell._id && selectedCell.colId && textAlign && a) {
            console.log("textAlign is " + textAlign)
            const updateData = {
                _id: selectedCell._id,
                field: selectedCell.colId,
                property: 'textAlign',
                value: textAlign
            };
            axios.post('http://localhost:3001/updateCellProperty', updateData)
            .then(response => {
                console.log(response.data.message);
                socket.emit('updateCell', updateData);
                fetchData();
            })
            .catch(error => {
                console.error('Error clearing formatting:', error);
            });
        } else {
        }
    }, [a]);
    
    const cellStyle = {
        borderRight: '1px solid #ccc',
        borderBottom: '1px solid #ccc'
    };

    return (
        <div className="ag-theme-quartz" style={{ height: '100vh', width: '100%' }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                rowSelection={'multiple'}
                defaultColDef={{ editable: true }}
                onCellValueChanged={onCellValueChanged}
                onCellClicked={onCellClicked}
                columnHoverHighlight={true}
                suppressDragLeaveHidesColumns={true}
            />
        </div>
    );
}

export default Spreadsheet;
