import React from 'react'
import { TextField, Typography, Button, Dialog, Select } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Autocomplete } from '@material-ui/lab'
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

const ColorInforamtion = props => {

    const classes = useStyles()
    
    const [modalOpen, setModalOpen] = React.useState(false)
    const [values, setValues] = React.useState({})
    const [options, setOptions] = React.useState({
        colors:['Blue','Black'],
        dyeProcess:['Solid Dye','Wash Only','Bleech','Double Portion Dye'],
        dip:['type'],
        dpx:['type'],
        qty:['type'],
    })
    const [modalValue, setModalValue] = React.useState('')
    const [attributeToAdd,setAttributeToAdd] = React.useState('')

    const handleModalClose = () => {
        setModalOpen(false)
        setModalValue('')
    }

    const getLabel = () => {
        if(attributeToAdd==='colors'){
            return 'Color'
        }else if(attributeToAdd==='dyeProcess'){
            return 'Dye Process'
        }else if(attributeToAdd==='dip'){
            return 'DIP'
        }else if(attributeToAdd==='dpx'){
            return 'DPX'
        }
    }

    const addValue = () => {
        
        setOptions({...options,[attributeToAdd]:[...options[attributeToAdd],modalValue]})
        // setModalValue('')
        handleModalClose()

    }

    const handleOptionsAdd = (attr) => {
        setAttributeToAdd(attr)
        setModalOpen(true)
    }


    return(<div>
        <Dialog open={modalOpen} onClose={handleModalClose}>
                <div style={{width:350,display:'flex',flexDirection:'column',alignItems:'center',padding:20,position:'relative'}}>
                    <Typography variant="h6" color='primary' style={{marginBottom:20}}>
                        Add New {getLabel()}:
                    </Typography>
                    <TextField value={modalValue} onChange={e => setModalValue(e.target.value)} variant="outlined" fullWidth/>
                    <Button variant="contained" style={{height:45,marginTop:20}} fullWidth color="primary" onClick={addValue}>Add</Button>
                    <Button variant="contained" style={{height:45,marginTop:10}} fullWidth color="secondary" onClick={handleModalClose}>Cancel</Button>
                </div>
            </Dialog>
        <table style={{width:'100%'}}>
                <thead>
                    <tr>
                        <th>Colors <AddIcon className={classes.addIcon} onClick={()=>handleOptionsAdd('colors')} /></th>
                        <th>Dye Process <AddIcon className={classes.addIcon} onClick={()=>handleOptionsAdd('dyeProcess')} /></th>
                        <th>DIP# <AddIcon className={classes.addIcon} onClick={()=>handleOptionsAdd('dip')} /></th>
                        <th>DPX# <AddIcon className={classes.addIcon} onClick={()=>handleOptionsAdd('dpx')} /></th>
                        <th>Qty</th>
                        <th>Kgs</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><Select native style={{width:'100%'}} value={null}>{options.colors.map(c => (<option value={c}>{c}</option>))}</Select></td>
                        <td><Select native style={{width:'100%'}} value={null}>{options.dyeProcess.map(d => (<option value={d}>{d}</option>))}</Select></td>
                        <td>
                            <Autocomplete
                                options={options.dip}
                                getOptionLabel={option => option}
                                style={{ width: '100%' }}
                                onChange={(e,option) => {
                                    // props.setState({...props.state,shift:option})
                                }}
                                renderInput={params => (
                                    <TextField {...params} variant="standard" fullWidth />
                                )}
                            />
                        </td>
                        <td>
                            <Autocomplete
                                options={options.dpx}
                                getOptionLabel={option => option}
                                style={{ width: '100%' }}
                                onChange={(e,option) => {
                                    // props.setState({...props.state,shift:option})
                                }}
                                renderInput={params => (
                                    <TextField {...params} variant="standard" fullWidth />
                                )}
                            />
                        </td>
                        <td>100</td>
                        <td>10</td>
                        <td>Something</td>
                    </tr>
                </tbody>
            </table>
    </div>)
}

export default ColorInforamtion