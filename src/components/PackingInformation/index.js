import React from 'react'
import { Typography, Button, TextField, Dialog, Select, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Autocomplete } from '@material-ui/lab'
import uuid from 'uuid/v4'
import LeftTable from '../LeftTable'
import ComboSection from '../ComboSection'

// const useStyles = makeStyles({
//     headerPlus:{
//         cursor:'pointer',
//         fontWeight:'bold'
//     }
// })

const useStyles = makeStyles(theme => ({
    innerGrid:{
        padding:5,
        display:'flex',
        justifyContent:'center'
    },
    outerGrid:{
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
        padding:5,
        width:250
    },
    headerPlus:{
                cursor:'pointer',
                fontWeight:'bold'
            }
}))



const PackingInformation = props => {

    const classes = useStyles()

    const [modalOpen, setModalOpen] = React.useState(false)
    const [sizes, setSizes] = React.useState([{size:'S',ratioValue:1,id:uuid()},{size:'M',ratioValue:2,id:uuid()},{size:'L',ratioValue:1,id:uuid()}])
    const [modalValue, setModalValue] = React.useState('')
    const [attributeToAdd,setAttributeToAdd] = React.useState('')

    const [options,setOptions] = React.useState({
        colors:['Solid Pack'],
        combos:['50/3 Spun Polyester','100/24/2 Nylon'],
        sizes:['Assorted Pack']
    })

    const [combos,setCombos] = React.useState([
        {
            id:uuid(),
            comboName:'',
            colorsAndValues:[{color:'Black',valueS:0,valueM:0,valueL:0,id:uuid(),rowTotal:0},{color:'Charcoal',valueS:0,valueM:0,valueL:0,id:uuid(),rowTotal:0}],
            total:{totalS:0,totalM:0,totalL:0,total:0},
            ratioWisePackedQty:0,
            masterPolyBagsQty:0,
            cartonQty:0,
            
        },
        {
            id:uuid(),
            comboName:'',
            colorsAndValues:[{color:'White',valueS:0,valueM:0,valueL:0,id:uuid(),rowTotal:0},{color:'Charcoal',valueS:0,valueM:0,valueL:0,id:uuid(),rowTotal:0}],
            total:{totalS:0,totalM:0,totalL:0,total:0},
            ratioWisePackedQty:0,
            masterPolyBagsQty:0,
            cartonQty:0,
        },
    ])

    const [state,setState] = React.useState({color:'Solid Pack',combo:'Single Color Pack',size:'Assorted Pack'})

    const getLabel = () => {
        if(attributeToAdd==='colors'){
            return 'Color'
        }else if(attributeToAdd==='combos'){
            return 'Combo'
        }else if(attributeToAdd==='sizes'){
            return 'Size'
        }
    }

    const handleModalClose = () => {
        setModalOpen(false)
        setModalValue('')
    }

    const addValue = () => {
        
        setOptions({...options,[attributeToAdd]:[...options[attributeToAdd],modalValue]})
        handleModalClose()

    }

    
    // const handleSelectChange = async (e,obj,attribute) => {
        
    //     console.log(e.target.value,obj,attribute)
    //     let tempValues = await Promise.all(tableValues.map(tV => {
    //         if(tV.id===obj.id){
    //             return ({...tV,[attribute]:attribute==='cons'?parseFloat(e.target.value):e.target.value})
    //         }else{
    //             return tV
    //         }
    //     }))

    //     // setState({...state,tableValues:tempValues})
    //     // setTableValues(tempValues)
    //     recalculate(tempValues)
        
    // }

    // const clearTable = () => {
    //     setTableValues([{
    //         id:uuid(),
    //         itemType:'Sewing Thread',
    //         count:'100/24/2 Nylon',
    //         mainColor:'Black/white',
    //         threadColor:'white',
    //         stitchPcs:1450,
    //         cons:0,
    //     }])
    // }

    // const addRow = () => {
    //     setTableValues([...tableValues,{
    //         id:uuid(),
    //         itemType:'Sewing Thread',
    //         count:'100/24/2 Nylon',
    //         mainColor:'Black/white',
    //         threadColor:'white',
    //         stitchPcs:1450,
    //         cons:0,
    //     }])
    // }


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
                Packing Information
            </Typography>
        </div>
        {/*  */}
        <Grid container>
            <Grid item lg={4} md={4} sm={6} xs={6}>
                <LeftTable
                    setAttributeToAdd={setAttributeToAdd}
                    setModalOpen={setModalOpen}
                    state={state}
                    options={options}
                    sizes={sizes}
                    setSizes={setSizes}
                />
            </Grid>
            <Grid item lg={8} md={8} sm={6} xs={6}>
                <ComboSection
                    setAttributeToAdd={setAttributeToAdd}
                    setModalOpen={setModalOpen}
                    // state={state}
                    // options={options}
                    combos={combos}
                    setCombos={setCombos}
                    sizes={sizes}
                    setSizes={setSizes}
                />
            </Grid>
        </Grid>
        

                <div style={{display:'flex',flexDirection:'column',alignItems:'center',padding:20}}>
                        <Button variant="contained" color='primary' style={{width:300,height:50}}>SUBMIT</Button>
                </div>
    </div>)
}

export default PackingInformation