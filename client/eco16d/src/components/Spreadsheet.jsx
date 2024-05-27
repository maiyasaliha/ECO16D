import React, {useState} from 'react'
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css"; 
import ColourPicker from './tools/ColourPicker';
import BoldButton from './tools/BoldButton';


function Spreadsheet() {
    const pagination = true;
    const paginationPageSize = 5;
    const paginationPageSizeSelector = [5, 10, 50];

    const [rowData, setRowData] = useState([
        { make: "Tesla", model: "Model Y", price: 64950, electric: true },
        { make: "Ford", model: "F-Series", price: 33850, electric: false },
        { make: "Toyota", model: "Corolla", price: 29600, electric: false },
        { make: "Honda", model: "Civic", price: 22500, electric: false },
        { make: "Chevrolet", model: "Silverado", price: 28995, electric: false },
        { make: "Nissan", model: "Altima", price: 24980, electric: false },
        { make: "BMW", model: "3 Series", price: 41900, electric: false },
        { make: "Mercedes-Benz", model: "C-Class", price: 43700, electric: false },
        { make: "Audi", model: "A4", price: 40000, electric: false },
        { make: "Subaru", model: "Outback", price: 26995, electric: false },
        { make: "Hyundai", model: "Elantra", price: 19950, electric: false },
        { make: "Volkswagen", model: "Jetta", price: 20195, electric: false },
        { make: "Lexus", model: "RX", price: 45520, electric: false },
        { make: "Mazda", model: "CX-5", price: 25990, electric: false },
        { make: "Kia", model: "Soul", price: 17990, electric: false },
        { make: "Jeep", model: "Wrangler", price: 28995, electric: false },
        { make: "GMC", model: "Sierra", price: 29995, electric: false },
        { make: "Ram", model: "1500", price: 32745, electric: false },
        { make: "Buick", model: "Encore", price: 23995, electric: false },
        { make: "Volvo", model: "XC90", price: 49900, electric: false },
        { make: "Infiniti", model: "Q50", price: 36400, electric: false },
        { make: "Chrysler", model: "Pacifica", price: 34995, electric: false },
        { make: "Ford", model: "Escape", price: 25900, electric: false },
        { make: "Toyota", model: "Camry", price: 24925, electric: false },
        { make: "Honda", model: "Accord", price: 24970, electric: false },
        { make: "Chevrolet", model: "Equinox", price: 23800, electric: false },
        { make: "Nissan", model: "Rogue", price: 25900, electric: false },
        { make: "BMW", model: "5 Series", price: 54400, electric: false },
        { make: "Mercedes-Benz", model: "E-Class", price: 54700, electric: false },
        { make: "Audi", model: "Q5", price: 42900, electric: false },
        { make: "Subaru", model: "Forester", price: 24495, electric: false },
        { make: "Hyundai", model: "Tucson", price: 23800, electric: false },
        { make: "Volkswagen", model: "Tiguan", price: 25195, electric: false },
        { make: "Lexus", model: "NX", price: 37780, electric: false },
        { make: "Mazda", model: "Mazda3", price: 20900, electric: false },
        { make: "Kia", model: "Sportage", price: 24990, electric: false },
        { make: "Jeep", model: "Cherokee", price: 25995, electric: false },
        { make: "GMC", model: "Terrain", price: 25595, electric: false },
        { make: "Ram", model: "2500", price: 33095, electric: false },
        { make: "Buick", model: "Enclave", price: 40895, electric: false },
        { make: "Volvo", model: "S60", price: 36400, electric: false },
        { make: "Infiniti", model: "QX60", price: 44550, electric: false },
        { make: "Chrysler", model: "300", price: 30745, electric: false },
        { make: "Ford", model: "Explorer", price: 32315, electric: false },
        { make: "Toyota", model: "Highlander", price: 31525, electric: false },
        { make: "Honda", model: "Pilot", price: 32100, electric: false },
        { make: "Chevrolet", model: "Traverse", price: 29995, electric: false },
        { make: "Nissan", model: "Pathfinder", price: 31990, electric: false },
        { make: "BMW", model: "X3", price: 41400, electric: false },
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
            cellStyle: (params) => ({
                backgroundColor: params.value === 'Tesla' ? '#567123' : '#987654',
                fontWeight: params.value === 'Tesla' ? '' : 'bold',
            })
        },
        { field: "model", editable: true, filter: true },
        { field: "price", editable: true, valueFormatter: p => '£' + p.value.toLocaleString(), filter: true },
        { field: "electric", editable: true, filter: true, cellStyle: (params) => ({
            backgroundColor: params.value ? '#123456' : '#972314'
        }) },
        { 
            field: "description", 
            editable: true,
            cellStyle: { backgroundColor: '#987654'}
        },
    ]);
  return (
    <div
  className="ag-theme-quartz"
  style={{ height: 500 }}
 >
    <ColourPicker/>
    <BoldButton/>
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