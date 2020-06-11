import React from 'react'
import { TextField, Grid, InputAdornment, Select, Typography, CircularProgress } from '@material-ui/core'
// import Autosuggest from 'react-autosuggest';
// import SearchIcon from '@material-ui/icons/Search'
// import DeleteIcon from '@material-ui/icons/Delete'
import InfoIcon from '@material-ui/icons/Info'
// import EditIcon from '@material-ui/icons/Edit'
// import { Dialog } from '@material-ui/core'
import './index.css'
import uuid from 'uuid/v4'
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import { end_point } from '../../util/config'
// import { withSnackbar } from 'notistack'
import Autocomplete from '../AutoComplete'
const languages = [
    {
      name: 'C',
      year: 1972
    },
    {
      name: 'Elm',
      year: 2012
    },
  ];


// const EditableCell = ({
//     value: initialValue,
//     row: { index },
//     column: { id },
//     updateMyData, // This is a custom function that we supplied to our table instance
//   }) => {
//     // We need to keep and update the state of the cell normally
//     const [value, setValue] = React.useState(initialValue)
  
//     const onChange = e => {
//       setValue(e.target.value)
//     }
  
//     // We'll only update the external data when the input is blurred
//     const onBlur = () => {
//       updateMyData(index, id, value)
//     }
  
//     // If the initialValue is changed external, sync it up with our state
//     React.useEffect(() => {
//       setValue(initialValue)
//     }, [initialValue])
  
//     return <input value={value} onChange={onChange} onBlur={onBlur} />
//   }

