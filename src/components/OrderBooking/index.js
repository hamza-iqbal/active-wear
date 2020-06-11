import React from 'react'
import { Typography, TextField, Grid, Button, Dialog, CircularProgress } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { useSnackbar } from 'notistack'
import { makeStyles } from '@material-ui/styles'
// import CloseIcon from '@material-ui/icons/Close'
import { end_point } from '../../util/config'
import Table from '../Table'
import uuid from 'uuid/v4'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles(theme => ({
    innerGrid: {
        padding: 5,
        display: 'flex',
        justifyContent: 'center'
    },
    outerGrid: {
        padding: 10,
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
        padding: 5
    }
}))


// const options = [];

const OrderBooking = props => {

    const classes = useStyles()

    const [state, setState] = React.useState({})
    const [modalOpen, setModalOpen] = React.useState(false)
    const [modalValue, setModalValue] = React.useState('')
    const [attributeToAdd, setAttributeToAdd] = React.useState('')

    const { enqueueSnackbar } = useSnackbar()

    const notify = (message) => {
        enqueueSnackbar(message, { variant:'info',anchorOrigin:{ horizontal: 'right', vertical: 'top' } })
    }

    const handleModalClose = () => {
        setModalOpen(false)
        setModalValue('')
    }

    const getLabel = () => {
        if (attributeToAdd === 'ilRefs') {
            return 'IL Refs'
        } else if (attributeToAdd === 'wimetrixID') {
            return 'Wimetrix ID'
        } else if (attributeToAdd === 'customerPOs') {
            return 'Customer PO Number'
        } else if (attributeToAdd === 'interalPONumbers') {
            return 'Internal PO Number'
        } else if (attributeToAdd === 'customerNames') {
            return 'Customer Name'
        } else if (attributeToAdd === 'brands') {
            return 'Brand'
        } else if (attributeToAdd === 'seasons') {
            return 'Season'
        } else if (attributeToAdd === 'styleNumbers') {
            return 'Style Number'
        } else if (attributeToAdd === 'styleNames') {
            return 'Style Name'
        } else if (attributeToAdd === 'packingType') {
            return 'Packing Type'
        } else if (attributeToAdd === 'gmtDesps') {
            return 'GMT Desp'
        } else if (attributeToAdd === 'garmentTypes') {
            return 'Garment Type'
        } else if (attributeToAdd === 'compostions') {
            return 'Composition'
        } else if (attributeToAdd === 'gsms') {
            return 'GSM'
        } else if (attributeToAdd === 'poRemarks') {
            return 'PO Remarks'
        }

        //gmtDesps:['SHORT SLEEVE'],
        // garmentTypes:['Man'],
        // compostions:['85%,NYLON'],
        // gsms:['230'],
        // poRemarks:['DTM Gussets'],
    }

    const addNewValue = () => {
        // console.log('attributeToAdd: ',attributeToAdd)
        setOptions({ ...options, [attributeToAdd]: [...options[attributeToAdd], modalValue] })
        handleModalClose()
    }

    const formatData = async (array) => {
        let options = {
            brands: [],
            customers: [],
            customerPOs: [],
            gsms: [],
            garmentTypes: [],
            poRemarks: [],
            ilRefs: [],
            interalPONumbers: [],
            seasons: [],
            gmtDesps: [],
            styleNames: [],
            styleNumbers: [],
            packingType: [],
            compostions: [],
        }
        await Promise.all(array.map(a => {
            options.brands.push(a.BrandName)
            options.customers.push(a.CustomerName)
            options.customerPOs.push(a.CustomerPO)
            options.gsms.push(a.GSM)
            options.garmentTypes.push(a.GarmentType)
            options.poRemarks.push(a.PORemarks)
            options.ilRefs.push(a.ILReferenceNO)
            options.interalPONumbers.push(a.InternalPO)
            options.seasons.push(a.Season)
            options.gmtDesps.push(a.GarmentDescription)
            options.styleNames.push({ name: a.StyleName, id: a.StyleID })
            options.styleNumbers.push(a.StyleNumber)
            options.packingType.push(a.PackagingType)
            // options.compostions.push(a.Composition)
        }))
        console.log(options)
        setOptions(options)
    }

    const handleSubmit = () => {
        setState({ ...state, loading: true })
        console.log('state: ', state)
        let jsonObject = {
            "OrderBookings": [
                {
                    // "ILReferenceNO": uuid(),
                    // "CustomerPO": uuid(),
                    // "InternalPO": uuid(),
                    // "CustomerName": uuid(),
                    // "BrandName": uuid(),
                    // "Season": uuid(),
                    // "StyleNumber": uuid(),
                    // "StyleName": uuid(),
                    // "PackagingType": uuid(),
                    // "GarmentDescription": uuid(),
                    // "GarmentType": uuid(),
                    // "GSM": 0.9,
                    // "PORemarks": uuid()
                    ILReferenceNO: state.ilRef,
                    CustomerPO: state.customerPO,
                    InternalPO: state.interalPONumber,
                    CustomerName: state.customerName,
                    BrandName: state.brand,
                    Season: state.season,
                    StyleNumber: state.styleNumber,
                    StyleName: state.styleName,
                    PackagingType: state.packingType,
                    GarmentDescription: state.gmtDesp,
                    GarmentType: state.garmentType,
                    GSM: state.gsm,
                    PORemarks:state.poRemarks
                }
            ]
        }
        let url = end_point + 'api/orderbookings/insert/orderbookings'
        let jsonObj = JSON.stringify(jsonObject)
        console.log(url)
        try {
            fetch(url, {
                method: 'post',
                headers:{
                    'Content-Type':'application/json',
                    //'Cache-Control':'no-cache',
                    //'Accept':'*/*',
                    //'Accept-Encoding':'gzip, deflate, br',
                    //'Connection':'keep-alive'
                },
                body: jsonObj
            }).then(resp => {
                console.log(resp)
                if(resp.status===200){
                    notify('Successfully Added Order Booking!')
                }else{
                    notify('Something went wrong!')
                }
                return resp.json()
            }).then(response => {
                console.log(`response ------------> `, response)
                // if (response.OrderBookings) {
                //     formatData(response.OrderBookings)
                // }
                // notify('Successfully Added Order Booking!')
                setState({ ...state, loading: false })
            }).catch(err => {
                console.log('err', err)
                setState({ ...state, loading: false })
                notify('Failed to save Order Booking!')
            })
        } catch (error) {
            console.log(`error ------------> `, error)
            setState({ ...state, loading: false })
            notify('Failed to save Order Booking!')
        }
    }

    const insertCompositions = () => {
        let jsonObj = {
            CompositionDetails:[
                {
                    CompositionID:"1",
                    CreatedAt:"2020-06-01 10:03:14.160",
                    UpdatedAt:"2020-06-01 10:03:14.160",
                    OrderBookingID:"5",
                    MaterialTypeID:"10",
                    MaterialRatio:".20"
                },
            ]
        }
    }

    React.useEffect(() => {
        setState({ ...state, loading: true })
        try {
            fetch(end_point + 'api/orderbookings/fetch/orderbookings/all', {
                method: 'get',
                 headers:{
                     'Content-Type':'application/json',
                    // 'Cache-Control':'no-cache',
                    // 'Accept':'*/*',
                    // 'Accept-Encoding':'gzip, deflate, br',
                    // 'Connection':'keep-alive'
                }
            }).then(response => response.json()).then(async response => {
                console.log(`response ------------> `, response)
                if (response.OrderBookings) {
                    formatData(response.OrderBookings)
                }
                setState({ ...state, loading: false })
            }).catch(err => {
                console.log('err', err)
                setState({ ...state, loading: false })
                //   Toast.show({
                //     text: 'Something went wrong2!',
                //     type: "danger"
                //   })
            })
        } catch (error) {
            console.log(`error ------------> `, error)
            setState({ ...state, loading: false })
            // Toast.show({
            //   text: 'Something went wrong3!',
            //   type: "danger"
            // })
        }
    }, [])

    const [options, setOptions] = React.useState({
        brands: [],
        customers: [],
        customerPOs: [],
        gsms: [],
        garmentTypes: [],
        poRemarks: [],
        ilRefs: [],
        interalPONumbers: [],
        seasons: [],
        gmtDesps: [],
        styleNames: [],
        styleNumbers: [],
        packingType: [],
        compostions: [],
    })


    return (<>
        
        <Dialog open={modalOpen} onClose={handleModalClose}>
            <div style={{ width: 350, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 20, position: 'relative' }}>
                {/* <CloseIcon size={20} style={{color:'lightgrey',position:'absolute',right:15,top:15,cursor:'pointer'}} onClick={handleModalClose}/> */}
                <Typography variant="h6" color='primary' style={{ marginBottom: 20 }}>
                    Add New {getLabel()}:
                </Typography>
                <TextField value={modalValue} onChange={e => setModalValue(e.target.value)} variant="outlined" fullWidth />
                <Button variant="contained" style={{ height: 45, marginTop: 20 }} fullWidth color="primary" onClick={addNewValue}>Add</Button>
                <Button variant="contained" style={{ height: 45, marginTop: 10 }} fullWidth color="secondary" onClick={handleModalClose}>Cancel</Button>
            </div>
        </Dialog>
        <div>
            <Grid container className={classes.outerGrid}>
                {/* <Grid item lg={4} md={4} sm={6} xs={12} className={classes.innerGrid}>
                    <Autocomplete
                        options={options.wimetrixID}
                        getOptionLabel={option => option}
                        style={{ width: '90%' }}
                        onChange={(e,option) => setState({...state,wimetrixID:option})}
                        renderInput={params => (
                            <TextField {...params} label="Wimetrix ID" variant="outlined" fullWidth />
                        )}
                    />
                    <div className={classes.plusContainer} onClick={()=>{
                        setModalOpen(true);
                        setAttributeToAdd('wimetrixID')
                    }}>
                        +
                    </div>
                </Grid> */}
                <Grid item lg={4} md={4} sm={6} xs={12} className={classes.innerGrid}>
                    <Autocomplete
                        options={options.ilRefs}
                        getOptionLabel={option => option}
                        style={{ width: '90%' }}
                        onChange={(e, option) => setState({ ...state, ilRef: option })}
                        renderInput={params => (
                            <TextField {...params} label="IL/REF #" variant="outlined" fullWidth />
                        )}
                    />
                    <div className={classes.plusContainer} onClick={() => {
                        setModalOpen(true);
                        setAttributeToAdd('ilRefs')
                    }}>
                        +
                    </div>
                </Grid>
                <Grid item lg={4} md={4} sm={6} xs={12} className={classes.innerGrid}>
                    <Autocomplete
                        options={options.customerPOs}
                        getOptionLabel={option => option}
                        style={{ width: '90%' }}
                        onChange={(e, option) => setState({ ...state, customerPO: option })}
                        renderInput={params => (
                            <TextField {...params} label="Customer PO" variant="outlined" fullWidth />
                        )}
                    />
                    <div className={classes.plusContainer} onClick={() => {
                        setModalOpen(true);
                        setAttributeToAdd('customerPOs')
                    }}>
                        +
                    </div>
                </Grid>
                <Grid item lg={4} md={4} sm={6} xs={12} className={classes.innerGrid}>
                    <Autocomplete
                        options={options.interalPONumbers}
                        getOptionLabel={option => option}
                        style={{ width: '90%' }}
                        onChange={(e, option) => setState({ ...state, interalPONumber: option })}
                        renderInput={params => (
                            <TextField {...params} label="Interal PO #" variant="outlined" fullWidth />
                        )}
                    />
                    <div className={classes.plusContainer} onClick={() => {
                        setModalOpen(true);
                        setAttributeToAdd('interalPONumbers')
                    }}>
                        +
                    </div>
                </Grid>
                <Grid item lg={4} md={4} sm={6} xs={12} className={classes.innerGrid}>
                    <Autocomplete
                        options={options.customers}
                        getOptionLabel={option => option}
                        style={{ width: '90%' }}
                        onChange={(e, option) => { if (option) { setState({ ...state, customerName: option }) } }}
                        renderInput={params => (
                            <TextField {...params} label="Customer Name" variant="outlined" fullWidth />
                        )}
                    />
                    <div className={classes.plusContainer} onClick={() => {
                        setModalOpen(true);
                        setAttributeToAdd('customerNames')
                    }}>
                        +
                    </div>
                </Grid>
                <Grid item lg={4} md={4} sm={6} xs={12} className={classes.innerGrid}>
                    <Autocomplete
                        options={options.brands}
                        getOptionLabel={option => option}
                        style={{ width: '90%' }}
                        onChange={(e, option) => setState({ ...state, brand: option })}
                        renderInput={params => (
                            <TextField {...params} label="Brand" variant="outlined" fullWidth />
                        )}
                    />
                    <div className={classes.plusContainer} onClick={() => {
                        setModalOpen(true);
                        setAttributeToAdd('brands')
                    }}>
                        +
                    </div>
                </Grid>
                <Grid item lg={4} md={4} sm={6} xs={12} className={classes.innerGrid}>
                    <Autocomplete
                        options={options.seasons}
                        getOptionLabel={option => option}
                        style={{ width: '90%' }}
                        onChange={(e, option) => setState({ ...state, season: option })}
                        renderInput={params => (
                            <TextField {...params} label="Select Season" variant="outlined" fullWidth />
                        )}
                    />
                    <div className={classes.plusContainer} onClick={() => {
                        setModalOpen(true);
                        setAttributeToAdd('seasons')
                    }}>
                        +
                    </div>
                </Grid>
                <Grid item lg={4} md={4} sm={6} xs={12} className={classes.innerGrid}>
                    <Autocomplete
                        options={options.styleNumbers}
                        getOptionLabel={option => option}
                        style={{ width: '90%' }}
                        onChange={(e, option) => setState({ ...state, styleNumber: option })}
                        renderInput={params => (
                            <TextField {...params} label="Style Number" variant="outlined" fullWidth />
                        )}
                    />
                    <div className={classes.plusContainer} onClick={() => {
                        setModalOpen(true);
                        setAttributeToAdd('styleNumbers')
                    }}>
                        +
                    </div>
                </Grid>
                <Grid item lg={4} md={4} sm={6} xs={12} className={classes.innerGrid}>
                    <Autocomplete
                        options={options.styleNames}
                        getOptionLabel={option => option.name}
                        style={{ width: '90%' }}
                        onChange={(e, option) => { if (options) { setState({ ...state, styleName: option.name }) } }}
                        renderInput={params => (
                            <TextField {...params} label="Style Name" variant="outlined" fullWidth />
                        )}
                    />
                    <div className={classes.plusContainer} onClick={() => {
                        setModalOpen(true);
                        setAttributeToAdd('styleNames')
                    }}>
                        +
                    </div>
                </Grid>
                <Grid item lg={4} md={4} sm={6} xs={12} className={classes.innerGrid}>
                    <Autocomplete
                        options={options.packingType}
                        getOptionLabel={option => option}
                        style={{ width: '90%' }}
                        onChange={(e, option) => setState({ ...state, packingType: option })}
                        renderInput={params => (
                            <TextField {...params} label="Packaging Type" variant="outlined" fullWidth />
                        )}
                    />
                    <div className={classes.plusContainer} onClick={() => {
                        setModalOpen(true);
                        setAttributeToAdd('packingType')
                    }}>
                        +
                    </div>
                </Grid>
                <Grid item lg={4} md={4} sm={6} xs={12} className={classes.innerGrid}>
                    <Autocomplete
                        options={options.gmtDesps}
                        getOptionLabel={option => option}
                        style={{ width: '90%' }}
                        onChange={(e, option) => setState({ ...state, gmtDesp: option })}
                        renderInput={params => (
                            <TextField {...params} label="GMT DESP" variant="outlined" fullWidth />
                        )}
                    />
                    <div className={classes.plusContainer} onClick={() => {
                        setModalOpen(true);
                        setAttributeToAdd('gmtDesps')
                    }}>
                        +
                    </div>
                </Grid>
                <Grid item lg={4} md={4} sm={6} xs={12} className={classes.innerGrid}>
                    <Autocomplete
                        options={options.garmentTypes}
                        getOptionLabel={option => option}
                        style={{ width: '90%' }}
                        onChange={(e, option) => setState({ ...state, garmentType: option })}
                        renderInput={params => (
                            <TextField {...params} label="Garment Type" variant="outlined" fullWidth />
                        )}
                    />
                    <div className={classes.plusContainer} onClick={() => {
                        setModalOpen(true);
                        setAttributeToAdd('garmentTypes')
                    }}>
                        +
                    </div>
                </Grid>
                <Grid item lg={4} md={4} sm={6} xs={12} className={classes.innerGrid}>
                    <Autocomplete
                        options={options.compostions}
                        getOptionLabel={option => option}
                        style={{ width: '90%' }}
                        onChange={(e, option) => setState({ ...state, composition: option })}
                        renderInput={params => (
                            <TextField {...params} label="Composition" variant="outlined" fullWidth />
                        )}
                    />
                    <div className={classes.plusContainer} onClick={() => {
                        setModalOpen(true);
                        setAttributeToAdd('compostions')
                    }}>
                        +
                    </div>
                </Grid>
                <Grid item lg={4} md={4} sm={6} xs={12} className={classes.innerGrid}>
                    <Autocomplete
                        options={options.gsms}
                        getOptionLabel={option => option}
                        style={{ width: '90%' }}
                        onChange={(e, option) => setState({ ...state, gsm: option })}
                        renderInput={params => (
                            <TextField {...params} label="GSM" variant="outlined" fullWidth />
                        )}
                    />
                    <div className={classes.plusContainer} onClick={() => {
                        setModalOpen(true);
                        setAttributeToAdd('gsms')
                    }}>
                        +
                    </div>
                </Grid>
                <Grid item lg={4} md={4} sm={6} xs={12} className={classes.innerGrid}>
                    <Autocomplete
                        options={options.poRemarks}
                        getOptionLabel={option => option}
                        style={{ width: '90%' }}
                        onChange={(e, option) => setState({ ...state, poRemarks: option })}
                        renderInput={params => (
                            <TextField {...params} label="PO Remarks" variant="outlined" fullWidth />
                        )}
                    />
                    <div className={classes.plusContainer} onClick={() => {
                        setModalOpen(true);
                        setAttributeToAdd('poRemarks')
                    }}>
                        +
                    </div>
                </Grid>
            </Grid>
            <Grid container className={classes.outerGrid}>
                <Grid item lg={12} md={12} sm={12} xs={12} className={classes.innerGridBelow} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: 30 }}>
                    <Typography variant="h6" color='primary'>
                        Size/Color wise Breakdown
                    </Typography>
                    <Table />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12} className={classes.innerGridBelow} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
                    {/* <Button color='primary' variant="contained">Add Photo</Button> */}
                    <input type='file' />
                    <div style={{ marginTop: 30 }}><img src={require('../../assets/images/Ghost_Mannequin_5_after.jpg')} alt='gfhg' style={{ width: 300 }} /></div>
                </Grid>

            </Grid>
        </div>
        <div style={{ marginBottom: 20, textAlign: 'center' }}>
            <Button color='primary' variant="contained" style={{ width: 200, height: 45 }} onClick={handleSubmit}>
                {
                    state.loading === true ?
                        <CircularProgress color="white" size={16} />
                        : 'Submit'
                }
            </Button>
        </div>
    </>)
}

export default OrderBooking