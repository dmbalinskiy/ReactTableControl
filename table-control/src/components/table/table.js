import Row from '../row/row.js'
import './table.css'

function Table({rows, addRow, deleteRow, addColumn, deleteColumn}) {
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
                                deleteColumn={deleteColumn}/>
                        )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table;