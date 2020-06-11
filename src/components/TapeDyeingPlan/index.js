import React from 'react'
import { TextField, Typography, Button, Select } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import AddIcon from '@material-ui/icons/AddBox'


const useStyles = makeStyles(theme => ({
    title:{
        marginBottom:25
    },
    addIcon:{
        cursor:'pointer',
        marginBottom:-7,
        color:'#4B8D3A',
        // fontSize:10
    }
}))

const TapeDyeing = props => {

    const classes = useStyles()

    const handleChange = async (e,row,attr) => {
        
        let newValues = await Promise.all(props.tapeDyeingValues.rows.map(r => {
            if(r.id===row.id){
                return ({...r,[attr]:e.target.value})
            }else{
                return r
            }
        }))
        if(attr==='finishConsCm'||attr==='rawConsCm'||attr==='finishConsKGPM'||attr==='rawConsKGPM'||attr==='grossPcs'){
            props.recalculate(newValues)
        }else{
            props.setTapeDyeingValues({rows:newValues})
        }

    }


    return(<div style={{overflowX:'scroll'}}>
        {/* <Dialog open={modalOpen} onClose={handleModalClose}>
                <div style={{width:350,display:'flex',flexDirection:'column',alignItems:'center',padding:20,position:'relative'}}>
                    <Typography variant="h6" color='primary' style={{marginBottom:20}}>
                        Add New {getLabel()}:
                    </Typography>
                    <TextField value={modalValue} onChange={e => setModalValue(e.target.value)} variant="outlined" fullWidth/>
                    <Button variant="contained" style={{height:45,marginTop:20}} fullWidth color="primary" onClick={addValue}>Add</Button>
                    <Button variant="contained" style={{height:45,marginTop:10}} fullWidth color="secondary" onClick={handleModalClose}>Cancel</Button>
                </div>
            </Dialog> */}
        <table style={{width:'100%'}}>
                <thead>
                    <tr>
                        <th colSpan={"4"} style={{border:'none'}}></th>
                        <th colSpan={"5"} style={{backgroundColor:'#f6f6f6',borderRight:'1px solid #4B8D3A',borderLeft:'1px solid #4B8D3A'}}>Finish Information</th>
                        <th colSpan={"5"} style={{backgroundColor:'#f6f6f6'}}>Raw Information</th>
                    </tr>
                    <tr>
                        <th>Main Colors</th>
                        <th style={{width:70}}>Gross Pcs</th>
                        <th>Tape Color</th>
                        <th style={{borderRight:'1px solid #4B8D3A'}}>Tape Type</th>
                        <th style={{width:60}}>Cons(cm)</th>
                        <th>Cons(m)</th>
                        <th style={{width:60}}>Cons(kg/m)</th>
                        <th>TTL Meter</th>
                        <th style={{borderRight:'1px solid #4B8D3A'}}>TTL Kgs</th>
                        <th style={{width:60}}>Cons(cm)</th>
                        <th>Cons(m)</th>
                        <th style={{width:60}}>Cons(kg/m)</th>
                        <th>TTL Meter</th>
                        <th>TTL Kgs</th>
                        {/* <th>Qty</th>
                        <th>Kgs</th>
                        <th>Category</th> */}
                    </tr>
                </thead>
                {/*

                    mainColors:'Black',
                    grossPcs:1500,
                    tapeColor:'Black',
                    tapeType:'16MM',
                    finishConsCm:0,
                    finishConsM:0,
                    finishConsKGPM:0,
                    finishTtlM:0,
                    finishTtlKgs:0,
                    rawConsCm:0,
                    rawConsM:0,
                    rawConsKGPM:0,
                    rawTtlM:0,
                    rawTtlKgs:0

                */}
                <tbody>
                    {
                        props.tapeDyeingValues.rows.map(r => (<tr>
                            <td>
                                <Select native value={r.mainColors} onChange={e=>handleChange(e,r,'mainColors')}>
                                    {props.tapeDyeingOptions.mainColors.map(t => (<option value={t}>{t}</option>))}
                                </Select>
                            </td>
                            <td>
                                <input value={r.grossPcs} onChange={e=>handleChange(e,r,'grossPcs')} type="number" style={{backgroundColor:'rgba(0, 0, 0, 0)',border:'none',width:'100%'}} />
                            </td>
                            <td>
                                <Select native value={r.tapeColor} onChange={e=>handleChange(e,r,'tapeColor')}>
                                    {props.tapeDyeingOptions.tapeColors.map(t => (<option value={t}>{t}</option>))}
                                </Select>
                            </td>
                            <td style={{borderRight:'1px solid #4B8D3A'}}>
                                <Select native value={r.tapeType} onChange={e=>handleChange(e,r,'tapeType')}>
                                    {props.tapeDyeingOptions.tapeTypes.map(t => (<option value={t}>{t}</option>))}
                                </Select>
                            </td>
                            <td>
                                <input value={r.finishConsCm} onChange={e=>handleChange(e,r,'finishConsCm')} type="number" style={{backgroundColor:'rgba(0, 0, 0, 0)',border:'none',width:'100%'}} />
                            </td>
                            <td>{r.finishConsM}</td>
                            <td>
                                <input value={r.finishConsKGPM} onChange={e=>handleChange(e,r,'finishConsKGPM')} type="number" style={{backgroundColor:'rgba(0, 0, 0, 0)',border:'none',width:'100%'}} />
                            </td>
                            <td>{r.finishTtlM}</td>
                            <td style={{borderRight:'1px solid #4B8D3A'}}>{r.finishTtlKgs}</td>
                            <td>
                                <input value={r.rawConsCm} onChange={e=>handleChange(e,r,'rawConsCm')} type="number" style={{backgroundColor:'rgba(0, 0, 0, 0)',border:'none',width:'100%'}} />
                            </td>
                            <td>{r.rawConsM}</td>
                            <td>
                                <input value={r.rawConsKGPM} onChange={e=>handleChange(e,r,'rawConsKGPM')} type="number" style={{backgroundColor:'rgba(0, 0, 0, 0)',border:'none',width:'100%'}} />
                            </td>
                            <td>{r.rawTtlM}</td>
                            <td>{r.rawTtlKgs}</td>
                        </tr>))
                    }
                </tbody>
            </table>
    </div>)
}

export default TapeDyeing