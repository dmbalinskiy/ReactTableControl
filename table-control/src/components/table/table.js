import Row from '../row/row.js'
import './table.css'

function Table({rows, addRow, deleteRow, addColumn, deleteColumn, cellTextInput, cellClick}) {
    return (
        <div>
            <table>
                <tbody>
                    {
                        rows.map((val, key) => {
                        return (
                            <Row rowData={val} 
                                addRow={addRow} 
                                deleteRow={deleteRow} 
                                addColumn={addColumn}
                                deleteColumn={deleteColumn}
                                cellTextInput={cellTextInput}
                                cellClick={cellClick}/>
                        )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table;