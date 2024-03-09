import Cell from "../cell/cell";
import HeaderCell from "../headerCell/headerCell";
import VirtualCell from "../virtualCell/virtualCell";
function Row({rowData, addRow, deleteRow, addColumn, deleteColumn}) {

    let deleteRowInternal = () => deleteRow(rowData);
    let addRowInternal = () => addRow(rowData);
    return (
        <tr>
            {
                rowData.cells.map((val, key) => {
                    if(val.isVirtual){
                        return <VirtualCell cellData = {val} 
                                            addColumn={addColumn} 
                                            deleteColumn={deleteColumn} 
                                            addRow={addRow} 
                                            deleteRow={deleteRow}/>
                    }
                    else if(val.isHeader){
                        return <HeaderCell cellData = {val} addColumn={addColumn} deleteColumn={deleteColumn}/> 
                    }
                    else {
                        return <Cell cellData = {val} addRow={addRowInternal} deleteRow={deleteRowInternal} />
                    }
                }
            )}
        </tr>
    );
}

export default Row;