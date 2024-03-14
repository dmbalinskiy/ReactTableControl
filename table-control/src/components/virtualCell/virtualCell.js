import './virtualCell.css' 
import Button from '../button/button.js';
import { replace } from '../../logic/utils.js';

function VirtualCell({cellData, addRow, deleteRow, addColumn, deleteColumn, exportHandler, importHandler, rowMgr}) {
    let itemContentLeft = null;
    let itemContentCenter = null;
    let itemContentRight = null;

    if(cellData.isExportImportCell){
        itemContentLeft = 
            <Button handler={() => exportHandler()}
                type='button export left'
                text='Do Export'
                isEnabled={true}/>
        
        itemContentRight = 
            <Button handler={() => importHandler()}
                type='button import right'
                text='Do Import'
                isEnabled={true}/>
    }

    else if(cellData.rowIdx === cellData.rowCnt - 1 && cellData.idx < cellData.colCnt - 1){
        itemContentLeft = 
            <Button handler={() => addColumn(cellData, true)}
                type='button add row left'
                text='Add Column Before'
                isEnabled={cellData.rangeMgr.canAddCell(cellData)}/>

        itemContentCenter = 
            <Button handler={() => deleteColumn(cellData)}
                type='button delete row'
                text='Delete Column'
                isEnabled={cellData.rangeMgr.canDeleteCell(cellData)} />

        itemContentRight = 
            <Button handler={() => addColumn(cellData, false)}
                type='button add row right'
                text='Add Column After'
                isEnabled={cellData.rangeMgr.canAddCell(cellData)}/>
    }

    else if(cellData.idx === cellData.colCnt - 1 && cellData.rowIdx < cellData.rowCnt - 1){
        itemContentLeft = 
            <Button handler={() => addRow(cellData, true)}
                type='button add column left'
                text='Add Row Before'
                isEnabled={rowMgr.canAddCell(cellData)}/>

        itemContentCenter = 
            <Button handler={() => deleteRow(cellData)}
                type='button delete column'
                text='Delete Row' 
                isEnabled={rowMgr.canDeleteCell(cellData)}/>

        itemContentRight = 
            <Button handler={() => addRow(cellData, false)}
                type='button add column right'
                text='Add Row After'
                isEnabled={rowMgr.canAddCell(cellData)}/>
    }
    return(
        <td className={`virtualCell ${replace(cellData.classes, '')}`}> 
            <div >
                {itemContentLeft}
                {itemContentCenter}
                {itemContentRight}
            </div> 
        </td>
    )
}

export default VirtualCell;