const Table = props => {

    
    const [loading,setLoading] = React.useState(false)
    const [wastage,setWastage] = React.useState(0)
    const [bSIndex,setBSIndex] = React.useState(0)
    const [total,setTotal] = React.useState({total:350})
    let sizesWeight = [{size:'XS',weight:0},{size:'S',weight:1},{size:'M',weight:2},{size:'L',weight:3},{size:'XL',weight:4}]

    const calculateTableValues = async () => {

        let arr = []
        let baseSizeIndex = 0
        let wastagePercentage = (parseInt(wastage)+100)/100
        // console.log('wastage ------------------------------------>: ',typeof,wastage,',%age: ',wastagePercentage)
        await Promise.all(props.sizes.map((s,i) => {
            if(s.size===props.baseSize){
                baseSizeIndex = i
            }
        }))

        let wastageAllowanceSum = 0;
        await Promise.all(props.wastageAllowance.map(w => {
            wastageAllowanceSum = wastageAllowanceSum + w.value
        }))

        wastageAllowanceSum = (wastageAllowanceSum+100)/100
        console.log('wastageAllowanceSum: ',wastageAllowanceSum)

        setBSIndex(baseSizeIndex)

        await Promise.all(props.sizes.map((s,i) => {

            let diff = i-baseSizeIndex
            console.log(s.size,', ','Diff: ',diff)

            if(diff===-2){
                arr.push({id:uuid(),size:s.size,cons:parseInt(total.total*0.82),net:s.total,gross:parseInt(s.total*wastageAllowanceSum),netWeight:parseInt(total.total*0.82/1000*s.total*wastageAllowanceSum),grossWeight:parseInt(total.total*0.82/1000*s.total*wastageAllowanceSum*wastagePercentage)})
            }else if(diff===-1){
                arr.push({id:uuid(),size:s.size,cons:parseInt(total.total*0.91),net:s.total,gross:parseInt(s.total*wastageAllowanceSum),netWeight:parseInt(total.total*0.82/1000*s.total*wastageAllowanceSum),grossWeight:parseInt(total.total*0.82/1000*s.total*wastageAllowanceSum*wastagePercentage)})
            }else if(diff===0){
                arr.push({id:uuid(),size:s.size,cons:parseInt(total.total),net:s.total,gross:parseInt(s.total*wastageAllowanceSum),netWeight:parseInt(total.total*0.82/1000*s.total*wastageAllowanceSum),grossWeight:parseInt(total.total*0.82/1000*s.total*wastageAllowanceSum*wastagePercentage)})
            }else if(diff===1){
                arr.push({id:uuid(),size:s.size,cons:parseInt(total.total*1.07),net:s.total,gross:parseInt(s.total*wastageAllowanceSum),netWeight:parseInt(total.total*0.82/1000*s.total*wastageAllowanceSum),grossWeight:parseInt(total.total*0.82/1000*s.total*wastageAllowanceSum*wastagePercentage)})
            }else if(diff===2){
                arr.push({id:uuid(),size:s.size,cons:parseInt(total.total*1.14),net:s.total,gross:parseInt(s.total*wastageAllowanceSum),netWeight:parseInt(total.total*0.82/1000*s.total*wastageAllowanceSum),grossWeight:parseInt(total.total*0.82/1000*s.total*wastageAllowanceSum*wastagePercentage)})
            }else{
                arr.push({id:uuid(),size:'NIL',cons:0,net:s.total,gross:parseInt(s.total*wastageAllowanceSum),netWeight:parseInt(total.total*0.82/1000*s.total*wastageAllowanceSum),grossWeight:0})
            }
            
        }))

        // let totalKgs = 0;
        // await Promise.all(arr.map(a => {
        //     totalKgs = totalKgs + a.grossWeight
        // }))

        // props.setTotalStats({...props.totalStats,kgs:totalKgs})

        console.log('Arr ========> ',arr)
        setTableValues(arr)

    }

    React.useEffect(()=>{
        calculateTableValues()
    },[total,props.sizes,wastage])

    const handleChange = (e,v) => {

    }


    
    // calculateTableValues()
    const [tableValues,setTableValues] = React.useState([])

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center',width:'100%',overflowX: 'scroll' }}>
                {
                    loading === true ?
                        <div style={{ padding: 20, display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress color='primary' />
                        </div>
                        :
                        <div style={{display:'flex',flexDirection:'column',alignItems:'start'}}>
                            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%',marginTop:20}}>
                                <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start'}}>
                                    <Typography variant="subtitle2" color="primary" style={{marginRight:10}}> 
                                        Color Type:
                                    </Typography>
                                    <Select
                                        native
                                        variant="outlined"
                                        value={props.colorType}
                                        // label="Color Type"
                                        onChange={e => {props.setColorType(e.target.value)}}
                                        style={{width:200,height:40}}
                                        >
                                        {/* <option aria-label="None" value="" /> */}
                                        <option value={'Solid Colors'}>Solid Colors</option>
                                        <option value={'Light Colors'}>Light Colors</option>
                                    </Select>
                                </div>
                                <div style={{display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
                                    <Typography variant="subtitle2" color="primary" style={{marginRight:10}}> 
                                        Waste Percentage:
                                    </Typography>
                                    <TextField value={wastage} onChange={e => setWastage(e.target.value)} variant="outlined" color="primary" type="number" style={{width:80}}
                                        inputProps={{
                                            style: {
                                              height:3
                                            },
                                        }}
                                    />
                                </div>
                            </div>
                            {/* <table style={{width:'100%'}}></table> */}
                            <table className="wastage-allowance" style={{width:'100%'}}>
                                <tr>
                                    {/* <th style={{ width: '40px' }}></th> */}
                                    <th>S/W</th>
                                    <th>Cons Yarn (g) </th>
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
                                    <th>Net (Pcs)</th>
                                    <th>Gross (Pcs)</th>
                                    <th>Net (Kgs)</th>
                                    <th>Gross (Kgs)</th>
                                    {/* <th style={{color:'black'}}>%age</th>
                                    <th style={{color:'black'}}>Kgs</th> */}
                                    {/* <th style={{ width: '40px' }}></th> */}
                                </tr>
                                <tbody>
                                {
                                        tableValues.length>0 && tableValues.map((v,i) => (
                                            <tr key={i}>
                                                <td style={{textAlign:'left',fontWeight:'700',fontSize:13,minWidth:150}}>
                                                    {v.size}&nbsp;{bSIndex===i?'(base size)':''}
                                                    {/* <input value={v.size} style={{backgroundColor:'rgba(0, 0, 0, 0)',border:'none',width:70}} /> */}
                                                </td>
                                                <td style={{textAlign:'center'}}>
                                                    {
                                                        bSIndex===i?
                                                        <input type="number" value={total.total} onChange={e => setTotal({...total,total:e.target.value})} style={{textAlign:'center',backgroundColor:'rgba(0, 0, 0, 0)',border:'none',width:70,fontWeight:'bold'}} />
                                                        :v.cons
                                                    }
                                                </td>
                                                <td style={{textAlign:'center'}}>{v.net}</td>
                                                <td style={{textAlign:'center'}}>{v.gross}</td>
                                                <td style={{textAlign:'center'}}>{v.netWeight}</td>
                                                <td style={{textAlign:'center'}}>{v.grossWeight}</td>                                                
                                            </tr>
                                        ))
                                    }
                                    {console.log('props: ',props)}
                                </tbody>
                            </table>
                        </div>
                        
                }
            </div>
        </div>
    )
}

export default Table