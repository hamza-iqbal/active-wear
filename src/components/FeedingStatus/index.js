import React from 'react'
import { Typography, TextField, Grid, Button, Dialog } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import DatePicker from "react-datepicker";
import uuid from 'uuid/v4'
import { makeStyles } from '@material-ui/styles'
// import CloseIcon from '@material-ui/icons/Close'
// import Table from '../Table'

const useStyles = makeStyles(theme => ({
    innerGrid:{
        padding:5,
        display:'flex',
        justifyContent:'center'
    },
    outerGrid:{
        padding:10,
        display:'flex',
        justifyContent:'center'
    },
    plusContainer:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        border:'1px solid lightgrey',
        borderRadius:5,
        cursor:'pointer'
    },
    innerGridBelow:{
        padding:5
    }
}))

const FeedingStatus = props => {

    const classes = useStyles()

    const handleModalClose = () => {
        setModalOpen(false)
        setModalValue('')
    }

    const [modalOpen, setModalOpen] = React.useState(false)
    const [options, setOptions] = React.useState(['RBK-EFFIE-F9526'])
    const [modalValue, setModalValue] = React.useState('')

    const [state,setState] = React.useState({tableValues:[
            {id:uuid(),value:'PO Receive Date',date:null},
            {id:uuid(),value:'Ex-Fac date',date:null},
            {id:uuid(),value:'Yarn Dmeand Date',date:null},
            {id:uuid(),value:'Knitting Start Date',date:null},
            {id:uuid(),value:'Knitting End Date',date:null},
            {id:uuid(),value:'Dips Approved End Date',date:null},
            {id:uuid(),value:'Dyeing Start Date',date:null},
            {id:uuid(),value:'Dyeing End Date',date:null},
            {id:uuid(),value:'Stitch Accessory Close Date',date:null},
            {id:uuid(),value:'Stitching Start Date',date:null},
            {id:uuid(),value:'Pack Accessory Close Date',date:null},
            {id:uuid(),value:'Packing Start Date',date:null},
            {id:uuid(),value:'Packing End Date',date:null},
            {id:uuid(),value:'QA Final Audit',date:null}
        ],
        ioNumber:''
    })

    const addValue = () => {
        setOptions([...options,modalValue])
        handleModalClose()
    }

    const handleDateChange = async (date,id) => {
        let newArray = await Promise.all(state.tableValues.map(tV => {
            if(tV.id===id){
                return({...tV,date})
            }else{
                return tV
            }
        }))

        setState({...state,tableValues:newArray})
    }
    return(<div>
        <Dialog open={modalOpen} onClose={handleModalClose}>
            <div style={{width:350,display:'flex',flexDirection:'column',alignItems:'center',padding:20,position:'relative'}}>
                {/* <CloseIcon size={20} style={{color:'lightgrey',position:'absolute',right:15,top:15,cursor:'pointer'}} onClick={handleModalClose}/> */}
                <Typography variant="h6" color='primary' style={{marginBottom:20}}>
                    Add New IO #:
                </Typography>
                <TextField value={modalValue} onChange={e => setModalValue(e.target.value)} variant="outlined" fullWidth/>
                <Button variant="contained" style={{height:45,marginTop:20}} fullWidth color="primary" onClick={addValue}>Add</Button>
                <Button variant="contained" style={{height:45,marginTop:10}} fullWidth color="secondary" onClick={handleModalClose}>Cancel</Button>
            </div>
        </Dialog>
        <div style={{marginBottom:20,textAlign:'center',marginTop:20}}>
            <Typography variant="h6">
                Feeding Status Timeline
            </Typography>
        </div>
        <Grid container style={{display:'flex',justifyContent:'center',padding:5}}>
            <Grid item lg={4} md={4} sm={12} xs={12}style={{display:'flex',justifyContent:'center'}}>
                <Autocomplete
                    options={options}
                    getOptionLabel={option => option}
                    style={{ width: '90%' }}
                    onChange={(e,option) => setState({...state,ioNumber:option})}
                    renderInput={params => (
                        <TextField {...params} label="IO #" variant="outlined" fullWidth />
                    )}
                />
                <div className={classes.plusContainer} onClick={() => {
                    setModalOpen(true)
                    // setAttributeToAdd('shiftTime')
                }}>
                    +
                </div>
            </Grid>
            {/* <DatePicker
                selected={state.date}
                onChange={date => {
                    console.log('date -> ',date)
                    setState({...state,date})
                }}
            /> */}
        </Grid>
        <Grid container style={{display:'flex',justifyContent:'center',padding:5}}>
            <Grid item lg={8} md={8} sm={12} xs={12}>
                <table style={{width:'100%'}}>
                    <tr>
                        {/* <th></th> */}
                        <th>Order Booking</th>
                        <th>Date</th>
                    </tr>
                    <tbody>
                        {
                            state.tableValues.map(s => (
                                <tr>
                                    {/* <td style={{textAlign:'center',fontWeight:'700',fontSize:13,minWidth:150}}>{`Order Booking`}</td> */}
                                    <td style={{textAlign:'left'}}>{s.value}</td>
                                    <td style={{textAlign:'center'}}>
                                        <DatePicker
                                            selected={s.date}
                                            onChange={date=>handleDateChange(date,s.id)}
                                        />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </Grid>
        </Grid>
            <Grid container style={{display:'flex',justifyContent:'center',padding:30}}>
                <Grid item lg={3} md={4} sm={12} xs={12}><Button variant="contained" color='primary' fullWidth>Edit</Button></Grid>
                <Grid item lg={3} md={4} sm={12} xs={12} style={{marginLeft:20}}><Button variant="contained" color='primary' fullWidth>Save</Button></Grid>
            </Grid>
    </div>)
}

export default FeedingStatus