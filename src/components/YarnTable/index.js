import React from 'react'
import { TextField, Grid, InputAdornment, Button, Typography, CircularProgress, Select } from '@material-ui/core'
// import SearchIcon from '@material-ui/icons/Search'
// import DeleteIcon from '@material-ui/icons/Delete'
import InfoIcon from '@material-ui/icons/Info'
// import EditIcon from '@material-ui/icons/Edit'
// import { Dialog } from '@material-ui/core'
import './index.css'
import Autocomplete from '@material-ui/lab/Autocomplete';
// import { end_point } from '../../util/config'
// import { withSnackbar } from 'notistack'
const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData, // This is a custom function that we supplied to our table instance
  }) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue)
  
    const onChange = e => {
      setValue(e.target.value)
    }
  
    // We'll only update the external data when the input is blurred
    const onBlur = () => {
      updateMyData(index, id, value)
    }
  
    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
      setValue(initialValue)
    }, [initialValue])
  
    return <input value={value} onChange={onChange} onBlur={onBlur} />
  }

const Table = props => {

    const [loading,setLoading] = React.useState(false)


    const handleChange = async (cell,row,e,att) => {
        console.log(cell,row,e,att)
        let newCols = await Promise.all(row.columns.map(c => {
            if(c.id===cell.id){
                console.log('here1',c)
                if(e.target.value===''){
                    return ({...c,[att]:0})
                }else{
                    return ({...c,[att]:parseInt(e.target.value)})
                }
            }else{
                console.log('here2',c)
                return c
            }
        }))
        // let newCell = {...cell,[att]:e.target.value}
        let newRow = {...row,columns:newCols}
        console.log('val: ',newRow)
        let newTableValues = await Promise.all(props.values.map(tV => {
            if(tV.rowId===row.rowId){
                return newRow
            }else{
                return tV
            }
        }))
        console.log('newTableValues',newTableValues)
        // props.setTableValues(newTableValues)
        props.updateTableValues(newTableValues)
    }
    const handleSelectChange = async (cell,row,e,att) => {
        console.log(cell,row,e,att)
        let newCols = await Promise.all(row.columns.map(c => {
            if(c.id===cell.id){
                console.log('here1',c)
                return ({...c,[att]:e.target.value})
            }else{
                console.log('here2',c)
                return c
            }
        }))
        // let newCell = {...cell,[att]:e.target.value}
        let newRow = {...row,columns:newCols}
        console.log('val: ',newRow)
        let newTableValues = await Promise.all(props.values.map(tV => {
            if(tV.rowId===row.rowId){
                return newRow
            }else{
                return tV
            }
        }))
        console.log('newTableValues',newTableValues)
        props.setTableValues(newTableValues)
        // props.updateTableValues(newTableValues)
    }


    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center',width:'100%',overflowX: 'scroll' }}>
                {
                    loading === true ?
                        <div style={{ padding: 20, display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress color='primary' />
                        </div>
                        :
                        <table>
                            <tr>
                                <th>Yarn Count</th>
                                {
                                    props.headers.length>0?props.headers.map(h=>(
                                    <>
                                        {/* <th>{h.type}</th> */}
                                        <th><input value={h.type} onChange={async e => {
                                            console.log(props.headers)
                                            let newHeaders = await Promise.all(props.headers.map(hd => {
                                                if(h.id===hd.id){
                                                    return {...hd,type:e.target.value}
                                                }else{
                                                    return hd
                                                }
                                            }))
                                            // console.log
                                            props.setHeaders(newHeaders)
                                        }} style={{backgroundColor:'rgba(0, 0, 0, 0)',textAlign:'center',fontWeight:'bold',border:'none',width:60}} />(g)</th>
                                        <th>Placement</th>
                                        <th>Dye Process</th>
                                        <th>Yd Color</th>
                                    </>))
                                    :null
                                }
                                
                                <th style={{color:'black'}}>Total</th>
                                <th style={{color:'black'}}>%age</th>
                                <th style={{color:'black'}}>Kgs</th>
                            </tr>
                            <tbody>
                                {
                                    props.values.map(row => (
                                        <tr key={row.rowId}>
                                            <td style={{textAlign:'left',fontWeight:'bold'}}>
                                            <Autocomplete
                                                options={props.yarnCount}
                                                getOptionLabel={option => option.value+', '+option.label}
                                                style={{ width: '100%' }}
                                                onChange={(e,option) => console.log('selected: ',option)}
                                                renderInput={params => (
                                                    <TextField {...params} variant="standard" fullWidth />
                                                )}
                                            />
                                                {/* <Select
                                                    native
                                                    value={row.rowTitle}
                                                >
                                                    {props.yarnCount.map(c => <option value={c.value}>{c.value}</option>)}
                                                </Select> */}
                                            </td>
                                            {
                                                row.columns.map((cell,i)=>(<>
                                                    <td style={{textAlign:'center'}}><input value={cell.new} onChange={e=>handleChange(cell,row,e,'new')} style={{backgroundColor:'rgba(0, 0, 0, 0)',border:'none',width:70}} /></td>
                                                    <td style={{textAlign:'center'}}>
                                                        <Select
                                                            native
                                                            value={cell.placement}
                                                            onChange={(e)=>handleSelectChange(cell,row,e,'placement')}
                                                            style={{fontSize:12}}
                                                            >
                                                                {
                                                                    props.placementTypes.map(p => (<option value={p}>{p}</option>))
                                                                }
                                                            {/* <option aria-label="None" value="" /> */}
                                                        </Select>
                                                    </td>
                                                    <td style={{textAlign:'center'}}>
                                                        <Select
                                                            native
                                                            value={cell.process}
                                                            onChange={e=>handleSelectChange(cell,row,e,'process')}
                                                            style={{fontSize:12}}
                                                        >
                                                            {
                                                                props.processTypes.map(p => (<option value={p}>{p}</option>))
                                                            }
                                                        </Select>
                                                    </td>
                                                    <td style={{textAlign:'center'}}>
                                                        <Select
                                                            native
                                                            value={cell.ydColor}
                                                            onChange={e=>handleSelectChange(cell,row,e,'ydColor')}
                                                            style={{fontSize:12}}
                                                        >
                                                            {
                                                                props.ydColors.map(p => (<option value={p}>{p}</option>))
                                                            }
                                                        </Select>
                                                    </td>
                                                </>))
                                            }
                                            <td style={{textAlign:'center',fontWeight:'bold'}}>{row.total}</td>
                                            <td style={{textAlign:'center',fontWeight:'bold'}}>{row.percentage}</td>
                                            <td style={{textAlign:'center',fontWeight:'bold'}}>{row.percentage*props.totalStats.kgs}</td>
                                        </tr>
                                    ))
                                }
                                <tr>
                                    {/* <td></td> */}
                                    <td style={{textAlign:'left',fontWeight:'bold'}}></td>
                                    {
                                        props.headers.map((cell,i)=>(<>
                                            <td style={{textAlign:'center'}}></td>
                                            <td style={{textAlign:'center'}}></td>
                                            <td style={{textAlign:'center'}}></td>
                                            <td style={{textAlign:'center'}}></td>
                                        </>))
                                    }
                                    <td style={{textAlign:'center',fontWeight:'bold'}}>{props.totalStats.total}</td>
                                    <td style={{textAlign:'center',fontWeight:'bold'}}>100%</td>
                                    <td style={{textAlign:'center',fontWeight:'bold'}}>0</td>
                                </tr>
                                
                            </tbody>
                        </table>
                        
                }
            </div>
        </div>
    )
}

export default Table