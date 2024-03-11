import './cell.css' 
import Button from '../button/button.js';
import { replace } from '../../logic/rangeManagersFactory.js';

function Cell({cellData, cellClick}) {
    return(
        //contentEditable={true}
        <td className={`contentCell ${replace(cellData.classes, '')}`}  
            onClick={() => cellClick(cellData)}> 
            <div >
                {cellData.text}
            </div> 
        </td>
    )
}

export default Cell;