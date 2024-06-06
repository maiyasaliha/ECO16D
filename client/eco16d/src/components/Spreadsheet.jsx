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
    underline, strikeThrough, b, i, s, u, fontFamily, fontSize, textAlign, a, 
    format, f, editor, e, z, m, merge, p, pin}) {
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
            const filteredKeys = keys.filter(key => key !== '_id' && key !== 'index' && key != 'undefined' && key != 'pin');
            const promises = filteredKeys.map(async key => {
                let cellEditorFramework; 
                let renderer = false;
                let date = false;
                cellEditorFramework = data[0][key].cellRenderer;
                if (cellEditorFramework == 'agCheckboxCellEditor') {
                    renderer = true;
                }
                if (cellEditorFramework == 'agDateCellEditor') {
                    date = true;
                }
                return {
                    headerName: key,
                    field: key,
                    editable: true,
                    filter: true,
                    suppressMovable: true,
                    cellEditor: cellEditorFramework,
                    cellRenderer: renderer ? 'agCheckboxCellRenderer' : '',
                    colSpan: (params) => params.data[key].span,
                    valueGetter: (params) => {
                    return params.data[key]?.value || '';
                    },
                    valueFormatter: date ? (params) => {
                        const value = params.value;
                        if (!value) return '';
                        const dateValue = new Date(value);
                        const formattedDate = `${('0' + (dateValue.getMonth() + 1)).slice(-2)}-${('0' + dateValue.getDate()).slice(-2)}-${dateValue.getFullYear()}`;
                        return formattedDate;
                    } : null,
                    cellStyle: (params) => {
                        const style = params.data[key];
                        return {
                            fontFamily: style?.fontFamily,
                            fontSize: style?.fontSize,
                            fontWeight: style?.fontWeight,
                            fontStyle: style?.fontStyle,
                            textDecoration: style?.textDecoration,
                            color: style?.color,
                            backgroundColor: style?.backgroundColor,
                            textAlign: style?.textAlign,
                            verticalAlign: style?.verticalAlign,
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
                    sortable: false,
                    cellStyle: {textAlign: 'center'}
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
        if (selectedCell && selectedCell._id && selectedCell.colId && fontSize && z) {
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
    }, [z]);

    useEffect(() => {
        if (selectedCell && selectedCell._id && selectedCell.colId && bold && b) {
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
            const updateData = {
                _id: selectedCell._id,
                field: selectedCell.colId,
                property: 'textAlign',
                value: textAlign
            };
            axios.post('http://localhost:3001/updateCellProperty', updateData)
            .then(response => {
                socket.emit('updateCell', updateData);
                fetchData();
            })
            .catch(error => {
                console.error('Error updating data: ', error);
            });
        } else {
        }
    }, [a]);

    useEffect(() => {
        if (selectedCell && selectedCell._id && selectedCell.colId && format && f) {
            console.log("setting " + format.value + " for " + selectedCell._id + " " + selectedCell.colId)
            const updateData = {
                _id: selectedCell._id,
                field: selectedCell.colId,
                property: 'format',
                value: format.value
            };
            axios.post('http://localhost:3001/updateCellProperty', updateData)
            .then(response => {
                socket.emit('updateCell', updateData);
                fetchData();
            })
            .catch(error => {
                console.error('Error updating data: ', error);
            });
        } else {
        }
    }, [f]);

    useEffect(() => {
        if (selectedCell && selectedCell._id && selectedCell.colId && merge && m) {
            console.log("setting " + merge + " for " + selectedCell._id + " " + selectedCell.colId)
            const updateData = {
                _id: selectedCell._id,
                field: selectedCell.colId,
                property: 'span',
                value: merge
            };
            axios.post('http://localhost:3001/updateCellProperty', updateData)
            .then(response => {
                socket.emit('updateCell', updateData);
                fetchData();
            })
            .catch(error => {
                console.error('Error updating data: ', error);
            });
        } else {
        }
    }, [m]);

    useEffect(() => {
        if (selectedCell && selectedCell._id && selectedCell.colId && editor && e) {
            console.log("setting " + editor + " for " + selectedCell._id + " " + selectedCell.colId)
            const updateData = {
                _id: selectedCell._id,
                field: selectedCell.colId,
                property: 'cellRenderer',
                value: editor
            };
            axios.post('http://localhost:3001/updateCellProperty', updateData)
            .then(response => {
                socket.emit('updateCell', updateData);
                fetchData();
            })
            .catch(error => {
                console.error('Error updating data:', error);
            });
        } else {
        }
    }, [e]);

    useEffect(() => {
        if (selectedCell && selectedCell._id && selectedCell.colId && p) {
            console.log("setting " + pin + " for " + selectedCell._id)
            const updateData = {
                _id: selectedCell._id,
                value: pin
            };
            axios.post('http://localhost:3001/pin', updateData)
            .then(response => {
                socket.emit('pinCell', updateData);
                fetchData();
            })
            .catch(error => {
                console.error('Error updating data:', error);
            });
        } else {
        }
    }, [p]);


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
