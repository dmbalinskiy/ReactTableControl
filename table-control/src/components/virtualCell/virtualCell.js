import './virtualCell.css' 
import Button from '../button/button.js';

function VirtualCell({cellData, addRow, deleteRow, addColumn, deleteColumn}) {
    let itemContentAddLeft = null;
    let itemContentDelete = null;
    let itemContentAddRight = null;
    
    if(cellData.rowIdx === cellData.rowCnt - 1 && cellData.idx > 0 && cellData.idx < cellData.colCnt - 1){
        itemContentAddLeft = 
            <Button handler={() => addColumn(cellData, true)}
                type='button add row left'
                text='Add Column Before'/>

        itemContentDelete = 
            <Button handler={() => deleteColumn(cellData)}
                type='button delete row'
                text='Delete Column'
                isEnabled={cellData.colCnt > 3} />

        itemContentAddRight = 
            <Button handler={() => addColumn(cellData, false)}
                type='button add row right'
                text='Add Column After'/>
    }

    if(cellData.idx === cellData.colCnt - 1 && cellData.rowIdx > 0 && cellData.rowIdx < cellData.rowCnt - 1){
        itemContentAddLeft = 
            <Button handler={() => addRow(cellData, true)}
                type='button add column left'
                text='Add Row Before'/>

        itemContentDelete = 
            <Button handler={() => deleteRow(cellData)}
                type='button delete column'
                text='Delete Row' isEnabled={cellData.rowCnt > 3}/>

        itemContentAddRight = 
            <Button handler={() => addRow(cellData, false)}
                type='button add column right'
                text='Add Row After'/>
    }
    return(
        <td className="virtualCell"> 
            <div >
                {itemContentAddLeft}
                {itemContentDelete}
                {itemContentAddRight}
            </div> 
        </td>
    )
}

export default VirtualCell;