import './cell.css' 
import Button from '../button/button.js';
import { replace } from '../../logic/rangeManagersFactory.js';

function Cell({cellData, cellClick, cellTextInput}) {
    return(
        //contentEditable={true}
        <td className={`contentCell ${replace(cellData.classes, '')}`}  
            onClick={cellData.editable ? null : () => cellClick(cellData)}> 
            <div contentEditable={cellData.editable}  
                onInput={e => cellTextInput(cellData, e.currentTarget.textContent)} >
                {cellData.text}
            </div> 
        </td>
    )
}

export default Cell;