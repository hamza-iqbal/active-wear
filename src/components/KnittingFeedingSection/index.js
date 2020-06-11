import React from 'react'
import { Grid, TextField, Dialog, Typography, Button } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
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

const KnittingFeeding = props => {

    const classes = useStyles()

    const handleModalClose = () => {
        setModalOpen(false)
        setModalValue('')
    }

    // const [props.state, setState] = React.useState({})
    const [modalOpen, setModalOpen] = React.useState(false)
    const [modalValue, setModalValue] = React.useState('')
    const [attributeToAdd,setAttributeToAdd] = React.useState('')
    
    const [options, setOptions] = React.useState({
        shifts:['3'],
        shiftTime:['480'],
        ioNumbers:['RBK-EFFIE-F9526'],
        machineOutput:['540 Pcs']
    })

    const getLabel = () => {
        if(attributeToAdd==='shifts'){
            return 'Shift'
        }else if(attributeToAdd==='shiftTime'){
            return 'Shift Time'
        }
    }

    const addValue = () => {
        
        setOptions({...options,[attributeToAdd]:[...options[attributeToAdd],modalValue]})
        // setModalValue('')
        handleModalClose()

    }

    React.useEffect(()=>{
        
        if(props.state.shift && props.state.shiftTime){
            let hours = 24 * parseInt(props.state.shift)*parseInt(props.state.shiftTime) / 60
            props.setState({...props.state,hours:parseInt(hours),seconds:parseInt(parseInt(props.state.shift)*parseInt(props.state.shiftTime)*60)})
        }

    },[props.state.shift,props.state.shiftTime])
    React.useEffect(()=>{
        
        if(props.state.shift && props.state.shiftTime && props.state.sam && props.state.plannedEfficiency){
            let machineOutput = parseInt((parseInt(props.state.shift)*parseInt(props.state.shiftTime)*parseInt(props.state.plannedEfficiency))/parseInt(props.state.sam))
            props.setState({...props.state,machineOutput})
        }

    },[props.state.shift,props.state.shiftTime,props.state.sam,props.state.plannedEfficiency])


    return(<div style={{width:'100%'}}>
        <Dialog open={modalOpen} onClose={handleModalClose}>
            <div style={{width:350,display:'flex',flexDirection:'column',alignItems:'center',padding:20,position:'relative'}}>
                {/* <CloseIcon size={20} style={{color:'lightgrey',position:'absolute',right:15,top:15,cursor:'pointer'}} onClick={handleModalClose}/> */}
                <Typography variant="h6" color='primary' style={{marginBottom:20}}>
                    Add New {getLabel()}:
                </Typography>
                <TextField value={modalValue} onChange={e => setModalValue(e.target.value)} variant="outlined" fullWidth/>
                <Button variant="contained" style={{height:45,marginTop:20}} fullWidth color="primary" onClick={addValue}>Add</Button>
                <Button variant="contained" style={{height:45,marginTop:10}} fullWidth color="secondary" onClick={handleModalClose}>Cancel</Button>
            </div>
        </Dialog>
        <Grid container className={classes.outerGrid}>
            <Grid item lg={4} md={4} sm={6} xs={12} className={classes.innerGrid}>
                <Autocomplete
                    options={options.shifts}
                    getOptionLabel={option => option}
                    style={{ width: '90%' }}
                    onChange={(e,option) => props.setState({... props.state,shift:option})}
                    renderInput={params => (
                        <TextField {...params} label="Shifts" variant="outlined" fullWidth />
                    )}
                />
                <div className={classes.plusContainer} onClick={() => {
                    setModalOpen(true)
                    setAttributeToAdd('shifts')
                }}>
                    +
                </div>
            </Grid>
            <Grid item lg={4} md={4} sm={6} xs={12} className={classes.innerGrid}>
                <Autocomplete
                    options={options.shiftTime}
                    getOptionLabel={option => option}
                    style={{ width: '90%' }}
                    onChange={(e,option) => props.setState({... props.state,shiftTime:option})}
                    renderInput={params => (
                        <TextField {...params} label="Shifts Time" variant="outlined" fullWidth />
                    )}
                />
                <div className={classes.plusContainer} onClick={() => {
                    setModalOpen(true)
                    setAttributeToAdd('shiftTime')
                }}>
                    +
                </div>
                {/* <TextField 
                    label='Shifts Time'
                    variant="outlined"
                    color='primary'
                    fullWidth
                /> */}
            </Grid>
            <Grid item lg={4} md={4} sm={6} xs={12} className={classes.innerGrid}>
                <TextField 
                    label='Hours'
                    variant="outlined"
                    color='primary'
                    style={{backgroundColor:'#ECF1F3'}}
                    fullWidth
                    value={props.state.hours||''}
                />
            </Grid>
            <Grid item lg={4} md={4} sm={6} xs={12} className={classes.innerGrid}>
                <TextField 
                    label='SAM'
                    variant="outlined"
                    color='primary'
                    fullWidth
                    type="number"
                    value={ props.state.sam}
                    onChange={e => props.setState({...props.state, sam: e.target.value})}
                    />
            </Grid>
            <Grid item lg={4} md={4} sm={6} xs={12} className={classes.innerGrid}>
                <TextField 
                    label='Planned Efficiency %'
                    variant="outlined"
                    color='primary'
                    type="number"
                    fullWidth
                    value={props.state.plannedEfficiency}
                    onChange={e => props.setState({...props.state, plannedEfficiency: e.target.value})}
                />
            </Grid>
            <Grid item lg={4} md={4} sm={6} xs={12} className={classes.innerGrid}>
                <TextField 
                    label='Seconds'
                    variant="outlined"
                    color='primary'
                    fullWidth
                    style={{backgroundColor:'#ECF1F3'}}
                    value={props.state.seconds||''}
                />
            </Grid>
            <Grid item lg={4} md={4} sm={6} xs={12} className={classes.innerGrid}>
                <Autocomplete
                    options={options.ioNumbers}
                    getOptionLabel={option => option}
                    style={{ width: '90%' }}
                    onChange={(e,option) => props.setState({...props.state,ioNumber:option})}
                    renderInput={params => (
                        <TextField {...params} label="IO #" variant="outlined" fullWidth />
                    )}
                />
                <div className={classes.plusContainer} onClick={() => {
                    setModalOpen(true)
                    setAttributeToAdd('ioNumber')
                }}>
                    +
                </div>
            </Grid>
            <Grid item lg={4} md={4} sm={6} xs={12} className={classes.innerGrid}>
                <TextField 
                    label='Customer PO'
                    variant="outlined"
                    color='primary'
                    fullWidth
                />
            </Grid>
            <Grid item lg={4} md={4} sm={6} xs={12} className={classes.innerGrid}>
                <TextField 
                    label='Customer Name'
                    variant="outlined"
                    color='primary'
                    fullWidth
                />
            </Grid>
            <Grid item lg={4} md={4} sm={6} xs={12} className={classes.innerGrid}>
                <TextField 
                    label='Brand'
                    variant="outlined"
                    color='primary'
                    fullWidth
                />
            </Grid>
            <Grid item lg={4} md={4} sm={6} xs={12} className={classes.innerGrid}>
                <TextField 
                    label='Sample Made Size'
                    variant="outlined"
                    color='primary'
                    fullWidth
                />
            </Grid>
            <Grid item lg={4} md={4} sm={6} xs={12} className={classes.innerGrid}>
                <TextField 
                    label='Machine Output(M/c per Day)'
                    variant="outlined"
                    color='primary'
                    fullWidth
                    style={{backgroundColor:'#ECF1F3'}}
                    value={props.state.machineOutput||''}
                />
            </Grid>
            <Grid item lg={4} md={4} sm={6} xs={12} className={classes.innerGrid}>
                <TextField 
                    label='Change Over Time (hours)'
                    variant="outlined"
                    color='primary'
                    type="number"
                    fullWidth
                    // style={{backgroundColor:'#ECF1F3'}}
                    // value={props.state.changeOverTime||''}
                />
            </Grid>
        </Grid>

    </div>)
}

export default KnittingFeeding