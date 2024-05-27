import React, {useState} from 'react'
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css"; 

function Spreadsheet() {
    const pagination = true;
    const paginationPageSize = 5;
    const paginationPageSizeSelector = [2, 5, 1000];
    const CustomButtonComponent = (props) => {
        return <button onClick={() => window.alert('clicked') }>Push Me!</button>;
      };
    

    const [rowData, setRowData] = useState([
        { make: "Tesla", model: "Model Y", price: 64950, electric: true },
        { make: "Ford", model: "F-Series", price: 33850, electric: false },
        { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    ]);
    
    const [colDefs, setColDefs] = useState([
        { 
            field: "make", 
            editable: true, 
            filter: true, 
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
                values: ['Tesla', 'Ford', 'Toyota'],
            }, 
            checkboxSelection: true 
        },
        { field: "model", editable: true, filter: true },
        { field: "price", editable: true, valueFormatter: p => '£' + p.value.toLocaleString(), filter: true },
        { field: "electric", editable: true, filter: true },
        { field: "button", cellRenderer: CustomButtonComponent }
    ]);
  return (
    <div
  className="ag-theme-quartz" // applying the grid theme
  style={{ height: 500 }} // the grid will fill the size of the parent container
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