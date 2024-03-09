import { useState, useRef, useEffect } from 'react'
import logo from './logo.svg';
import './App.css';

// Filename - App.js
import './App.css';
import Table from './components/table/table'

const maxColumnLength = 64;
const maxRowLength = 2048;

function App() {
    const [tableData, setTableData] = useState(tableDataInitial);
    let selection = useRef(null);

    useEffect(() => {
        if(selection.current){
            document.getSelection().setBaseAndExtent(
                selection.current.anchor,
                selection.current.anchorOffset,
                selection.current.focus,
                selection.current.focusOffset
            );
        }
      });

    function handleAddRow(cellData){
        let newTd = removeVirtualItems(tableData);
        let row = newTd.rows.find(row => row.idx === cellData.rowIdx);
        newTd.rows = [
            ...newTd.rows.slice(0, row.idx + 1),
            getNewRow(newTd, ++currentId, row),
            ...newTd.rows.slice(row.idx + 1)
        ]
        adjustRowIndexes(newTd);
        newTd = addVirtualItems(newTd);
        setTableData(copyTableData(newTd));
        console.log(newTd);
    };
    function handleDeleteRow(cellData) {
        let newTd = removeVirtualItems(tableData);
        let rowToDelete = tableData.rows.find(r => r.idx === cellData.rowIdx);
        newTd.rowIds.delete(rowToDelete.id);
        newTd.rows = tableData.rows.filter(r => r.idx !== cellData.rowIdx);
        
        adjustRowIndexes(newTd);
        newTd = addVirtualItems(newTd);
        setTableData(copyTableData(newTd));;
    }
    function handleAddColumn(cell){
        let newTd = removeVirtualItems(tableData);
        newTd.rows = tableData.rows.map(row => {
            let idx = tableData.rows.findIndex(r => r.id === row.id);
            return addColumnToRow(row, cell, idx === 0);
        });
        adjustRowIndexes(newTd);
        newTd = addVirtualItems(newTd);
        setTableData(copyTableData(newTd));;
    }
    function handleDeleteColumn(cell){
        let newTd = removeVirtualItems(tableData);
        newTd.rows = tableData.rows.map(row => {
            let idx = tableData.rows.findIndex(r => r.id === row.id);
            return deleteColumnFromRow(row, cell, idx === 0);
        });
        adjustRowIndexes(newTd);
        newTd = addVirtualItems(newTd);
        setTableData(copyTableData(newTd));;
    }
    function handleHeaderColumnInput(event, cell, newText){

        let currSelection = document.getSelection();
        selection.current = 
        {   
            anchor: currSelection.anchorNode, 
            anchorOffset: currSelection.anchorOffset,
            focus: currSelection.focusNode,
            focusOffset : currSelection.focusOffset
        };
        cell.text = newText;
        setTableData(copyTableData(tableData))
        
    }
    function handleCellClick(cell){
        //console.log(cell);
    }
    
    return (
        <Table rows={tableData.rows} 
                addRow={handleAddRow} 
                deleteRow={handleDeleteRow} 
                addColumn={handleAddColumn}
                deleteColumn={handleDeleteColumn}
                cellTextInput={handleHeaderColumnInput}
                cellClick={handleCellClick}/>
    )
}

function adjustRowIndexes(tableData){
    for(let i = 0; i < tableData.rows.length; i++){
        let row = tableData.rows[i];
        row.idx = i;
        for(let j = 0; j < row.cells.length; j++){
            let cell = row.cells[j];
            adjustCellIndex(cell, j, i, tableData.rows.length, row.cells.length, false, row.id);
        }
    }
}

