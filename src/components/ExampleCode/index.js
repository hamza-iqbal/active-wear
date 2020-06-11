import React from 'react'
import { Typography, Button, TextField, Dialog, Select } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import uuid from 'uuid/v4'

const useStyles = makeStyles({
    headerPlus:{
        cursor:'pointer',
        fontWeight:'bold'
    }
})



const SewingThread = props => {

    const classes = useStyles()

    const [modalOpen, setModalOpen] = React.useState(false)
    const [modalValue, setModalValue] = React.useState('')
    const [attributeToAdd,setAttributeToAdd] = React.useState('')

    const [options,setOptions] = React.useState({
        itemType:['Sewing Thread'],
        count:['50/3 Spun Polyester','100/24/2 Nylon'],
        mainColor:['Black/white'],
        threadColor:['white','black']
    })

    const [tableValues,setTableValues] = React.useState([
        {
            id:uuid(),
            itemType:'Sewing Thread',
            count:'100/24/2 Nylon',
            mainColor:'Black/white',
            threadColor:'white',
            stitchPcs:1450,
            cons:0,
            total:0
        }
    ])

    const recalculate = async () => {

        let tempValues = await Promise.all(tableValues.map(tV => {
            tV.total = parseFloat((parseFloat(tV.cons)/1000)*tV.stitchPcs)
        }))

        setTableValues(tempValues)
        
    }

    // React.useEffect(()=>{

    // },[tableValues])

    const getLabel = () => {
        if(attributeToAdd==='itemType'){
            return 'Item Type'
        }else if(attributeToAdd==='count'){
            return 'Count'
        }else if(attributeToAdd==='mainColor'){
            return 'Main Color'
        }else if(attributeToAdd==='threadColor'){
            return 'Thread Color'
        }
    }

    const handleModalClose = () => {
        setModalOpen(false)
        setModalValue('')
    }

    const addValue = () => {
        
        setOptions({...options,[attributeToAdd]:[...options[attributeToAdd],modalValue]})
        // setModalValue('')
        handleModalClose()

    }

    const handleSelectChange = async (e,obj,attribute) => {
        
        console.log(e,obj,attribute)
        let tempValues = await Promise.all(tableValues.map(tV => {
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

        // setState({...state,tableValues:tempValues})
        setTableValues(tempValues)
        recalculate()
        
    }

    const clearTable = () => {
        // setState({...state,tableValues:[{
        //     type:'',
        //     uom:'',
        //     accessoryType:'',
        //     cons:0,
        //     qty:0,
        //     accessoryColor:'',
        //     garmentColor:0,
        //     remarks:'',
        //     id:uuid()
        // }]})
    }

    const addRow = () => {
        // setState({...state,tableValues:[...state.tableValues,{
        //     type:'',
        //     uom:'',
        //     accessoryType:'',
        //     cons:0,
        //     qty:0,
        //     accessoryColor:'',
        //     garmentColor:0,
        //     remarks:'',
        //     id:uuid()
        // }]})
    }


    return (<div>
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
        <div style={{ marginBottom: 20, textAlign: 'center', marginTop: 20 }}>
            <Typography variant="h6">
                Sewing Thread Information
            </Typography>
        </div>
        <Button variant="contained" color="primary" onClick={addRow}>Add Row</Button>
            <Button variant="contained" color="primary" style={{marginLeft:15}} onClick={clearTable}>Clear Table</Button>
        <table style={{width:'100%'}}>
                    <tr>
                        {/* <th></th> */}
                        <th>Type <span className={classes.headerPlus} onClick={()=>{
                            setAttributeToAdd('itemType')
                            setModalOpen(true)
                        }}>+</span></th>
                        <th>Count <span className={classes.headerPlus} onClick={()=>{
                            setAttributeToAdd('count')
                            setModalOpen(true)
                        }}>+</span></th>
                        <th>Main Color <span className={classes.headerPlus} onClick={()=>{
                            setAttributeToAdd('mainColor')
                            setModalOpen(true)
                        }}>+</span></th>
                        <th>Stitch Pcs</th>
                        <th>Thread Color <span className={classes.headerPlus} onClick={()=>{
                            setAttributeToAdd('threadColor')
                            setModalOpen(true)
                        }}>+</span></th>
                        <th>Cons. Gram</th>
                        <th>Total Kgs</th>
                    </tr>
                    <tbody>
                        {
                            tableValues.map(tV => (
                                <tr>
                                    <td style={{textAlign:'center'}}>
                                        <Select native value={tV.itemType} onChange={(e)=>handleSelectChange(e,tV,'itemType')}>
                                            {options.itemType.map(op => <option value={op}>{op}</option>)}
                                        </Select>
                                    </td>
                                    <td style={{textAlign:'center'}}>
                                        <Select native value={tV.count} onChange={(e)=>handleSelectChange(e,tV,'count')}>
                                            {options.count.map(op => <option value={op}>{op}</option>)}
                                        </Select>
                                    </td>
                                    <td style={{textAlign:'center'}}>
                                        <Select native value={tV.mainColor} onChange={(e)=>handleSelectChange(e,tV,'mainColor')}>
                                            {options.mainColor.map(op => <option value={op}>{op}</option>)}
                                        </Select>
                                    </td>
                                    <td style={{textAlign:'center'}}>
                                        {tV.stitchPcs}
                                        {/* <input value={tV.stitchPcs} type="number" onChange={(e)=>handleSelectChange(e,tV,'stitchPcs')} style={{backgroundColor:'rgba(0, 0, 0, 0)',fontSize:14,border:'none',textAlign:'center',width:60}} /> */}
                                    </td>
                                    <td style={{textAlign:'center'}}>
                                        <Select native value={tV.threadColor} onChange={(e)=>handleSelectChange(e,tV,'threadColor')}>
                                            {options.mainColor.map(op => <option value={op}>{op}</option>)}
                                        </Select>
                                    </td>
                                    <td style={{textAlign:'center'}}>
                                        <input value={tV.cons} type="number" onChange={(e)=>handleSelectChange(e,tV,'cons')} style={{backgroundColor:'rgba(0, 0, 0, 0)',fontSize:14,border:'none',textAlign:'center',width:60}} />
                                    </td>
                                    <td style={{textAlign:'center'}}>
                                        0
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',padding:20}}>
                        <Button variant="contained" color='primary'>SUBMIT</Button>
                </div>
    </div>)
}

export default SewingThread