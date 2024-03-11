import { useState, useRef, useEffect } from 'react'

import Row from '../row/row.js'
import './table.css'

const maxColumnLength = 64;
const maxRowLength = 2048;

function Table({colMgr, rowMgr}) {
    //let tableDataInitial = addVirtualItems( getInitialData());
    // const [tableData, setTableData] = useState(addVirtualItems( getInitialData()));

    const [tableData, setTableData] = useState(addVirtualItems( getTableDataByRangeManager(colMgr, rowMgr)));
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

    function handleAddRow(cellData, addBefore){
        let newTd = removeVirtualItems(tableData);
        let row = newTd.rows.find(row => row.idx === cellData.rowIdx);
        newTd.rows = [
            ...newTd.rows.slice(0, row.idx + (addBefore ? 0 : 1)),
            getNewRow(newTd, row),
            ...newTd.rows.slice(row.idx + (addBefore ? 0 : 1))
        ]
        row.rangeMgr.addCell(cellData);
        adjustRowIndexes(newTd);
        newTd = addVirtualItems(newTd);
        setTableData(copyTableData(newTd));
    };
    function handleDeleteRow(cellData) {
        let newTd = removeVirtualItems(tableData);
        let rowToDelete = tableData.rows.find(r => r.idx === cellData.rowIdx);
        newTd.rowIds.delete(rowToDelete.id);
        newTd.rows = tableData.rows.filter(r => r.idx !== cellData.rowIdx);
        rowToDelete.rangeMgr.deleteCell(cellData);
        adjustRowIndexes(newTd);
        newTd = addVirtualItems(newTd);
        setTableData(copyTableData(newTd));;
    }
    function handleAddColumn(cell, addBefore){
        let newTd = removeVirtualItems(tableData);
        newTd.rows = tableData.rows.map(row => {
            let idx = tableData.rows.findIndex(r => r.id === row.id);
            return addColumnToRow(row, cell, idx === 0, addBefore);
        });
        cell.rangeMgr.addCell(cell);
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
        cell.rangeMgr.deleteCell(cell);
        adjustRowIndexes(newTd);
        newTd = addVirtualItems(newTd);
        setTableData(copyTableData(newTd));;
    }
    function handleHeaderColumnInput(cell, newText){
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
    
    function getNewRow(tableData, previousRow, useId = true){
        let cells = previousRow.cells.map(
            (val, idx) =>{
                var cell = {
                    id : val.id,
                    text: ``,
                    rangeMgr: val.rangeMgr,
                    isHeader: idx === 0,
                }
                if(useId)
                {
                    cell = previousRow.rangeMgr.getCellModifier(previousRow.idx)(cell);
                    cell = val.rangeMgr.getCellModifier(idx)(cell);
                }
                return cell;
            });
        let row = {
            idx : -1,
            rangeMgr: previousRow.rangeMgr,
            cells : cells,
            cellIds : new Set(cells.map(c => c.id))
        }
        if(useId){
            ApplyIdToRow(tableData, row);
        }
        
        return row;
    }
    function addColumnToRow(row, cell, isHeaderCell = false, addBefore = false){
        let newCell = {text: ``, rowIdx: row.idx, isHeader : isHeaderCell, rangeMgr: cell.rangeMgr };
        newCell = row.rangeMgr.getCellModifier(row.idx)(newCell);
        newCell = newCell.rangeMgr.getCellModifier(cell.idx)(newCell);
        row.cells = [
            ...row.cells.slice(0, cell.idx + (addBefore ? 0 : 1)),
            newCell,
            ...row.cells.slice(cell.idx + (addBefore ? 0 : 1))
        ]
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
    
        var row = getNewRow(tableData, rows[rows.length - 1], false);
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
    
    function getTableDataByRangeManager(colMgr, rowMgr){
        let rowIdx = 0; 
        let rows = [];
        for (let rowRng of rowMgr.ranges){
            for(let rngIdx = rowRng.rangeStartIdx; rngIdx <= rowRng.rangeEndIdx; rngIdx++){
                let row = {
                    id: 0, 
                    idx: rowIdx,
                    cellIds : new Set(),
                    rangeMgr: rowMgr,
                }
                row.cells = [];
                let colIdx = 0;
                for(let colRng of colMgr.ranges){
                    for (let colRngIdx = colRng.rangeStartIdx; colRngIdx <= colRng.rangeEndIdx; colRngIdx++){
                        let cellData = {
                            id: 0, 
                            idx: colIdx,
                            isVirtual: false,
                            rangeMgr: colMgr,
                        }
                        cellData = colRng.cellModifier(rowRng.cellModifier(cellData));
                        row.cells.push(cellData);
                        ++colIdx;
                    }
                }
                rows.push(row);
                ++rowIdx;
            }
        }

        let tableData = {
            rowIds: new Set(),
            rows: rows
        }

        for(let row of tableData.rows){
            ApplyIdToRow(tableData, row);
            for(let id of row.cells.map(c => c.id)){
                row.cellIds.add(id);
            }
        }

        
        return tableData;
    }

    // function getInitialData() {
    //     let tableData = 
    //     {
    //         rowIds: new Set(),
    //         rows:
    //         [
    //             {id: 0, idx:0, cells: [{ id: 0, idx: 0, rowIdx:0, text: "", isHeader: 'true', isVirtual : false}, { id: 1, idx:1, rowIdx:0, text: "h2", isHeader: 'true', isVirtual : false}], cellIds : new Set() },
    //             {id: 1, idx:1, cells: [{ id: 0, idx: 0, rowIdx:1, text: "val 1", isHeader: 'true', isVirtual : false}, { id: 1, idx:1, rowIdx:0, text: "val 2", isVirtual : false}], cellIds : new Set() },
    //         ]
    //     }
    //     for(let row of tableData.rows){
    //         ApplyIdToRow(tableData, row);
    //         for(let id of row.cells.map(c => c.id)){
    //             row.cellIds.add(id);
    //         }
    //     }
    //     return tableData;
    // }
    
    function copyTableData(tableData){
        return {
            rowIds : tableData.rowIds,
            rows: tableData.rows,
        }
    }
    
    return (
        <div>
            <table>
                <tbody>
                    {
                        tableData.rows.map((val, key) => {
                        return (
                            <Row rowData={val} 
                                addRow={handleAddRow} 
                                deleteRow={handleDeleteRow} 
                                addColumn={handleAddColumn}
                                deleteColumn={handleDeleteColumn}
                                cellTextInput={handleHeaderColumnInput}
                                cellClick={handleCellClick}/>
                        )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table;