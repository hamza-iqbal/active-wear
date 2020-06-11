import React from 'react'
import { Button, CircularProgress, Select, Dialog, Typography, TextField } from '@material-ui/core'
// import SearchIcon from '@material-ui/icons/Search'
// import DeleteIcon from '@material-ui/icons/Delete'
// import InfoIcon from '@material-ui/icons/Info'
// import EditIcon from '@material-ui/icons/Edit'
import { makeStyles } from '@material-ui/styles'
import { end_point } from '../../util/config'
import './index.css'
import AddIcon from '@material-ui/icons/AddBox'
import uuid from 'uuid/v4'
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import { end_point } from '../../util/config'
// import { withSnackbar } from 'notistack'

const useStyles = makeStyles(theme => ({
    tableFunction: {
        cursor: 'pointer',
        color: 'black',
        fontWeight: 'bold',
        backgroundColor: 'lightgrey',
        borderRadius: 5,
        overflow: 'hidden',
        margin: '0px 4px',
        padding: '2px 8px'
    },
    addIcon:{
        cursor:'pointer',
        marginBottom:-7,
        color:'#4B8D3A',
        // fontSize:10
    }
}))

const Table = props => {

    const classes = useStyles()

    const [sizes, setSizes] = React.useState([{ value: 'S', id: uuid() }])
    const [options, setOptions] = React.useState({
        sizes:[],
        colors:[],
        categories:[]
    })
    // const [colorOptions, setColorOptions] = React.useState()
    // const [categories, setCategories] = React.useState()
    const [attributeToAdd,setAttributeToAdd] = React.useState('')

    const [loading, setLoading] = React.useState(false)
    const [modalOpen, setModalOpen] = React.useState(false)
    const [modalValue, setModalValue] = React.useState('')
    // const [attributeToAdd,setAttributeToAdd] = React.useState('')

    const handleModalClose = () => {
        setModalOpen(false)
        setModalValue('')
    }
    // const addNewValue = () => {
    //     // console.log('attributeToAdd: ',attributeToAdd)
    //     setCategories([...categories, modalValue])
    //     handleModalClose()
    // }

    // const getLabel = () => {
    //     if(attributeToAdd==='ilRefs'){
    //         return 'IL Refs'
    const clearTable = () => {
        setTableValues([{ color: 'Black', sizes: [{ value: 0, id: uuid() }], category: 'Black & White', total: 0, rowId: uuid() }])
        setSizes([{ value: 'S', id: uuid() }])
    }
    const addColor = async () => {
        let sizes = []
        // console.log('size ', tableValues[0].sizes.length)
        for (let i = 0; i < tableValues[0].sizes.length; i++) {
            sizes = [...sizes, { value: 0, id: uuid() }]
        }
        setTableValues([...tableValues, { color: 'Color', sizes, category: 'Black & White', total: 0, rowId: uuid() }])
    }
    const addSize = async () => {
        let newTableValues = await Promise.all(tableValues.map(tV => {
            tV.sizes = [...tV.sizes, { value: 0, id: uuid() }]
            return tV
        }))
        setTableValues(newTableValues)
        setSizes([...sizes, { value: 'S', id: uuid() }])
    }

    const [tableValues, setTableValues] = React.useState([
        { color: 'Black', sizes: [{ value: 0, id: uuid() }], total: 0, category: 'Black & White', rowId: uuid() }
    ])

    const handleChange = async (row, e, attr) => {
        // console.log('handleChange -> ', row, e.target.value)
        let tempTable = await Promise.all(tableValues.map(tV => {
            if (tV.rowId === row.rowId) {
                return { ...tV, [attr]: e.target.value }
            } else {
                return tV
            }
        }))
        setTableValues(tempTable)
    }

    const handleQuantityChange = async (row, cell, e) => {
        // console.log('handleQuantityChange -> ', row, cell, e.target.value)
        let tempTable = await Promise.all(tableValues.map(async tV => {
            if (tV.rowId === row.rowId) {
                let newValues = await Promise.all(tV.sizes.map(s => {
                    if (s.id === cell.id) {
                        return ({ ...s, value: parseInt(e.target.value) })
                    } else {
                        return s
                    }
                }))
                // console.log('newValues: ', newValues)
                tV.sizes = newValues
                return tV
            } else {
                return tV
            }
        }))
        // console.log('tempTable: ', tempTable)

        setTableValues(tempTable)
        recalculate()
    }

    const recalculate = async () => {
        let newTableValues = await Promise.all(tableValues.map(async row => {
            // console.log('row ============> ', row)
            let sum = 0
            for (let i = 0; i < row.sizes.length; i++) {
                sum = sum + row.sizes[i].value
            }
            row.total = sum
            // console.log('row +++++++++> ', row)
            return row
        }))
        setTableValues(newTableValues)
    }

    const getLabel = () => {
        if(attributeToAdd==='colors'){
            return 'Color'
        }else if(attributeToAdd==='sizes'){
            return 'Size'
        }else if(attributeToAdd==='categories'){
            return 'Category'
        }
    }

    const addValue = () => {
        
        setLoading(true)
        console.log('attr: ',attributeToAdd,modalValue)

        try {
            fetch(end_point + 'api/orderbookings/insert/colors', {
                method: 'post',
                 headers:{
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body:JSON.stringify({Colors:modalValue})
            }).then(response => response.json()).then(async response => {
                console.log(`response ------------> `, response)
                setLoading(false)
            }).catch(err => {
                console.log('err', err)
                setLoading(false)
            })
        } catch (error) {
            console.log(`error ------------> `, error)
            setLoading(false)
        }
        
        // setOptions({...options,[attributeToAdd]:[...options[attributeToAdd],modalValue]})
        // handleModalClose()

    }

    const handleOptionsAdd = (attr) => {
        setAttributeToAdd(attr)
        setModalOpen(true)
    }

    // const getSum = async (sizes) => {
    //     console.log('SIZES: ',sizes)
    //     let sum = 0
    //     for(let i=0; i<sizes.length; i++){
    //         sum = sum + sizes[i].value
    //     }
    //     console.log(sum)
    //     return sum
    // }
    const fetchValues = async () => {
        setLoading(true)
        let vals = {colors:[],sizes:[],categories:[]}
        // Fetching Colors
        try {
            await fetch(end_point + 'api/orderbookings/fetch/colors/all', {
                method: 'get',
                 headers:{
                     'Content-Type':'application/json',
                }
            }).then(response => response.json()).then(async response => {
                console.log(`response ------------> `, response)
                if(response.Colors){
                    let newColors = response.Colors.map(c => c.ColorDescription)
                    vals.colors = newColors
                    // setOptions({...options,colors:newColors})
                }
                setLoading(false)
            }).catch(err => {
                console.log('err', err)
                setLoading(false)
            })
        } catch (error) {
            console.log(`error ------------> `, error)
            setLoading(false)
        }
        // Fetching Categories
        try {
            await fetch(end_point + 'api/orderbookings/fetch/categories/all', {
                method: 'get',
                 headers:{
                     'Content-Type':'application/json',
                }
            }).then(response => response.json()).then(async response => {
                console.log(`response ------------> `, response)
                if(response.Categories){
                    let newCats = response.Categories.map(c => c.CategoryDescription)
                    vals.categories = newCats
                    // setOptions({...options,categories:newCats})
                }
                setLoading(false)
            }).catch(err => {
                console.log('err', err)
                setLoading(false)
            })
        } catch (error) {
            console.log(`error ------------> `, error)
            setLoading(false)
        }
        // Fetching Sizes
        try {
            await fetch(end_point + 'api/orderbookings/fetch/sizes/all', {
                method: 'get',
                 headers:{
                     'Content-Type':'application/json',
                }
            }).then(response => response.json()).then(async response => {
                console.log(`response ------------> `, response)
                if(response.Sizes){
                    let newSizesL = response.Sizes.map(c => c.SizeDescription)
                    // setOptions({...options,sizes:newSizesL})
                    vals.sizes = newSizesL
                }
                setLoading(false)
            }).catch(err => {
                console.log('err', err)
                setLoading(false)
            })
        } catch (error) {
            console.log(`error ------------> `, error)
            setLoading(false)
        }

        console.log('vals -> ',vals)
        setOptions({...options,sizes:vals.sizes,colors:vals.colors,categories:vals.categories})
    }
    React.useEffect(()=>{
        fetchValues()
    },[])

    // console.log('options => ',options)


    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                <span className={classes.tableFunction} onClick={addColor}>Color +</span>
                <span className={classes.tableFunction} onClick={addSize}>Size +</span>
                <span className={classes.tableFunction} onClick={clearTable}>Clear</span>
                {/* <Button variant="contained" color='primary' style={{marginRight:10}} onClick={addColor}>Add Color +</Button>
                <Button variant="contained" color='primary' style={{marginRight:10}} onClick={addSize}>Add Size +</Button>
                <Button variant="contained" color='primary' style={{marginRight:10}} onClick={clearTable}>Clear Table</Button> */}
            </div>

            <Dialog open={modalOpen} onClose={handleModalClose}>
                <div style={{ width: 350, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 20, position: 'relative' }}>
                    {/* <CloseIcon size={20} style={{color:'lightgrey',position:'absolute',right:15,top:15,cursor:'pointer'}} onClick={handleModalClose}/> */}
                    <Typography variant="h6" color='primary' style={{ marginBottom: 20 }}>
                        Add New {getLabel()}:
                </Typography>
                    <TextField value={modalValue} onChange={e => setModalValue(e.target.value)} variant="outlined" fullWidth />
                    <Button variant="contained" style={{ height: 45, marginTop: 20 }} fullWidth color="primary" onClick={addValue}>Add</Button>
                    <Button variant="contained" style={{ height: 45, marginTop: 10 }} fullWidth color="secondary" onClick={handleModalClose}>Cancel</Button>
                </div>
            </Dialog>
            <div style={{ display: 'flex', justifyContent: 'center', overflowX: 'scroll' }}>
                {
                    loading === true ?
                        <div style={{ padding: 20, display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress color='primary' />
                        </div>
                        :
                        <table style={{ width: '100%' }}>
                            <tr>
                                {/* <th style={{ width: '40px' }}></th> */}
                                <th style={{width:145}}>Color <AddIcon className={classes.addIcon} onClick={()=>handleOptionsAdd('colors')} /></th>
                                <th style={{ width: 145 }}>Category <AddIcon className={classes.addIcon} onClick={()=>handleOptionsAdd('categories')} /></th>
                                {
                                    sizes.map(s => (
                                        <th style={{width:145}}>
                                            Size: &nbsp; <Select  native value={s.value} onChange={async e => {
                                                // console.log(sizes)
                                                let newSizes = await Promise.all(sizes.map(nS => {
                                                    if (nS.id === s.id) {
                                                        return { ...nS, value: e.target.value }
                                                    } else {
                                                        return nS
                                                    }
                                                }))
                                                // console.log
                                                setSizes(newSizes)
                                            }}>
                                                {options.sizes.map(c => (<option value={c}>{c}</option>))}
                                            </Select>
                                            &nbsp;
                                            <AddIcon className={classes.addIcon} onClick={()=>handleOptionsAdd('sizes')} />
                                            {/* <input value={s.value} onChange= style={{backgroundColor:'rgba(0, 0, 0, 0)',textAlign:'center',fontWeight:'bold',border:'none',width:60}} /> */}
                                        </th>
                                    ))
                                }
                                <th style={{width:145}}>Total</th>
                            </tr>
                            <tbody>
                                {
                                    tableValues.length > 0 && tableValues.map((v, i) => (
                                        <tr key={i}>
                                            <td>
                                                <Select native value={v.color} onChange={e => handleChange(v, e, 'color')}>
                                                    {options.colors.map(c => (<option value={clearTable}>{c}</option>))}
                                                </Select>
                                            </td>
                                            <td>
                                                <Select native value={v.category} onChange={e => handleChange(v, e, 'category')}>
                                                    {
                                                        options.categories.map(c => (<option value={c}>{c}</option>))
                                                    }
                                                </Select>

                                            </td>
                                            {
                                                v.sizes.map(s => (<td>
                                                    <input value={s.value} type="number" onChange={(e) => handleQuantityChange(v, s, e)} style={{ backgroundColor: 'rgba(0, 0, 0, 0)', fontSize: 14, border: 'none', width: 60 }} />
                                                </td>))
                                            }
                                            <td>{v.total}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                }
            </div>
        </div>
    )
}

export default Table