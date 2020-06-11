import React from 'react'
import { Typography, Button, TextField, Grid, StylesProvider } from '@material-ui/core'
import uuid from 'uuid/v4'
import Allowances from '../AllowancesTable'

const StitchingInformation = props => {

    let [fromOtherComponents,setFromOtherComponents] = React.useState({
        netPcs:350,
        wastageAllowanceFromYarn:3,
        sizeWise:'',
        colorWise:''
    })

    const [state,setState] = React.useState({})

    React.useEffect(()=>{

        let totalPcs = parseFloat(fromOtherComponents.netPcs)*(1+(parseFloat(fromOtherComponents.wastageAllowanceFromYarn)/100))
        setState({...state,totalPcs})

    },[])

    const [allowances,setAllowances] = React.useState({
        allRows:[
            {
                id:uuid(),
                attribute:'Bundle Handling',
                value:0
            },
            {
                id:uuid(),
                attribute:'Mc Stop',
                value:0
            },
            {
                id:uuid(),
                attribute:'Fatigue Level',
                value:0
            }],
            total:0,
            operationComplexity:0
        })


    React.useEffect(()=>{

        if(state.shiftTime && state.sam && state.noOfMcs){
            let garmentPerDay = parseFloat((parseFloat(state.shiftTime)/parseFloat(state.sam))*parseFloat(state.noOfMcs))
            setState({...state,garmentPerDay})
        }

    },[state.shiftTime,state.sam,state.noOfMcs])

    React.useEffect(()=>{

        if(state.garmentPerDay && state.totalPcs){
            let daysRequiredTTLQty = parseFloat(parseFloat(state.totalPcs)/parseFloat(state.garmentPerDay)).toFixed(2)
            setState({...state,daysRequiredTTLQty})
        }

    },[state.garmentPerDay,state.totalPcs])

    return(
    <div>
        <div style={{margin:20,textAlign:'center'}}>
            <Typography variant="h6" style={{marginBottom:25}}>
                Stitching Information
            </Typography>
            <Grid container style={{width:'100%',textAlign:'left'}}>
                <Grid item lg={8} md={8} sm={6} xs={12} style={{paddingRight:20}}>
                    <Typography variant="subtitle2" style={{fontWeight:'bold'}} color='primary'>Total Pcs Stitched: {state.totalPcs}</Typography>
                    <Allowances allowances={allowances} setAllowances={setAllowances} />
                </Grid>
                <Grid item lg={4} md={4} sm={6} xs={12}>
                    <Allowances allowances={allowances} setAllowances={setAllowances} />
                </Grid>
            </Grid>
            <div style={{width:'100%',justifyContent:'space-around',display:'flex',marginBottom:25,marginTop:20,fontSize:15}}>
                <div style={{width:'35%'}}>
                    <Grid container style={{width:'100%',marginTop:20,textAlign:'center'}}>
                        <Grid item lg={12} md={12} sm={12} xs={12} style={{padding:6,textAlign:'left',marginBottom:15}}>
                            <Typography variant="h6" style={{fontWeight:'bold'}} color='primary'>SAM Feeding</Typography>
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12} style={{padding:6}}>
                            <TextField value={state.stitchCycleTime} onChange={e=>setState({...state,stitchCycleTime:e.target.value})} label="Stitch Cycle Time" variant="outlined" color="primary" fullWidth />
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12} style={{padding:6}}>
                            <TextField value={allowances.total||''} style={{backgroundColor:'#ECF1F3'}} label="Allowances" variant="outlined" color="primary" fullWidth />
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12} style={{padding:6}}>
                            <TextField label="Complexity" style={{backgroundColor:'#ECF1F3'}} value={allowances.operationComplexity||''} variant="outlined" color="primary" fullWidth />
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12} style={{padding:6}}>
                            <TextField value={state.sam} onChange={e=>setState({...state,sam:e.target.value})} type="number" label="SAM" variant="outlined" color="primary" fullWidth />
                        </Grid>
                    </Grid>
                </div>
                <div style={{width:'35%'}}>
                    <Grid container style={{width:'100%',marginTop:20,textAlign:'center'}}>
                        <Grid item lg={12} md={12} sm={12} xs={12} style={{padding:6,textAlign:'left',marginBottom:15}}>
                            <Typography variant="h6" style={{fontWeight:'bold'}} color='primary'>Target Feeding</Typography>
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12} style={{padding:6}}>
                            <TextField label="Shift Time (hrs)" type="number" value={state.shiftTime} onChange={e=>setState({...state,shiftTime:e.target.value})} variant="outlined" color="primary" fullWidth />
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12} style={{padding:6}}>
                            <TextField label="Shift Time (s)" style={{backgroundColor:'#ECF1F3'}} value={parseFloat(parseFloat(state.shiftTime)*60*60)||''} variant="outlined" color="primary" fullWidth />
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12} style={{padding:6}}>
                            <TextField type="number" label="No. Of M/Cs (Perons)" value={state.noOfMcs} onChange={e=>setState({...state,noOfMcs:e.target.value})} variant="outlined" color="primary" fullWidth />
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12} style={{padding:6}}>
                            <TextField label="Garment/Day Target" style={{backgroundColor:'#ECF1F3'}} value={state.garmentPerDay||''} variant="outlined" color="primary" fullWidth />
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12} style={{padding:6}}>
                            <TextField label="Days Required For TTL Qty" style={{backgroundColor:'#ECF1F3'}} value={state.daysRequiredTTLQty||''} variant="outlined" color="primary" fullWidth />
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12} style={{padding:6}}>
                        <TextField type="number" label="Change Over Time (hours)" value={state.changeOverTime} onChange={e=>setState({...state,changeOverTime:e.target.value})} variant="outlined" color="primary" fullWidth />
                        </Grid>
                    </Grid>
                </div>
            </div>
            <div>
                <Button variant="contained" color="primary" style={{height:50,width:350,marginTop:20}}>Submit</Button>
            </div>
        </div>
    </div>)
}

export default StitchingInformation