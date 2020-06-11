import React from 'react'
import { Typography, Dialog, Button, TextField,Select } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import uuid from 'uuid/v4'
import AddIcon from '@material-ui/icons/AddBox'


const useStyles = makeStyles({
    headerPlus:{
        cursor:'pointer',
        fontWeight:'bold'
    },
    tableFunction:{
        cursor:'pointer',
        color:'black',
        fontWeight:'bold',
        backgroundColor:'lightgrey',
        borderRadius:5,
        overflow:'hidden',
        margin:'0px 4px',
        padding:'2px 8px'
    },
    addIcon:{
        cursor:'pointer',
        marginBottom:-7,
        color:'#4B8D3A',
        // fontSize:10
    }
})

const AccessoryInformation = props => {

    const classes = useStyles()

    const [options,setOptions] = React.useState({
        types:['Hang Tags','Pcs Polybag','Stickers','Master Polybag','Carton','Header Card'],
        uom:['Pcs','Meters','CMs'],
        accessoryType:['Packing','Sewing'],
        // cons:[],
        accessoryColor:['Red']

    })
    const handleModalClose = () => {
        setModalOpen(false)
        setModalValue('')
    }

    const [modalOpen, setModalOpen] = React.useState(false)
    const [modalValue, setModalValue] = React.useState('')
    const [attributeToAdd,setAttributeToAdd] = React.useState('')

    const [state,setState] = React.useState({tableValues:[
        {
            type:'',
            uom:'',
            accessoryType:'',
            cons:0,
            qty:0,
            accessoryColor:'',
            garmentColor:0,
            remarks:'',
            id:uuid()
        }        
    ]})

    const clearTable = () => {
        setState({...state,tableValues:[{
            type:'',
            uom:'',
            accessoryType:'',
            cons:0,
            qty:0,
            accessoryColor:'',
            garmentColor:0,
            remarks:'',
            id:uuid()
        }]})
    }

    const addRow = () => {
        setState({...state,tableValues:[...state.tableValues,{
            type:'',
            uom:'',
            accessoryType:'',
            cons:0,
            qty:0,
            accessoryColor:'',
            garmentColor:0,
            remarks:'',
            id:uuid()
        }]})
    }

    const getLabel = () => {
        if(attributeToAdd==='types'){
            return 'Type'
        }else if(attributeToAdd==='uom'){
            return 'UOM'
        }else if(attributeToAdd==='accessoryType'){
            return 'Accessory Type'
        }else if(attributeToAdd==='accessoryColor'){
            return 'Accessory Color'
        }
    }

    const addNewValue = () => {
        console.log('attributeToAdd: ',attributeToAdd)
        setOptions({...options,[attributeToAdd]:[...options[attributeToAdd],modalValue]})
        // if(attributeToAdd==='types'){
        //     setOptions({...options,[attributeToAdd]:[...options[attributeToAdd],modalValue]})
        // }else if(attributeToAdd==='process'){
        //     setOptions(draft => [...draft,modalValue])
        // }
        handleModalClose()
    }

    const handleSelectChange = async (e,obj,attribute) => {
        
        console.log(e,obj,attribute)
        let tempValues = await Promise.all(state.tableValues.map(tV => {
            if(tV.id===obj.id){
                if(attribute==='garmentColor'){
                    tV.qty = parseInt(tV.cons)*parseInt(e.target.value)
                }
                if(attribute==='cons'){
                    tV.qty = parseInt(tV.garmentColor)*parseInt(e.target.value)
                }
                return ({...tV,[attribute]:e.target.value})
            }else{
                return tV
            }
        }))

        setState({...state,tableValues:tempValues})
        
    }


    return(<div>
        <Dialog open={modalOpen} onClose={handleModalClose}>
            <div style={{width:350,display:'flex',flexDirection:'column',alignItems:'center',padding:20,position:'relative'}}>
                {/* <CloseIcon size={20} style={{color:'lightgrey',position:'absolute',right:15,top:15,cursor:'pointer'}} onClick={handleModalClose}/> */}
                <Typography variant="h6" color='primary' style={{marginBottom:20}}>
                    Add New {getLabel()}:
                </Typography>
                <TextField value={modalValue} onChange={e => setModalValue(e.target.value)} variant="outlined" fullWidth/>
                <Button variant="contained" style={{height:45,marginTop:20}} fullWidth color="primary" onClick={addNewValue}>Add</Button>
                <Button variant="contained" style={{height:45,marginTop:10}} fullWidth color="secondary" onClick={handleModalClose}>Cancel</Button>
            </div>
        </Dialog>
        <div style={{marginBottom:20,textAlign:'center',marginTop:20}}>
            <Typography variant="h6">
                Accessory Information
            </Typography>
        </div>
        <div>
            <span className={classes.tableFunction} onClick={addRow}>Row +</span>
            <span className={classes.tableFunction} onClick={clearTable}>Clear</span>
            {/* <Button variant="contained" color="primary" onClick={addRow}>Add Row</Button>
            <Button variant="contained" color="primary" style={{marginLeft:15}} onClick={clearTable}>Clear Table</Button> */}
        <table style={{width:'100%'}}>
                    <tr>
                        {/* <th></th> */}
                        <th>Type <AddIcon className={classes.addIcon} onClick={()=>{
                                setAttributeToAdd('types')
                                setModalOpen(true)
                        }} />
                        </th>
                        <th>UOM <AddIcon className={classes.addIcon} onClick={()=>{
                                setAttributeToAdd('uom')
                                setModalOpen(true)
                        }} /></th>
                        <th>Accessory Type <AddIcon className={classes.addIcon} onClick={()=>{
                                setAttributeToAdd('accessoryType')
                                setModalOpen(true)
                        }} /></th>
                        <th>Cons./Pcs</th>
                        <th>Qty</th>
                        <th>Accessory Color <AddIcon className={classes.addIcon} onClick={()=>{
                                setAttributeToAdd('accessoryColor')
                                setModalOpen(true)
                        }} /></th>
                        <th>Garment Color Qty</th>
                        <th>Placement/Remarks</th>
                    </tr>
                    <tbody>
                        {
                            state.tableValues.map(tV => (
                                <tr>
                                    <td style={{textAlign:'center'}}>
                                        <Select native value={tV.type} onChange={(e)=>handleSelectChange(e,tV,'type')}>
                                            {options.types.map(op => <option value={op}>{op}</option>)}
                                        </Select>
                                    </td>
                                    <td style={{textAlign:'center'}}>
                                        <Select native value={tV.uom} onChange={(e)=>handleSelectChange(e,tV,'uom')}>
                                            {options.uom.map(op => <option value={op}>{op}</option>)}
                                        </Select>
                                    </td>
                                    <td style={{textAlign:'center'}}>
                                        <Select native value={tV.accessoryType} onChange={(e)=>handleSelectChange(e,tV,'accessoryType')}>
                                            {options.accessoryType.map(op => <option value={op}>{op}</option>)}
                                        </Select>
                                    </td>
                                    <td style={{textAlign:'center'}}>
                                        <input value={tV.cons} type="number" onChange={(e)=>handleSelectChange(e,tV,'cons')} style={{backgroundColor:'rgba(0, 0, 0, 0)',fontSize:14,border:'none',textAlign:'center',width:60}} />
                                    </td>
                                    <td>
                                        {isNaN(tV.qty)?0:tV.qty}
                                    </td>
                                    <td style={{textAlign:'center'}}>
                                        <Select native value={tV.accessoryColor} onChange={(e)=>handleSelectChange(e,tV,'accessoryColor')}>
                                            {options.accessoryColor.map(op => <option value={op}>{op}</option>)}
                                        </Select>
                                    </td>
                                    <td style={{textAlign:'center'}}>
                                        <input value={tV.garmentColor} type="number" onChange={(e)=>handleSelectChange(e,tV,'garmentColor')} style={{backgroundColor:'rgba(0, 0, 0, 0)',fontSize:14,border:'none',textAlign:'center',width:60}} />
                                    </td>
                                    <td style={{textAlign:'center'}}>
                                        <input multiple={3} value={tV.remarks} onChange={(e)=>handleSelectChange(e,tV,'remarks')} style={{backgroundColor:'rgba(0, 0, 0, 0)',fontSize:14,border:'none',textAlign:'center',width:'100%'}} />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
        </div>
        <div style={{display:'flex',justifyContent:'center',padding:20}}>
            <Button variant='contained' color="primary" style={{width:200}}>Submit</Button>
        </div>
    </div>)
}


export default AccessoryInformation