import './virtualCell.css' 
import Button from '../button/button.js';
import { replace } from '../../logic/rangeManagersFactory.js';

function VirtualCell({cellData, addRow, deleteRow, addColumn, deleteColumn, rowMgr}) {
    let itemContentAddLeft = null;
    let itemContentDelete = null;
    let itemContentAddRight = null;

    if(cellData.rowIdx === cellData.rowCnt - 1 && cellData.idx < cellData.colCnt - 1){
        itemContentAddLeft = 
            <Button handler={() => addColumn(cellData, true)}
                type='button add row left'
                text='Add Column Before'
                isEnabled={cellData.rangeMgr.canAddCell(cellData)}/>

        itemContentDelete = 
            <Button handler={() => deleteColumn(cellData)}
                type='button delete row'
                text='Delete Column'
                isEnabled={cellData.rangeMgr.canDeleteCell(cellData)} />

        itemContentAddRight = 
            <Button handler={() => addColumn(cellData, false)}
                type='button add row right'
                text='Add Column After'
                isEnabled={cellData.rangeMgr.canAddCell(cellData)}/>
    }

    if(cellData.idx === cellData.colCnt - 1 && cellData.rowIdx < cellData.rowCnt - 1){
        itemContentAddLeft = 
            <Button handler={() => addRow(cellData, true)}
                type='button add column left'
                text='Add Row Before'
                isEnabled={rowMgr.canAddCell(cellData)}/>

        itemContentDelete = 
            <Button handler={() => deleteRow(cellData)}
                type='button delete column'
                text='Delete Row' 
                isEnabled={rowMgr.canDeleteCell(cellData)}/>

        itemContentAddRight = 
            <Button handler={() => addRow(cellData, false)}
                type='button add column right'
                text='Add Row After'
                isEnabled={rowMgr.canAddCell(cellData)}/>
    }
    return(
        <td className={`virtualCell ${replace(cellData.classes, '')}`}> 
            <div >
                {itemContentAddLeft}
                {itemContentDelete}
                {itemContentAddRight}
            </div> 
        </td>
    )
}

export default VirtualCell;