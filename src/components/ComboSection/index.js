import React from 'react'
import { Select,Dialog,TextField,Typography,Button, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/AddBox'
import DeleteIcon from '@material-ui/icons/Close'
import uuid from 'uuid/v4'

const useStyles = makeStyles(theme => ({
    innerGrid: {
        padding: 5,
        display: 'flex',
        justifyContent: 'center'
    },
    outerGrid: {
        display: 'flex',
        justifyContent: 'center'
    },
    plusContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        border: '1px solid lightgrey',
        borderRadius: 5,
        cursor: 'pointer'
    },
    innerGridBelow: {
        padding: 5,
        width: 250
    },
    headerPlus: {
        cursor: 'pointer',
        fontWeight: 'bold'
    }
}))
const LeftTable = props => {

    const classes = useStyles()
    const [selectedCombo,setSelectedCombo] = React.useState(props.combos[0])
    const [manageCombo,setManageCombo] = React.useState(null)
    const [modalOpen, setModalOpen] = React.useState(false)
    const [modalValue, setModalValue] = React.useState('')

    const handleModalClose = () => {
        setModalOpen(false)
        setModalValue('')
        setManageCombo(null)
    }

    const handleAddColor = async () => {

        let colorsAndValues = [...manageCombo.colorsAndValues,{color:modalValue,valueS:0,valueM:0,valueL:0,id:uuid(),rowTotal:0}]
        

        let newCombos = await Promise.all(props.combos.map(combo => {
            if(combo.id===manageCombo.id){
                return {...combo,colorsAndValues}
            }else{
                return combo
            }
        }))
        props.setCombos(newCombos)
        handleModalClose()
    }


    const handleDeleteColor = async (objToDelete) => {

        let newCombos = await Promise.all(props.combos.map(async combo => {
            if(combo.id===manageCombo.id){
                let newColors = await Promise.all(combo.colorsAndValues.filter(cV => cV.id!==objToDelete.id))
                let totalS = 0
                let totalM = 0
                let totalL = 0
                // let total = 0
                console.log('newColors:',newColors)
                await Promise.all(newColors.map(color => {
                    totalS = totalS + parseInt(color.valueS)
                    totalM = totalM + parseInt(color.valueM)
                    totalL = totalL + parseInt(color.valueL)
                }))
                let total = {totalS,totalM,totalL,total:parseInt(totalS)+parseInt(totalM)+parseInt(totalL)}
                let updatedCombo = {...combo,colorsAndValues:newColors,total}
                setManageCombo(updatedCombo)
                return updatedCombo
            }else{
                return combo
            }
        }))
        props.setCombos(newCombos)

    }
    

    const makeName = (values) => {
        console.log("values -------> ", values)
        let text = ""
        for (let i = 0; i < values.length; i++) {
            if (i === values.length - 1) {
                text = text + values[i].color
            } else {
                text = text + values[i].color + '/'
            }
        }
        // values.map(v => v.color)
        // var name = values.reduce(function(a, b){
        //     return a.color + b.color;
        // }, "");
        console.log("text -------> ", text)
        return text
    }

    const handleSimpleChange = async (e, attr, comboObj) => {

        let newValues = await Promise.all(props.combos.map(async c => {
            if(c.id===comboObj.id){
                return {...c,[attr]:e.target.value}
            }else{
                return c
            }
        }))
        props.setCombos(newValues)
        
    }

    const handleChange = async (e, colorObj, comboObj, attr) => {

        let newValues = await Promise.all(props.combos.map(async c => {
            if(c.id===comboObj.id){
                let newColors  = await Promise.all(c.colorsAndValues.map(color => {
                    if(color.id===colorObj.id){
                        color = {...color,[attr]:parseInt(e.target.value)}
                        let rowTotal = parseInt(color.valueS) + parseInt(color.valueM) + parseInt(color.valueL) 
                        return {...color,rowTotal}
                    }else{
                        return color
                    }
                }))
                // console.log('newnew',newColors)
                let totalS = 0
                let totalM = 0
                let totalL = 0
                // let total = 0
                await Promise.all(newColors.map(color => {
                    totalS = totalS + parseInt(color.valueS)
                    totalM = totalM + parseInt(color.valueM)
                    totalL = totalL + parseInt(color.valueL)
                }))
                let total = {totalS,totalM,totalL,total:parseInt(totalS)+parseInt(totalM)+parseInt(totalL)}
                return {...c,colorsAndValues:newColors,total}
            }else{
                
                return c
            }
        }))

        console.log('newValues: ',newValues)
        props.setCombos(newValues)
        
    }

    const handleAddCombo = () => {
        props.setCombos([...props.combos,
            {
                id:uuid(),
                comboName:'',
                colorsAndValues:[],
                total:{totalS:0,totalM:0,totalL:0,total:0},
                ratioWisePackedQty:0,
                masterPolyBagsQty:0,
                cartonQty:0,
                
            },
        ])
    }

    const handleSelected = (e) => {
        console.log('e.target.value',e.target.value)
        let newSelected = props.combos.filter(c => c.id===e.target.value)
        console.log('newSelected',newSelected)
        console.log('selectedCombo',selectedCombo)
        if(newSelected.length>0){
            setSelectedCombo(newSelected[0])
        }
    }

    const calMasterPolybagsQty = () => {
        let value = (selectedCombo.total.total/selectedCombo.colorsAndValues.length)
        let sum = 0
        props.sizes.map(s => {
            sum = sum + s.ratioValue
        })
        const answer = (value/sum)
        console.log('answer:',answer)
        return answer
    }

    React.useEffect(()=>{

        let selected = props.combos.filter(c => c.id === selectedCombo.id)
        if(selected.length>0){
            setSelectedCombo(selected[0])
        }

    },[props.combos])

    return (<div style={{ margin: 20, textAlign: 'center' }}>
        <Dialog open={modalOpen} onClose={handleModalClose}>
            <div style={{width:350,display:'flex',flexDirection:'column',alignItems:'center',padding:20,position:'relative'}}>
                {/* <CloseIcon size={20} style={{color:'lightgrey',position:'absolute',right:15,top:15,cursor:'pointer'}} onClick={handleModalClose}/> */}
                <Typography variant="h6" color='primary' style={{marginBottom:20}}>
                    Manage Combo:
                </Typography>
                {
                    manageCombo?
                    manageCombo.colorsAndValues.map(cV => (
                        <Paper style={{padding:10,margin:5,width:'100%',fontWeight:'bold',backgroundColor:'#F0F0F0',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                            {cV.color}
                            <DeleteIcon size={10} color='primary' className={classes.headerPlus} onClick={()=>handleDeleteColor(cV)}/>
                        </Paper>
                    ))
                    :'Nothing to show'
                }
                <TextField value={modalValue} style={{marginTop:20}} onChange={e => setModalValue(e.target.value)} variant="outlined" fullWidth inputProps={{style:{height:0}}}/>
                <Button variant="contained" style={{height:45,marginTop:10}} fullWidth color="primary" onClick={handleAddColor}>Add Color</Button>
                <Button variant="contained" style={{height:45,marginTop:10}} fullWidth color="secondary" onClick={handleModalClose}>Cancel</Button>
            </div>
        </Dialog>
        <table style={{ width: '100%' }}>
            <thead>
                <tr>
                    <th style={{display:'flex',alignItems:'center',justifyContent:'center'}}>Combo Name<AddIcon className={classes.headerPlus} onClick={()=>handleAddCombo()} /></th>
                    <th style={{ width: 100 }}>Color</th>
                    {props.sizes.map(s => (<th style={{ width: 100 }}>{s.size}</th>))}
                    <th style={{ width: 100 }}>Total</th>
                    {/* {console.log('asdad',props.sizes)} */}
                </tr>
            </thead>
            <tbody>
                {props.combos.map(c => (
                    <tr>
                        <td style={{ textAlign: 'center',alignItems:'center' }}>{makeName(c.colorsAndValues)}&nbsp;<EditIcon size={10} style={{marginBottom:-5}} color='primary' className={classes.headerPlus} onClick={()=>{
                            setManageCombo(c)
                            setModalOpen(true)
                            // console.log('adasdads')
                        }} /></td>
                        <td colSpan="5" style={{ padding: 0 }}>
                            <table style={{ width: '100%', margin: 0 }}>
                                <tbody>

                                    {/* <td></td> */}
                                    {
                                        c.colorsAndValues.map(cv => (
                                            <tr>
                                                <td style={{ width: 100 }}>{cv.color}</td>
                                                <td style={{ width: 100 }}>
                                                    <input value={cv.valueS} type="number" onChange={(e)=>handleChange(e,cv,c,'valueS')} style={{backgroundColor:'rgba(0, 0, 0, 0)',fontSize:14,border:'none',textAlign:'center',width:60}} />
                                                </td>
                                                <td style={{ width: 100 }}>
                                                    <input value={cv.valueM} type="number" onChange={(e)=>handleChange(e,cv,c,'valueM')} style={{backgroundColor:'rgba(0, 0, 0, 0)',fontSize:14,border:'none',textAlign:'center',width:60}} />
                                                </td>
                                                <td style={{ width: 100 }}>
                                                    <input value={cv.valueL} type="number" onChange={(e)=>handleChange(e,cv,c,'valueL')} style={{backgroundColor:'rgba(0, 0, 0, 0)',fontSize:14,border:'none',textAlign:'center',width:60}} />
                                                </td>
                                                <td style={{ width: 100, backgroundColor: 'grey', color: '#fff' }}>{cv.rowTotal}</td>
                                            </tr>
                                        ))
                                    }
                                    <tr style={{ backgroundColor: 'grey', color: '#fff' }}>
                                        <td>Total</td>
                                        <td style={{ width: 100 }}>{c.total.totalS}</td>
                                        <td style={{ width: 100 }}>{c.total.totalM}</td>
                                        <td style={{ width: 100 }}>{c.total.totalL}</td>
                                        <td style={{ width: 100 }}>{c.total.total}</td>

                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                ))}
            </tbody>

        </table>
        <div >
            <table style={{ width: '70%',margin:'20px 0px 0px' }}>
                <tr>
                    <td style={{fontWeight:'bold'}}>ComboPacking</td>
                    <td>
                        <Select native value={selectedCombo.id} onChange={e=>handleSelected(e)}>
                            {props.combos.map(c => (<option value={c.id}>{makeName(c.colorsAndValues)}</option>))}
                        </Select>
                    </td>
                </tr>
                <tr>
                    <td style={{fontWeight:'bold'}}>Ratio Wise Packed Qty</td>
                    <td>
                        {parseInt(selectedCombo.total.total/selectedCombo.colorsAndValues.length)}
                    </td>
                </tr>
                <tr>
                    <td style={{fontWeight:'bold'}}>Master Poly Bags Qty</td>
                    <td>
                        {parseInt(calMasterPolybagsQty())}
                    </td>
                </tr>
                <tr>
                    <td style={{fontWeight:'bold'}}>Carton Qty</td>
                    <td>
                        <input value={selectedCombo.cartonQty} type="number" onChange={(e)=>handleSimpleChange(e,'cartonQty',selectedCombo)} style={{backgroundColor:'rgba(0, 0, 0, 0)',fontSize:14,border:'none',textAlign:'left',width:60}} />
                    </td>
                </tr>

            </table>
        </div>
    </div>)
}


export default LeftTable