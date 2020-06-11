import React from 'react'
import { TextField, Grid, InputAdornment, Select, Typography, CircularProgress } from '@material-ui/core'
import { Dialog, Button } from '@material-ui/core'

import './index.css'
import uuid from 'uuid/v4'

const Table = props => {

    
    const [loading,setLoading] = React.useState(false)
    // const [wastage,setWastage] = React.useState(0)
    const handleModalClose = () => {
        setModalOpen(false)
        setModalValue('')
    }

    // const [props.state, setState] = React.useState({})
    const [modalOpen, setModalOpen] = React.useState(false)
    const [modalValue, setModalValue] = React.useState('')

    const addValue = () => {
        props.setDias([...props.dias,modalValue])
        handleModalClose()
    }

    

    // React.useEffect(()=>{
    //     calculateTableValues()
    // },[props.total,props.sizes,wastage])
    // calculateTableValues()
    // const [tableValues,setTableValues] = React.useState([])

    return (
        <div>
            <Dialog open={modalOpen} onClose={handleModalClose}>
                <div style={{width:350,display:'flex',flexDirection:'column',alignItems:'center',padding:20,position:'relative'}}>
                    {/* <CloseIcon size={20} style={{color:'lightgrey',position:'absolute',right:15,top:15,cursor:'pointer'}} onClick={handleModalClose}/> */}
                    <Typography variant="h6" color='primary' style={{marginBottom:20}}>
                        Add New Dia:
                    </Typography>
                    <TextField value={modalValue} onChange={e => setModalValue(e.target.value)} variant="outlined" fullWidth/>
                    <Button variant="contained" style={{height:45,marginTop:20}} fullWidth color="primary" onClick={addValue}>Add</Button>
                    <Button variant="contained" style={{height:45,marginTop:10}} fullWidth color="secondary" onClick={handleModalClose}>Cancel</Button>
                </div>
            </Dialog>
            <div style={{ display: 'flex', justifyContent: 'center',width:'100%',overflowX: 'scroll' }}>
                {
                    loading === true ?
                        <div style={{ padding: 20, display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress color='primary' />
                        </div>
                        :
                        <div style={{display:'flex',flexDirection:'column',alignItems:'start',marginTop:10}}>
                            {/* <table style={{width:'100%'}}></table> */}
                            <table className="wastage-allowance" style={{width:'100%'}}>
                                <tr>
                                    {/* <th style={{ width: '40px' }}></th> */}
                                    <th>S/W</th>
                                    <th>Cycle Time</th>
                                    <th>Dia (Feed) <span style={{cursor:'pointer',fontWeight:'bold'}} onClick={()=>setModalOpen(true)}>+</span></th>
                                    <th>Gross Pcs (8%)</th>
                                    <th>Prd/Mc</th>
                                    <th>Prod/day</th>
                                    <th>TTL M/C Available</th>
                                    <th>TTL M/C Allocated</th>
                                    <th>Days / M/cs</th>
                                    <th>Hours</th>
                                    {/* <th style={{color:'black'}}>%age</th>
                                    <th style={{color:'black'}}>Kgs</th> */}
                                    {/* <th style={{ width: '40px' }}></th> */}
                                </tr>
                                <tbody>
                                {
                                        props.tableValues.length>0 && props.tableValues.map((v,i) => (
                                            <tr key={i}>
                                                <td style={{textAlign:'left',fontWeight:'700',fontSize:13,minWidth:150}}>{v.size}</td>
                                                <td style={{textAlign:'center'}}>{v.cycleTime}</td>
                                                <td style={{textAlign:'center'}}>
                                                    <select value={v.dia} onChange={e => props.handleSelect(e,v,'dia')}>
                                                    {props.dias.map(d => <option value={d}>{d}</option>)}
                                                        {/* <option value={'11"'}>11"</option>
                                                        <option value={'12"'}>12"</option>
                                                        <option value={'13"'}>13"</option> */}
                                                    </select>
                                                </td>
                                                <td style={{textAlign:'center'}}>{v.grossPcs}</td>
                                                <td style={{textAlign:'center'}}>{v.prod}</td>
                                                <td style={{textAlign:'center'}}>{v.days}</td>
                                                <td style={{textAlign:'center'}}>
                                                    <select value={v.available} onChange={e => props.handleSelect(e,v,'available')}>
                                                        <option value={1}>1</option>
                                                        <option value={2}>2</option>
                                                        <option value={3}>3</option>
                                                    </select>
                                                </td>
                                                <td style={{textAlign:'center'}}>
                                                    <select value={v.allocated} onChange={e => props.handleSelect(e,v,'allocated')}>
                                                        <option value={1}>1</option>
                                                        <option value={2}>2</option>
                                                        <option value={3}>3</option>
                                                    </select>
                                                </td>
                                                <td style={{textAlign:'center'}}>{v.days2}</td>                                                
                                                <td style={{textAlign:'center'}}>{v.hours}</td>                                                
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                }
            </div>
        </div>
    )
}

export default Table