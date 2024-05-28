import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css"; 
import axios from 'axios';

function Spreadsheet() {
    const pagination = true;
    const paginationPageSize = 5;
    const paginationPageSizeSelector = [5, 10, 50];

    const [rowData, setRowData] = useState([]);
    const [colDefs, setColDefs] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:3001/principale')
            .then(response => {
                console.log("Fetched data:" + response.data);
                setRowData(response.data);
                generateColDefs(response.data);
            })
            .catch(err => {
                console.log('Error fetching data:', err)
            });
    }, []);
    
    const generateColDefs = (data) => {
        if (data.length > 0) {
            const keys = Object.keys(data[0]);
            const filteredKeys = keys.filter(key => key !== '_id');
            const colDefs = filteredKeys.map(key => ({
                field: key,
                editable: true,
                filter: true,
            }));
            console.log('Generated colDefs:', colDefs);
            setColDefs(colDefs);
        }
    };

  return (
    <div
  className="ag-theme-quartz"
  style={{ height: 500 }}
 >
   <AgGridReact
       rowData={rowData}
       columnDefs={colDefs}
       rowSelection={'multiple'}
       pagination={pagination}
       paginationPageSize={paginationPageSize}
       paginationPageSizeSelector={paginationPageSizeSelector}
   />
 </div>
  )
}

export default Spreadsheet