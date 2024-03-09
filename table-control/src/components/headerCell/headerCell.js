import './headerCell.css' 
import Button from '../button/button.js';

function HeaderCell({cellData, cellTextInput}) {
    return(
    <th className="headerCell"> 
        <div contentEditable={true}  
             onInput={e => cellTextInput(cellData, e.currentTarget.textContent)}
             >
                {cellData.text}
                {/* <Button handler={() => addColumn(cellData)}
                        type='add' 
                        text='Add Column'/>
                {
                    (cellData.idx > 0 ) &&
                        <Button handler={() => deleteColumn(cellData)}
                        type='add'
                        text='Delete Column'/>
                } */}
                
            </div> 
    </th>)
}

export default HeaderCell;