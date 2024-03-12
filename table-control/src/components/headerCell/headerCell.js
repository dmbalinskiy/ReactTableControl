import './headerCell.css' 
import Button from '../button/button.js';
import { replace } from '../../logic/utils.js';

function HeaderCell({cellData, cellTextInput}) {
    return(
    <th className={`headerCell ${replace(cellData.classes, '')}`}> 
        <div contentEditable={true}  
             onInput={e => cellTextInput(cellData, e.currentTarget.textContent)} >
                {cellData.text}
            </div> 
    </th>)
}

export default HeaderCell;