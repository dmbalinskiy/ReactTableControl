import './virtualCell.css' 
import Button from '../button/button.js';

function VirtualCell({cellData, addRow, deleteRow, addColumn, deleteColumn}) {
    let itemContentAdd = null;
    let itemContentDelete = null;
    
    if(cellData.rowIdx === cellData.rowCnt - 1 && cellData.idx > 0 && cellData.idx < cellData.colCnt - 1){
        itemContentAdd = 
            <Button handler={() => addColumn(cellData)}
                type='add'
                text='Add Column'/>

        itemContentDelete = 
            <Button handler={() => deleteColumn(cellData)}
                type='delete'
                text='Delete Column'
                isEnabled={cellData.colCnt > 3} />
    }

    if(cellData.idx === cellData.colCnt - 1 && cellData.rowIdx > 0 && cellData.rowIdx < cellData.rowCnt - 1){
        itemContentAdd = 
            <Button handler={() => addRow(cellData)}
                type='add'
                text='Add Row'/>

        itemContentDelete = 
            <Button handler={() => deleteRow(cellData)}
                type='delete'
                text='Delete Row' isEnabled={cellData.rowCnt > 3}/>
    }
    return(
        <td className="virtualCell"> 
            <div >
                {cellData.text}
                {itemContentAdd}
                {itemContentDelete}
                
            </div> 
        </td>
    )
}

export default VirtualCell;