function getNewRow(tableData, id, previousRow, useId = true){
    let cells = previousRow.cells.map(
        (val, idx) =>{
            return {
                id : val.id,
                text: ``,
                isHeader: idx === 0,
            }
        });
    let row = {
        idx : -1,
        cells : cells,
        cellIds : new Set(cells.map(c => c.id))
    }
    if(useId){
        ApplyIdToRow(tableData, row);
    }
    
    return row;
}
function addColumnToRow(row, cell, isHeaderCell = false){
    let newCell = {text: ``, isHeader : isHeaderCell};
    row.cells.splice(cell.idx + 1, 0, newCell);
    ApplyIdToCell(row, newCell);
    return row;
}
function deleteColumnFromRow(row, cell){
    row.cells.splice(cell.idx, 1);
    row.cellIds.delete(cell.id);
    return row;
}
function adjustCellIndex(cell, cellIdx, rowIdx, rowCnt, colCnt, isVirtual, rowId){
    cell.idx = cellIdx;
    cell.rowIdx = rowIdx;
    cell.rowCnt = rowCnt;
    cell.colCnt = colCnt;
    cell.isVirtual = isVirtual;
}
function addVirtualItems(tableData){
    let rows = tableData.rows;
    let lastRow = rows[rows.length - 1];
    const firstCell = lastRow.cells[0];
    if(firstCell.isVirtual){
        return;
    }

    const firstRow = rows[0];
    const lastCell = firstRow.cells[firstRow.cells.length - 1];
    if(lastCell.isVirtual){
        return;
    }

    rows = rows.map(row => {
        return addColumnToRow(row, row.cells[row.cells.length - 1]);
    });

    var row = getNewRow(tableData, ++currentId, rows[rows.length - 1], false);
    row.idx = rows.length;
    rows = [...rows, row];

    //adjust indexes - for last column
    for(let i = 0; i < rows.length; i++){
        let row = rows[i];
        let cell = row.cells[row.cells.length - 1];
        adjustCellIndex(cell, row.cells.length - 1, i, rows.length, row.cells.length, true, row.id);
    }

    //adjust indexes - for last row
    lastRow = rows[rows.length - 1];
    for(let i = 0; i < row.cells.length; i++){
        let cell = row.cells[i];
        adjustCellIndex(cell, i, row.idx, rows.length, row.cells.length, true, row.id);
    }

    tableData.rows = rows;
    return tableData;
}

function removeVirtualItems(tableData){
    tableData = removeVirtualRow(tableData);
    tableData = removeVirtualColumn(tableData);
    return tableData;
}
function removeVirtualRow(tableData){
    const rows = tableData.rows;
    const lastRow = rows[rows.length - 1];
    const firstCell = lastRow.cells[0];
    if(firstCell.isVirtual){
        rows.splice(rows.length - 1, 1);
    }
    tableData.rows = rows;
    return tableData;
}
function removeVirtualColumn(tableData){
    let rows = tableData.rows;
    const firstRow = rows[0];
    const lastCell = firstRow.cells[firstRow.cells.length - 1];
    if(lastCell.isVirtual){
        rows = rows.map(row => {
            return deleteColumnFromRow(row, row.cells[row.cells.length - 1]);
        });
    }
    tableData.rows = rows;
    return tableData;
}

function ApplyIdToCell(row, cell){
    let id = maxColumnLength * 2;
    for(let i = 0; i < maxColumnLength * 2; i++){
        if(!row.cellIds.has(i)){
            id = i;
            break;
        }
    }
    cell.id = id;
    row.cellIds.add(id);
}

function ApplyIdToRow(tableData, row){
    let id = maxRowLength*2;
    for(let i = 0; i < maxRowLength * 2; i++){
        if(!tableData.rowIds.has(i)){
            id = i;
            break;
        }
    }
    row.id = id;
    tableData.rowIds.add(id);
}

let currentId = 2;
function getInitialData() {
    let tableData = 
    {
        rowIds: new Set(),
        rows:
        [
            {id: 0, idx:0, cells: [{ id: 0, idx: 0, text: "h1", isHeader: 'true', isVirtual : false}, { id: 1, idx:1, text: "h2", isHeader: 'true', isVirtual : false}], cellIds : new Set() },
            {id: 1, idx:1, cells: [{ id: 0, idx: 0, text: "val 1", isHeader: 'true', isVirtual : false}, { id: 1, idx:1, text: "val 2", isVirtual : false}], cellIds : new Set() },
        ]
    }
    for(let row of tableData.rows){
        ApplyIdToRow(tableData, row);
        for(let id of row.cells.map(c => c.id)){
            row.cellIds.add(id);
        }
    }
    return tableData;
}

function copyTableData(tableData){
    return {
        rowIds : tableData.rowIds,
        rows: tableData.rows,
    }
}
let tableDataInitial = addVirtualItems( getInitialData());


export default App;
