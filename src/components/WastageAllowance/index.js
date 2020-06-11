import React from 'react'
import { TextField, Grid, InputAdornment, Button, Typography, CircularProgress } from '@material-ui/core'
// import SearchIcon from '@material-ui/icons/Search'
// import DeleteIcon from '@material-ui/icons/Delete'
import InfoIcon from '@material-ui/icons/Info'
// import EditIcon from '@material-ui/icons/Edit'
// import { Dialog } from '@material-ui/core'
import './index.css'
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import { end_point } from '../../util/config'
// import { withSnackbar } from 'notistack'
const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData, // This is a custom function that we supplied to our table instance
  }) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue)
  
    const onChange = e => {
      setValue(e.target.value)
    }
  
    // We'll only update the external data when the input is blurred
    const onBlur = () => {
      updateMyData(index, id, value)
    }
  
    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
      setValue(initialValue)
    }, [initialValue])
  
    return <input value={value} onChange={onChange} onBlur={onBlur} />
  }

const Table = props => {

    const [searchText, setSearchText] = React.useState('')
    // const [designations,setDesignations] = React.useState([])
    const [total,setTotal] = React.useState(0)

    React.useEffect(()=>{
        
        let sum = 0;
        props.wastageAllowance.map(w => {
            sum = sum+w.value
        })

        setTotal(sum)

    },[props.wastageAllowance])

    const [loading,setLoading] = React.useState(false)


    const handleChange = async (e,v) => {
        // console.log(attribute,e.target.value,obj)
        // let tempArr = props.columns
        let newArr = await Promise.all(props.wastageAllowance.map(wA => {
            if(wA.id===v.id){
                return ({...wA,value:parseInt(e.target.value)})
            }else{
                return wA
            }
        }))
        
        props.setWastageAllowance(newArr)
    }

    // React.useEffect(()=>{
        
    //     setLoading(true)
        
    //     try{
    //         let url = end_point+`api/get-all-users`;
    //         console.log('url',url)
    //         fetch(url,{
    //             method: 'get',
    //         })
    //         .then(res => res.json())
    //         .then(res => {
    //             console.log('res: ',res.users.records)
    //             // setSizes(res.Sizes)
    //             setTableValues(res.users.records)
    //             setLoading(false)
    //         })
    //         .catch(err => {
    //             console.log('error while fetching',err)
    //             setLoading(false)
    //             props.enqueueSnackbar('Error While Getting Users!', { 
    //                 variant: 'info',
    //             })
    //         })
    //     }catch(err){
    //         console.log('err in try catch',err)
    //         setLoading(false)
    //         props.enqueueSnackbar('Error While Fetching Users!', { 
    //             variant: 'info',
    //         })
    //     }
    // },[])

    return (
        <div>
            
            {/* <Dialog
                open={modalVisible}
            >
                <div style={{ padding: 20, width: 480 }}>
                    {
                        modalVisible ?
                            <>
                                <div style={{ textAlign: 'center', marginBottom: 15 }}><Typography variant="h6"> Styles</Typography></div>
                                {
                                    loading === true?
                                    <div style={{padding:20,justifyContent:'center',display:'flex'}}>
                                        <CircularProgress color='primary'/>
                                    </div>
                                    :
                                    <div container style={{textAlign:'center'}}>
                                        {
                                            sizes && sizes.map(s => (<p>Size: {s.size_code}, Quantity: {s.quantity}</p>))
                                        }
                                    </div>
                                }
                                <Grid container style={{display:'flex',justifyContent:'center'}}>
                                    <Grid item lg={6} md={6} sm={6} xs={6} style={{ padding: 5 }}>
                                        <Button color='primary' variant='contained' style={{ color: '#fff', height: '50px' }} fullWidth onClick={() => setModalVisible(false)}>Okay</Button>
                                    </Grid>
                                </Grid>
                            </>
                            : null
                    }
                </div>
            </Dialog> */}
            <div style={{ display: 'flex', justifyContent: 'center',width:'100%',overflowX: 'scroll' }}>
                {
                    loading === true ?
                        <div style={{ padding: 20, display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress color='primary' />
                        </div>
                        :
                        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                            <Typography variant="h6" color='primary'>
                                Wastage Allowance
                            </Typography>
                            <table style={{width:'100%',backgroundColor:'#418832'}}>
                                <tr>
                                    {/* <th style={{ width: '40px' }}></th> */}
                                    <th className="green">Criteria</th>
                                    <th className="green">Wastage </th>
                                    {/* {
                                        props.columns
                                    } */}
                                    {/* {
                                        props.columns.map(()=>(
                                        <>
                                            <th>Body</th>
                                            <th>Placement</th>
                                            <th>Dye Process</th>
                                        </>))
                                    } */}
                                    {/* <th>PN1</th>
                                    <th>Placement</th>
                                    <th>Dye Process</th> */}
                                    {/* <th>PN2</th>
                                    <th>Placement</th>
                                    <th>Dye Process</th> */}
                                    {/* <th>Net (Pcs)</th>
                                    <th>Gross (Pcs)</th>
                                    <th>Net (Kgs)</th>
                                    <th>Gross (Kgs)</th> */}
                                    {/* <th style={{color:'black'}}>%age</th>
                                    <th style={{color:'black'}}>Kgs</th> */}
                                    {/* <th style={{ width: '40px' }}></th> */}
                                </tr>
                                <tbody>
                                    {
                                        props.wastageAllowance.length>0 && props.wastageAllowance.map((v,i) => (
                                            <tr key={i}>
                                                <td className="green" style={{textAlign:'left',fontWeight:'400',fontSize:13,minWidth:150}}>{v.label}</td>
                                                <td className="green" style={{textAlign:'center'}}><input value={v.value} type="number" onChange={e => handleChange(e,v)} style={{color:'#fff',backgroundColor:'rgba(0, 0, 0, 0)',border:'none',width:70}} /></td>
                                            </tr>
                                        ))
                                    }
                                    <tr>
                                        <td>
                                            <span style={{fontWeight:'500'}}>{`Total`}</span>
                                        </td>
                                        <td>
                                            <span style={{fontWeight:'500',textAlign:'center'}}>{total}</span>
                                        </td>
                                    </tr>
                                    
                                </tbody>
                            </table>
                        </div>
                        
                }
            </div>
        </div>
    )
}

export default Table