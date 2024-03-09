import './cell.css' 
import Button from '../button/button.js';

function Cell({cellData, addRow, deleteRow}) {
    return(
        <td className="contentCell" contentEditable={true} onInput={onTextInput}> 
            <div onDivClick={() => onDivClick(cellData)} >
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

function onTextInput (args){
    console.log('text input');
}
function onDivClick(cellData){
    console.log('divClick ', cellData.text);
}


export default Cell;