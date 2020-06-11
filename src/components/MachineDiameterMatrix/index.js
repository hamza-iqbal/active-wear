import React from 'react'
import { Typography, Select } from '@material-ui/core'

const MachineDiameterMatrix = props => {


    const handleChange = async (e,obj,attr) => {

        let newValues = await Promise.all(props.machineMatrixData.map(row => {
            if(row.id===obj.id){
                row = {...row,[attr]:e.target.value}
                if(attr==='forSampling'||attr==='availableMachine'){
                    row.forProduction = parseInt(row.availableMachine)-parseInt(row.forSampling)
                }
                return row
            }else{
                return row
            }
        }))
        props.setMachineMatrixData(newValues)

    }

    return(
        <div style={{width:'70%',textAlign:'center',marginTop:20}}>
            <Typography variant="h6" color="primary">
                Machine Diameter Matrix
            </Typography>
            <table style={{width:'100%'}}>
                <thead>
                    <tr>
                        <th>Dia</th>
                        <th>Available Machine</th>
                        <th>For Production</th>
                        <th>For Sampling</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.machineMatrixData.map(d => (
                            <tr>
                                <td style={{textAlign:'center'}}>
                                    <Select native value={d.dia} onChange={e=>handleChange(e,d,'dia')}>
                                        {
                                            props.dias.map(d => (<option value={d}>{d}</option>))
                                        }
                                    </Select>
                                    {/* <input value={d.dia} onChange={e=>handleChange(e,d,'dia')} style={{backgroundColor:'rgba(0, 0, 0, 0)',textAlign:'center',fontWeight:'bold',border:'none',width:60}} /> */}
                                </td>
                                <td style={{textAlign:'center'}}>
                                    <input value={d.availableMachine} onChange={e=>handleChange(e,d,'availableMachine')} style={{backgroundColor:'rgba(0, 0, 0, 0)',textAlign:'center',fontWeight:'bold',border:'none',width:60}} />
                                </td>
                                <td style={{textAlign:'center'}}>
                                    {d.forProduction}
                                </td>
                                <td style={{textAlign:'center'}}>
                                    <input value={d.forSampling} onChange={e=>handleChange(e,d,'forSampling')} style={{backgroundColor:'rgba(0, 0, 0, 0)',textAlign:'center',fontWeight:'bold',border:'none',width:60}} />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )

}

export default MachineDiameterMatrix