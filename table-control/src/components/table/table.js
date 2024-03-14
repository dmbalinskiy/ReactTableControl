import { useState, useRef, useEffect } from 'react'
import Row from '../row/row.js'
import './table.css'
import { exportImportHelper } from '../../logic/exportImportHelper.js';

const maxColumnLength = 64;
const maxRowLength = 2048;

function Table({colMgr, rowMgr}) {

    const [tableData, setTableData] = useState(adjustRowIndexes(getTableDataByRangeManager(colMgr, rowMgr)));
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
        let newTd = tableData;
        let row = newTd.rows.find(row => row.idx === cellData.rowIdx);
        newTd.rows = [
            ...newTd.rows.slice(0, row.idx + (addBefore ? 0 : 1)),
            getNewRow(newTd, row),
            ...newTd.rows.slice(row.idx + (addBefore ? 0 : 1))
        ]
        row.rangeMgr.addCell(cellData);
        newTd = adjustRowIndexes(newTd);
        newTd = copyTableData(newTd)
        setTableData(newTd);
    };
    function handleDeleteRow(cellData) {
        let newTd = tableData;
        let rowToDelete = tableData.rows.find(r => r.idx === cellData.rowIdx);
        newTd.rowIds.delete(rowToDelete.id);
        newTd.rows = tableData.rows.filter(r => r.idx !== cellData.rowIdx);
        rowToDelete.rangeMgr.deleteCell(cellData);
        newTd = adjustRowIndexes(newTd);
        newTd = copyTableData(newTd)
        setTableData(newTd);;
    }
    function handleAddColumn(cell, addBefore){
        let newTd = tableData;
        newTd.rows = tableData.rows.map(row => {
            let idx = tableData.rows.findIndex(r => r.id === row.id);
            return addColumnToRow(row, cell, idx === 0, addBefore);
        });
        cell.rangeMgr.addCell(cell);
        newTd = adjustRowIndexes(newTd);
        newTd = copyTableData(newTd)
        setTableData(newTd);;
    }
    function handleDeleteColumn(cell){
        let newTd = tableData;
        newTd.rows = tableData.rows.map(row => {
            let idx = tableData.rows.findIndex(r => r.id === row.id);
            return deleteColumnFromRow(row, cell, idx === 0);
        });
        cell.rangeMgr.deleteCell(cell);
        newTd = adjustRowIndexes(newTd);
        newTd = copyTableData(newTd)
        setTableData(newTd);;
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
        if(cell.rangeMgr.handleClick(cell)){
            setTableData(copyTableData(tableData))
        }
    }
    async function handleExport(){
        await exportImportHelper.handleExport(tableData);
    }
    async function handleImport(){
        let newTd = (await exportImportHelper.handleImport()).tableData;
        newTd = adjustRowIndexes(newTd);
        newTd = copyTableData(newTd)
        setTableData(newTd);
    }

    function adjustRowIndexes(tableData){
        for(let i = 0; i < tableData.rows.length; i++){
            let row = tableData.rows[i];
            row.idx = i;
            for(let j = 0; j < row.cells.length; j++){
                let cell = row.cells[j];
                adjustCellIndex(cell, j, i, tableData.rows.length, row.cells.length, false, row.id);
                cell = row.rangeMgr.applyCellModifiers(row.idx, cell);
                cell = cell.rangeMgr.applyCellModifiers(cell.idx, cell);
            }
        }
        return tableData;
    }

    function getNewRow(tableData, previousRow, useId = true){
        let cells = previousRow.cells.map(
            (val, idx) =>{
                var cell = {
                    id : val.id,
                    text: ``,
                    classes: '',
                    isVirtual : false,
                    rangeMgr: val.rangeMgr,
                    isHeader: false,
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
    function adjustCellIndex(cell, cellIdx, rowIdx, rowCnt, colCnt, isVirtual){
        cell.idx = cellIdx;
        cell.rowIdx = rowIdx;
        cell.rowCnt = rowCnt;
        cell.colCnt = colCnt;
        cell.isVirtual = isVirtual;
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
                            rowIdx: rowIdx,
                            isVirtual: false,
                            classes: '',
                            rangeMgr: colMgr,
                        }
                        cellData = colRng.applyCellModifiers(rowRng.applyCellModifiers(cellData));
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
                                cellClick={handleCellClick}
                                exportHandler={handleExport}
                                importHandler={handleImport}/>
                        )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table;