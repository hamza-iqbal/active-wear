import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography, Button, Dialog,TextField, Grid,CircularProgress } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { end_point } from '../../util/config'
import YarnTable from '../YarnTable'
import { useSnackbar } from 'notistack'
import CloseIcon from '@material-ui/icons/Close'
import SolidColors from '../SolidColors'
import WastageAllowance from '../WastageAllowance'
import uuid from 'uuid/v4'

const useStyles = makeStyles(theme => ({
    innerGrid:{
        padding:5,
        display: 'flex',
        justifyContent: 'center'
    },
    outerGrid:{
        padding:10,
        display:'flex',
        justifyContent:'center'
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
        padding: 5
    }
}))




const YarnInformation = props => {

    const classes = useStyles();
    const [fetched,setFetched] = React.useState(false)
    const [options,setOptions] = React.useState({
        interalPONumbers:[]
    })
    const [selectedOrderBooking, setSelectedOrderBooking] = React.useState({})
    const [state,setState] = React.useState({loading:false})
    const [colorType,setColorType] = React.useState('Solid Colors')
    const [orderBookings,setOrderBookings] = React.useState([])
    const [addNewYarn,setAddNewYarn] = React.useState(false)
    const [newYarnValues,setNewYarnValues] = React.useState({code:'',label:''})
    const [wastageAllowance,setWastageAllowance] = React.useState([{label:'Yarn',value:2,id:uuid()},{label:'Knitting',value:0,id:uuid()},{label:'Processing',value:0,id:uuid()},{label:'Stitching',value:0,id:uuid()},{label:'Yarn Dyeing',value:0,id:uuid()},{label:'Yd + Air Covering',value:0,id:uuid()}])
    const [columns,setColumns] = React.useState([])
    const [placementTypes,setPlacementTypes] = React.useState(['Main Body','Plaiting','Welt','None'])
    const [processTypes,setProcessTypes] = React.useState(['Bleach, Wash','Yarn Dye','None'])
    const [ydColors,setYdColors] = React.useState(['Black'])
    const [totalStats,setTotalStats] = React.useState({total:0,kgs:0})
    const [headers,setHeaders] = React.useState([{type:'Body',id:uuid()}])
    const [yarnCount,setYarnCount] = React.useState([{label:'100/68/1 DN Flat Nylon R/W (S +Z)',value:'1201'},{label:'22 22/12/1 Dtex ACV Nylon 2.4 Draft (S & Z)',value:'1202'},{label:'210 Bare Lycra',value:'1203'},{label:'22 22/12/1 Dtex ACV Nylon 2.4 Draft (S & Z)',value:'1204'}])

    const { enqueueSnackbar } = useSnackbar()

    const notify = (message) => {
        enqueueSnackbar(message, { variant:'info',anchorOrigin:{ horizontal: 'right', vertical: 'top' } })
    }


    const clearTable = () => {
        setHeaders([{type:'Body',id:uuid()}])
        setTotalStats({total:0})
        setTableValues([
            {
                rowTitle: '1201',
                type: '',
                rowId: uuid(),
                columns:[
                    {
                        id: uuid(),
                        new:0,
                        placement:'None',
                        process:'None',
                        ydColor:'Black'
                    }
                ],
                total:0,
                percentage:0,
                kgs:0
            },
            {
                rowTitle: '1202',
                type: '',
                rowId: uuid(),
                columns:[
                    {
                        id: uuid(),
                        new: 0,
                        placement:'None',
                        process:'None',
                        ydColor:'Black'
                    }
                ],
                total:0,
                percentage:0,
                kgs:0
            },
            {
                rowTitle: '1203',
                type: '',
                rowId: uuid(),
                columns:[
                    {
                        id: uuid(),
                        new:0,
                        placement:'None',
                        process:'None',
                        ydColor:'Black'
                    }
                ],
                total:0,
                percentage:0,
                kgs:0
            },
            {
                rowTitle: '1204',
                type: '',
                rowId: uuid(),
                columns:[
                    {
                        id: uuid(),
                        new:0,
                        placement:'None',
                        process:'None',
                        ydColor:'Black'
                    }
                ],
                total:0,
                percentage:0,
                kgs:0
            }
        ])
    }

    const [tableValues,setTableValues] = React.useState([
        {
            rowTitle: '1201',
            type: '',
            rowId: uuid(),
            columns:[
                {
                    id: uuid(),
                    new:0,
                    placement:'None',
                    process:'None',
                    ydColor:'Black'
                }
            ],
            total:0,
            percentage:0,
            kgs:0
        },
        {
            rowTitle: '1202',
            type: '',
            rowId: uuid(),
            columns:[
                {
                    id: uuid(),
                    new: 0,
                    placement:'None',
                    process:'None',
                    ydColor:'Black'
                }
            ],
            total:0,
            percentage:0,
            kgs:0
        },
        {
            rowTitle: '1203',
            type: '',
            rowId: uuid(),
            columns:[
                {
                    id: uuid(),
                    new:0,
                    placement:'None',
                    process:'None',
                    ydColor:'Black'
                }
            ],
            total:0,
            percentage:0,
            kgs:0
        },
        {
            rowTitle: '1204',
            type: '',
            rowId: uuid(),
            columns:[
                {
                    id: uuid(),
                    new:0,
                    placement:'None',
                    process:'None',
                    ydColor:'Black'
                }
            ],
            total:0,
            percentage:0,
            kgs:0
        }
    ])
    // const [total,setTotal] = React.useState({cons:0})
    console.log('table Date: ',columns)

    const addColumns = async () => {
        let newTableValues = await Promise.all(tableValues.map(tV => {
            tV.columns = [...tV.columns,{
                id: uuid(),
                new:0,
                placement:'None',
                process:'None',
                ydColor:'Black'
            }]
            return tV
        }))
        // setTableValues(newTableValues)
        setHeaders(draft => [...draft,{type:'Body',id:uuid()}])
        updateTableValues(newTableValues)
    }

    const updateTableValues = async (tableValues) => {
        if(tableValues.length>0 && tableValues[0].columns.length>0){
            
            let newTableValues = await Promise.all(tableValues.map(row => {
                console.log(row)
                let sum = row.columns.reduce((a, b) => ({new: a.new + b.new}))
                row.total = sum.new
                // row.percentage = parseInt(sum.new/total*100)
                return row
            }))
            let total = 0; 
            await Promise.all(tableValues.map(row => {
                total = total + row.total
            }))
            setTotalStats({...totalStats,total})
            console.log(';herer',total)
            newTableValues = await Promise.all(tableValues.map(row => {
                console.log(row)
                // let sum = row.columns.reduce((a, b) => ({new: a.new + b.new}))
                // row.total = sum.new
                let percentage = parseInt(row.total/total*100)
                console.log('percentage: ',percentage)
                row.percentage = percentage
                return row
            }))
            
            console.log('newTableValues ',newTableValues)
            setTableValues(newTableValues)
        }
    }

    const [modalOpen,setModalOpen] = React.useState(false)
    const [modalOpen2,setModalOpen2] = React.useState(false)
    const [modalValue,setModalValue] = React.useState('')
    const [attributeToAdd,setAttributeToAdd] = React.useState('')
    
    const handleModalClose = () => {
        setModalOpen(false)
        setModalValue('')
    }
    const handleModalClose2 = () => {
        setModalOpen2(false)
        setAddNewYarn(false)
        setNewYarnValues({code:'',description:''})
    }

    const getLabel = () => {
        if(attributeToAdd==='placement'){
            return 'Placement'
        }else if(attributeToAdd==='process'){
            return 'Process'
        }else if(attributeToAdd==='ydColors'){
            return 'Yd Color'
        }
    }

    const addNewValue = () => {
        console.log('attributeToAdd: ',attributeToAdd)
        if(attributeToAdd==='placement'){
            setPlacementTypes(draft => [...draft,modalValue])
        }else if(attributeToAdd==='process'){
            setProcessTypes(draft => [...draft,modalValue])
        }else if(attributeToAdd==='ydColors'){
            setYdColors(draft => [...draft,modalValue])
        }
        handleModalClose()
    }

    // const handleFetch = () => {
    //     setState({ ...state, loading: true })
        
    //     setTimeout(()=>{
    //         setFetched(true)
    //         setState({ ...state, loading: false })

    //     },1500)
    // }

    React.useEffect(() => {

        try {
            fetch(end_point + 'api/yarninformation/fetch/yarns/all', {
                method: 'get',
                // body: JSON.stringify(jsonObject)
            }).then(response => response.json()).then(async response => {
                console.log(`response ------------> `, response)
                if (response.OrderBookings) {
                    setOrderBookings(response.OrderBookings)
                    let InternalPO = await Promise.all(response.OrderBookings.map(ob => ob.InternalPO))
                    console.log(InternalPO)
                    setOptions({...options,interalPONumbers:InternalPO})
                }
                // notify('Successfully Added Order Booking!')
                setState({ ...state, loading: false })
            }).catch(err => {
                console.log('err', err)
                setState({ ...state, loading: false })
                // notify('Failed to save Order Booking!')
            })
        } catch (error) {
            console.log(`error ------------> `, error)
            setState({ ...state, loading: false })
            // notify('Failed to save Order Booking!')
        }

    }, [])

    const handleFetch = async () => {
        if(state.interalPONumber){
            setState({ ...state, loading: true })
            if(orderBookings){
                let filtered = await Promise.all(orderBookings.filter(ob => ob.InternalPO === state.interalPONumber))
                if(filtered.length>0){
                    console.log(filtered)
                    setSelectedOrderBooking(filtered[0])
                    setTimeout(() => {
                        setFetched(true)
                        setState({ ...state, loading: false })
                    }, 500)
                }else{
                    notify('No data found with this PO number')
                    setTimeout(() => {
                        // setFetched(true)
                        setState({ ...state, loading: false })
                    }, 500)
                }
            }
        }else{
            notify('Select a PO number first!')
        }
    }

    return(<div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
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
        <Dialog open={modalOpen2} onClose={handleModalClose2}>
            <div style={{width:500,display:'flex',flexDirection:'column',alignItems:'center',padding:20,position:'relative'}}>
            <CloseIcon size={20} style={{color:'lightgrey',position:'absolute',right:15,top:15,cursor:'pointer'}} onClick={handleModalClose2}/>
                <Typography variant="h6" color='primary'>Yarn Count List</Typography>
                <table style={{width:'100%'}}>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            yarnCount.map(y => (
                                <tr>
                                    <td>{y.value}</td>
                                    <td>{y.label}</td>
                                </tr>
                            ))
                        }
                        
                    </tbody>
                </table>
                {
                    addNewYarn === true?
                        <Grid container style={{marginBottom:10}}>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <Typography variant="subtitle2" style={{marginBottom:8}}>Add new Yarn Count:</Typography>
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <TextField variant="outlined" value={newYarnValues.code} onChange={e => setNewYarnValues({...newYarnValues,code:e.target.value})} label={'Code'} fullWidth></TextField>
                            </Grid>
                            <Grid item lg={7} md={7} sm={12} xs={12} style={{paddingLeft:10}}>
                                <TextField variant="outlined" value={newYarnValues.label} onChange={e => setNewYarnValues({...newYarnValues,label:e.target.value})} label={'Description'} fullWidth></TextField>
                            </Grid>
                            <Grid item lg={2} md={2} sm={12} xs={12} style={{paddingLeft:10}}>
                                <Button variant="contained" color="primary" fullWidth style={{height:'100%'}} onClick={()=>{
                                    if(newYarnValues.code===''){
                                        alert('Add code first!')
                                        return
                                    }
                                    if(newYarnValues.label===''){
                                        alert('Add description first!')
                                        return
                                    }
                                    setYarnCount([...yarnCount,{value:newYarnValues.code,label:newYarnValues.label}])
                                    setNewYarnValues({code:'',label:''})
                                    setAddNewYarn(false)
                                }}>Add</Button>
                            </Grid>
                        </Grid>
                    :null
                }
                <Button variant="contained" color="primary" onClick={()=>setAddNewYarn(!addNewYarn)} fullWidth>{addNewYarn===true?`Cancel`:`add new`}</Button>
            </div>
        </Dialog>
        <Grid container className={classes.outerGrid}>
                <Grid item lg={4} md={4} sm={6} xs={12} className={classes.innerGrid}>
                    <Autocomplete
                        options={options.interalPONumbers}
                        getOptionLabel={option => option}
                        style={{ width: '100%' }}
                        onChange={(e, option) => setState({ ...state, interalPONumber: option })}
                        renderInput={params => (
                            <TextField {...params} label="Interal PO #" variant="outlined" fullWidth />
                        )}
                    />
                </Grid>
                <Grid item lg={2} md={2} sm={6} xs={12} className={classes.innerGrid}>
                    <Button color='primary' variant="contained" fullWidth style={{ height: '100%' }} onClick={handleFetch}>
                        {
                            state.loading === true ?
                                <CircularProgress color="white" size={16} />
                                : 'Fetch'
                        }
                    </Button>
                </Grid>
            </Grid>
            {
                fetched===true?
                <>
        <div style={{display:'flex',justifyContent:'center',alignItems:'flex-end'}}>
            <Button variant="contained" color='primary' onClick={()=>addColumns()}>
                Add Columns
            </Button>
            <Button variant="contained" color='primary' style={{marginLeft:'10px'}} onClick={()=>clearTable()}>Clear Table</Button>
            <span style={{marginLeft:20,cursor:'pointer',textDecoration:'underline',fontWeight:'bold',color:'#418832'}} onClick={()=>{
                setModalOpen(true);
                setAttributeToAdd('placement')
            }}>Placement +</span>
            <span style={{marginLeft:20,cursor:'pointer',textDecoration:'underline',fontWeight:'bold',color:'#418832'}} onClick={()=>{
                setModalOpen(true);
                setAttributeToAdd('process')
            }}>Dye Process +</span>
            <span style={{marginLeft:20,cursor:'pointer',textDecoration:'underline',fontWeight:'bold',color:'#418832'}} onClick={()=>{
                setModalOpen(true);
                setAttributeToAdd('ydColors')
            }}>Yd Colors +</span>
            <span style={{marginLeft:20,cursor:'pointer',textDecoration:'underline',fontWeight:'bold',color:'#418832'}} onClick={()=>{
                setModalOpen2(true);
            }}>View Yarn Count List</span>
            {/* <Button variant="contained" color='primary' style={{marginLeft:'10px'}} onClick={()=>{
                setModalOpen(true);
                setAttributeToAdd('placement')
            }}>Add New Placement</Button> */}
            {/* <Button variant="contained" color='primary' style={{marginLeft:'10px'}} onClick={()=>{
                setModalOpen(true);
                setAttributeToAdd('process')
            }}>Add New Process</Button> */}
        </div>
        <div>
            <YarnTable 
                headers={headers} 
                setHeaders={setHeaders} 
                totalStats={totalStats} 
                setTableValues={setTableValues} 
                values={tableValues}
                updateTableValues={updateTableValues}
                yarnCount={yarnCount}
                processTypes={processTypes}
                setProcessTypes={setProcessTypes}
                ydColors={ydColors}
                setYdColors={setYdColors}
                placementTypes={placementTypes}
                setPlacementTypes={setPlacementTypes}
            />
        </div>
        
        <Grid container style={{marginTop:20}}>
            <Grid item lg={8} md={8} sm={12} xs={12}>
                <SolidColors 
                    colorType={colorType} 
                    setColorType={setColorType}
                    total={totalStats}
                    setTotalStats={setTotalStats}
                    baseSize={'M'}
                    wastageAllowance={wastageAllowance}
                    sizes={[{size:'S',total:300},{size:'M',total:400},{size:'L',total:300}]}
                />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
                <WastageAllowance
                    wastageAllowance={wastageAllowance}
                    setWastageAllowance={setWastageAllowance}
                />
            </Grid>
        </Grid>
        <div>
            <Button variant="contained" color='primary' style={{width:200,margin:'10px'}}>Edit</Button>
        </div>
        </>
        :null}
    </div>)
}

export default YarnInformation