import React from 'react'
import { Typography, Dialog, Button, TextField, Grid, Select } from '@material-ui/core'
import KnittingFeeding from '../KnittingFeedingSection'
import AddIcon from '@material-ui/icons/AddBox'
import KnittingFeedingTable from '../KnittingFeedingTable'
import uuid from 'uuid/v4'
import MachineDiameterMatrix from '../MachineDiameterMatrix'

const KniitingPlanning = props => {


    const [state,setState] = React.useState({})
    const [baseSize,setBaseSize] = React.useState('M')
    const [grossPcsPercentage,setGrossPcsPercentage] = React.useState(8)
    const [dias,setDias] = React.useState(['11"','12"','13"'])
    const [options,setOptions] = React.useState({
        logoColor:['Solid Colors'],
        fabricPart:['Neck Trim','Cuff Trim','Collar','Binding','Crotch','Pocket','Neck Tape','Placket','Zip Binding']
    })
    const [machineMatrixData,setMachineMatrixData] = React.useState([
        {
            dia:'12"',availableMachine:0,forProduction:0,forSampling:0,id:uuid()
        },
        {
            dia:'13"',availableMachine:0,forProduction:0,forSampling:0,id:uuid()
        },
    ])
    // let seconds = 86400
    const [total,setTotal] = React.useState({total:300,kgs:0})
    const [tableValues,setTableValues] = React.useState([])
    // const [wastage,setWastage] = React.useState(0)
    // let sizesWeight = [{size:'XS',weight:0},{size:'S',weight:1},{size:'M',weight:2},{size:'L',weight:3},{size:'XL',weight:4}]
    const [sizes,setSizes] = React.useState([{size:'S',total:300,available:1,allocated:1},{size:'M',total:400,available:1,allocated:1},{size:'L',total:300,available:1,allocated:1}])

    const handleModalClose = () => {
        setModalOpen(false)
        setModalValue('')
    }

    // const [props.state, setState] = React.useState({})
    const [modalOpen, setModalOpen] = React.useState(false)
    const [modalValue, setModalValue] = React.useState('')
    const [attributeToAdd,setAttributeToAdd] = React.useState('')

    const getLabel = () => {
        if(attributeToAdd==='logoColor'){
            return 'Logo Color'
        }else if(attributeToAdd==='fabricPart'){
            return 'Fabric Part'
        }
    }

    const addValue = () => {
        
        setOptions({...options,[attributeToAdd]:[...options[attributeToAdd],modalValue]})
        // setModalValue('')
        handleModalClose()

    }

    const calculateTableValues = async () => {

        let arr = []
        let baseSizeIndex = 0
        // let wastagePercentage = (parseInt(wastage)+100)/100
        // console.log('wastage ------------------------------------>: ',typeof,wastage,',%age: ',wastagePercentage)
        await Promise.all(sizes.map((s,i) => {
            if(s.size===baseSize){
                baseSizeIndex = i
            }
        }))

        let wastageAllowanceSum = 0;
        // await Promise.all(props.wastageAllowance.map(w => {
        //     wastageAllowanceSum = wastageAllowanceSum + w.value
        // }))

        wastageAllowanceSum = (wastageAllowanceSum+100)/100
        console.log('wastageAllowanceSum: ',wastageAllowanceSum)


        await Promise.all(sizes.map((s,i) => {

            let val = 1090
            let diff = i-baseSizeIndex
            let grossPcs = 545

            if(diff===-2){
                let cycleTime = parseInt(0.98*total.total)
                let prod = parseInt(parseInt(state.seconds)/cycleTime)
                grossPcs = parseFloat(grossPcs * parseFloat((100+parseFloat(grossPcsPercentage))/100)).toFixed(2)
                let days = (grossPcs/prod).toFixed(2)
                // console.log('cycleTime: ',cycleTime,', prod: ',prod,', days: ',days,', grossPcs: ',grossPcs)
                arr.push({id:uuid(),size:s.size,cycleTime,dia:'12"',grossPcs,prod,days,available:1,allocated:1,days2:days,hours:parseInt(days*24)})
            }else if(diff===-1){
                let cycleTime = parseInt(0.99*total.total)
                let prod = parseInt(parseInt(state.seconds)/cycleTime)
                grossPcs = parseFloat(grossPcs * parseFloat((100+parseFloat(grossPcsPercentage))/100)).toFixed(2)
                let days = (grossPcs/prod).toFixed(2)
                arr.push({id:uuid(),size:s.size,cycleTime,dia:'12"',grossPcs,prod,days,available:1,allocated:1,days2:days,hours:parseInt(days*24)})
            }else if(diff===0){
                let cycleTime = parseInt(total.total)
                let prod = parseInt(parseInt(state.seconds)/cycleTime)
                grossPcs = parseFloat(grossPcs * parseFloat((100+parseFloat(grossPcsPercentage))/100)).toFixed(2)
                let days = (grossPcs/prod).toFixed(2)
                arr.push({id:uuid(),size:s.size,cycleTime,dia:'12"',grossPcs,prod,days,available:1,allocated:1,days2:days,hours:parseInt(days*24)})
            }else if(diff===1){
                let cycleTime = parseInt(1.01*total.total)
                let prod = parseInt(parseInt(state.seconds)/cycleTime)
                grossPcs = parseFloat(grossPcs * parseFloat((100+parseFloat(grossPcsPercentage))/100)).toFixed(2)
                let days = (grossPcs/prod).toFixed(2)
                arr.push({id:uuid(),size:s.size,cycleTime,dia:'12"',grossPcs,prod,days,available:1,allocated:1,days2:days,hours:parseInt(days*24)})
            }else if(diff===2){
                let cycleTime = parseInt(1.02*total.total)
                let prod = parseInt(parseInt(state.seconds)/cycleTime)
                grossPcs = parseFloat(grossPcs * parseFloat((100+parseFloat(grossPcsPercentage))/100)).toFixed(2)
                let days = (grossPcs/prod).toFixed(2)
                arr.push({id:uuid(),size:s.size,cycleTime,dia:'12"',grossPcs,prod,days,available:1,allocated:1,days2:days,hours:parseInt(days*24)})
            }else{
                arr.push({size:'NIL',cycleTime:0,grossPcs:545})
            }
            
        }))
        setTableValues(arr)

    }

    const handleSelect = async (e,obj,attr) => {

        console.log(e.target.value,obj)
        
        let tempArr = await Promise.all(tableValues.map(tV => {
            if(tV.id===obj.id){
                if(attr==='allocated'){
                    tV.days2 = (tV.days/e.target.value).toFixed(2)
                    tV.hours = parseInt(tV.days2*24)
                }
                return ({...tV,[attr]:e.target.value})
            }else{
                return tV
            }
        }))

        setTableValues(tempArr)

    }

    React.useEffect(()=>{
        if(state.seconds && !isNaN(state.seconds)){
            calculateTableValues()
        }
    },[state.seconds])

    React.useEffect(()=>{
        calculateTableValues()
    },[grossPcsPercentage])


    return(<div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>

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
            <div style={{marginBottom:20,textAlign:'center',marginTop:20}}>
                <Typography variant="h6">
                    Knitting Feeding and M/C Planning
                </Typography>
            </div>

            <KnittingFeeding 
                state={state} 
                setState={setState} 
            />

            <MachineDiameterMatrix 
                machineMatrixData={machineMatrixData}
                setMachineMatrixData={setMachineMatrixData}
                dias={dias}
                setDias={setDias}
            />

            <div style={{marginTop:40,}}>
                {/* <Typography variant="subtitle1" color="primary">Gross Pcs %age</Typography> */}
                <TextField variant="outlined" label="Gross Pcs %age" type={'number'} value={grossPcsPercentage} onChange={e => setGrossPcsPercentage(e.target.value)}/>
            </div>
            <KnittingFeedingTable
                // wastageAllowance={wastageAllowance}
                total={total}
                handleSelect={handleSelect}
                sizes={sizes}
                tableValues={tableValues}
                dias={dias}
                setDias={setDias}
                // const [dias,setDias] = React.useState(['11"','12"','13"'])
            />

            <div style={{display:'inline',width:'100%'}}>
                <Grid container style={{padding:30}}>
                    <Typography variant="h6" color="primary">Other Details:</Typography>
                    <Grid item lg={12} md={12} style={{justifyContent:'start',display:'flex',alignItems:'center',marginTop:10}}>
                        <Typography variant="subtitle2" color="primary">Knitted Logo:</Typography>
                        <Select native style={{width:100,marginLeft:15}}>
                            <option value={'yes'}>{'yes'}</option>
                            <option value={'no'}>{'no'}</option>
                        </Select>
                    </Grid>
                    <Grid item lg={12} md={12} style={{justifyContent:'start',display:'flex',alignItems:'center',marginTop:10}}>
                        <Typography variant="subtitle2" color="primary">Logo Color<AddIcon color={'primary'} size={10} style={{cursor:'pointer',marginBottom:-7}} onClick={()=>{
                            setAttributeToAdd('logoColor')
                            setModalOpen(true)
                        }} />:</Typography>
                        <Select native style={{width:100,marginLeft:15}}>
                            {options.logoColor.map(c => (<option value={c}>{c}</option>))}
                        </Select>
                    </Grid>
                    <Grid item lg={12} md={12} style={{justifyContent:'start',display:'flex',alignItems:'center',marginTop:10}}>
                        <Typography variant="subtitle2" color="primary">Fabric Part<AddIcon color={'primary'} size={10} style={{cursor:'pointer',marginBottom:-7}} onClick={()=>{
                            setAttributeToAdd('fabricPart')
                            setModalOpen(true)
                        }} />:</Typography>
                        <Select native style={{width:100,marginLeft:15}}>
                            {options.fabricPart.map(f => (<option value={f}>{f}</option>))}
                        </Select>
                    </Grid>
                </Grid>
                {/* Knitted Logo */}
            </div>

            <Button variant="contained" color="primary" style={{marginTop:20,width:400}}>Submit</Button>

        </div>)
}

export default KniitingPlanning