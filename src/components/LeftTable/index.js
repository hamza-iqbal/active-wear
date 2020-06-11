import React from 'react'
import { Select } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

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
const LeftTable = props => {

    const classes = useStyles()

    const handleChange = async (e,obj) => {
        let temp = await Promise.all(props.sizes.map(s => {
            if(s.id===obj.id){
                s.ratioValue = e.target.value
                return s
            }else{
                return s
            }
        }))
        props.setSizes(temp)
    }

    return(<div style={{margin:20,textAlign:'center'}}>
    <table style={{width:'100%'}}>
        <thead>
            <tr>
                <th>Detail</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Color <span className={classes.headerPlus} onClick={()=>{
                    props.setAttributeToAdd('colors')
                    props.setModalOpen(true)
                }}>+</span></td>
                <td>
                <Select native value={props.state.color} style={{width:'100%'}} onChange={(e)=>handleChange(e,'color')}>
                    {props.options.colors.map(op => <option value={op}>{op}</option>)}
                </Select>
                </td>
            </tr>
            <tr>
                <td>Combos <span className={classes.headerPlus} onClick={()=>{
                    props.setAttributeToAdd('combos')
                    props.setModalOpen(true)
                }}>+</span></td>
                <td>
                <Select native value={props.state.combos} style={{width:'100%'}} onChange={(e)=>handleChange(e,'combo')}>
                    {props.options.combos.map(op => <option value={op}>{op}</option>)}
                </Select>
                </td>
            </tr>
            <tr>
                <td>Sizes <span className={classes.headerPlus} onClick={()=>{
                    props.setAttributeToAdd('sizes')
                    props.setModalOpen(true)
                }}>+</span></td>
                <td>
                <Select native value={props.state.sizes} style={{width:'100%'}} onChange={(e)=>handleChange(e,'size')}>
                    {props.options.sizes.map(op => <option value={op}>{op}</option>)}
                </Select>
                </td>
            </tr>
            <tr>
                <td>Ratio</td>
                <td style={{padding:0}}>
                    <table style={{width:'100%',margin:0}}>
                        {
                            props.sizes.map(s => (
                                <tr>
                                    <td>{s.size}</td>
                                    <td style={{textAlign:'center'}}>
                                        <input value={s.ratioValue} type="number" onChange={(e)=>handleChange(e,s)} style={{backgroundColor:'rgba(0, 0, 0, 0)',fontSize:14,border:'none',textAlign:'center',width:60}} />
                                    </td>
                                </tr>
                            ))
                        }
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</div>)
}


export default LeftTable