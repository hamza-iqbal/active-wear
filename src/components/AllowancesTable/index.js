import React from 'react'

const AllowancesTable = props => {

    const recalculate = (allRows) => {
        let sum = 0;
        allRows.map(row=>{
            sum = parseFloat(sum + parseFloat(row.value))
        })
        props.setAllowances({...props.allowances,allRows,total:sum})
    }

    const handleRowChange = async (e,item) => {
        let newRows = await Promise.all(props.allowances.allRows.map(row => {
            if(row.id===item.id){
                return ({...row,value:e.target.value})
            }else{
                return row
            }
        }))
        recalculate(newRows)
    }

    return(<div>
        <table style={{width:'100%'}}>
            <thead>
                <tr>
                    <th>Allowances</th>
                    <th style={{width:80}}></th>
                </tr>
            </thead>
            <tbody>
                {
                    props.allowances.allRows.map(row => (
                        <tr>
                            <td>{row.attribute}</td>
                            <td><input value={row.value} type="number" onChange={e=>handleRowChange(e,row)} style={{backgroundColor:'rgba(0, 0, 0, 0)',border:'none',width:70}} /></td>
                        </tr>
                    ))
                }
                    <tr>
                        <td style={{fontWeight:'bold'}}>Total</td>
                        <td>{props.allowances.total}</td>
                    </tr>
                    <tr>
                        <td>Operation Complexity</td>
                        <td>
                            <input value= {props.allowances.operationComplexity} type="number" onChange={e=>props.setAllowances({...props.allowances,operationComplexity:e.target.value})} style={{backgroundColor:'rgba(0, 0, 0, 0)',border:'none',width:70}} />
                        </td>
                    </tr>
            </tbody>
        </table>

    </div>)
}

export default AllowancesTable