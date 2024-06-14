import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css"; 
import axios from 'axios';
import io from 'socket.io-client';
import './styles.css'

const socket = io('http://localhost:3001');

function ColisSheet() {
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
        axios.get('http://localhost:3001/colis')
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

    const getHeader = (key) => {
        if (key == "dateCreee") {
            return "date créée";
        } else if (key == "NomDuClient") {
            return "NOM DU CLIENT";
        } else if (key == "Informations") {
            return "INFORMATIONS CRÉÉES SUR LA PAGE PRINCIPALE";
        } else {
            return "BMID";
        }
    }

    const getEditor = (key) => {
        if (key == "dateCreee") {
            return 'agDateStringCellEditor';
        } else if (key == "Informations") {
            return 'agCheckboxCellEditor';
        } else {
            return null;
        }
    }

    const generateColDefs = async (data) => {
        if (data.length > 0) {
            const keys = Object.keys(data[0]);
            const filteredKeys = keys.filter(key => key !== '_id' && key !== 'index' && key != 'undefined');
            console.log(filteredKeys)
            const promises = filteredKeys.map(async key => {
                return {
                    headerName: getHeader(key),
                    headerClass: key == "Informations" ? '.header-group-style3' : '.header-group-style4',
                    field: key,
                    editable: true,
                    filter: true,
                    suppressMovable: true,                    
                    cellEditor: getEditor(key),
                    cellRenderer: key == "Informations" ? 'agCheckboxCellRenderer' : null,
                    wrapHeaderText: true,
                    autoHeaderHeight: true,
                    valueGetter: (params) => params.data[key] || '',
                    valueFormatter: key == "dateCreee" ? (params) => {
                        const value = params.data[key];
                        console.log(value);
                        if (!value) return '';
                        const dateValue = new Date(value);
                        const formattedDate = `${('0' + (dateValue.getMonth() + 1)).slice(-2)}-${('0' + dateValue.getDate()).slice(-2)}-${dateValue.getFullYear()}`;
                        return formattedDate;
                    } : null,
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
                    headerCheckboxSelection: true,
                    resizable: false,
                    cellStyle: {textAlign: 'center'}
                },
            {
                headerName: 'le vert suggère que le numéro de commande existe déjà dans la page principale',
                children: [
                    {
                        headerName: 'le rouge suggère un identifiant de commande incorrect de plus de 8 caractères',
                        children: [
                            {
                                headerName: 'orange suggère un doublon',
                                children: [
                                    {
                                        headerName: 'AXE',
                                        children: resolvedColDefs.slice(0, 3),
                                        headerClass: 'header-group-style4',
                                    },
                                    {
                                        headerName: 'ECO',
                                        children: resolvedColDefs.slice(3),
                                        headerClass: 'header-group-style3',
                                    },
                                ],
                                headerClass: 'header-group-style6',
                            }
                        ],
                        headerClass: 'header-group-style5',
                    }
                ],
                headerClass: 'header-group-style7',
            }
            ];
            setColDefs(colDefs);
        }
    };

    const onCellValueChanged = (params) => {
        const field = params.colDef.field;
        const updateData = {
            _id: params.data._id,
            field: field,
            value: params.data[field]
        };

        axios.post('http://localhost:3001/updateColis', updateData)
            .then(response => {
                socket.emit('updateCell', updateData);
                fetchData();
            })
            .catch(err => {
                console.log('Error updating data:', err);
            });
    };

    return (
        <div>
            <div className="ag-theme-quartz" style={{ height: '100vh', width: '100%' }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    rowSelection={'multiple'}
                    defaultColDef={{ 
                        editable: true,
                        wrapHeaderText: true,
                        autoHeaderHeight: true,
                        resizable: true,
                    }}
                    onCellValueChanged={onCellValueChanged}
                    columnHoverHighlight={true}
                    suppressDragLeaveHidesColumns={true}
                    
                />
            </div>
        </div>
    );
}

export default ColisSheet;
