import './cell.css' 
import Button from '../button/button.js';

function Cell({cellData, cellClick}) {
    return(
        //contentEditable={true}
        <td className="contentCell"  onClick={() => cellClick(cellData)}> 
            <div >
                {cellData.text}
                {/* <Button handler={() => addRow()}
                        type='add'
                        text='Add Row'/>
                {
                    cellData.rowCnt > 2 &&
                    <Button handler={() => deleteRow()}
                        type='delete' 
                        text='Delete Row'/>
                } */}
                
            </div> 
        </td>
    )
}

export default Cell;