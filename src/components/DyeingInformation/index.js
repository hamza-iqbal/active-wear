import React from 'react'
import { Typography, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import ColorInforamtion from '../ColorInformation'
import TapeDyeingPlan from '../TapeDyeingPlan'
import uuid from 'uuid/v4'
// import AddIcon from '@material-ui/icons/AddBox'


const useStyles = makeStyles(theme => ({
    title:{
        marginBottom:15
    },
    tableFunction:{
        cursor:'pointer',
        color:'black',
        fontWeight:'bold',
        backgroundColor:'lightgrey',
        borderRadius:5,
        overflow:'hidden',
        padding:'2px 6px'
    }
    // addIcon:{
    //     cursor:'pointer',
    //     marginBottom:-7,
    //     color:'#4B8D3A',
    //     // fontSize:10
    // }
}))

const DyeingInformation = props => {

    const classes = useStyles()

    const [shrinkageMargin,setShrinkageMargin] = React.useState(15)
    const [tropicalFinish,setTropicalFinish] = React.useState({
        purpose:'Hand Feel',
        application:'Silicon',
        standard:'Follo Approved Content'
    })

    let [tapeDyeingOptions,setTapeDyeingOptions] = React.useState({
        mainColors:['Black','Blue'],
        tapeColors:['Black','Blue','Red'],
        tapeTypes:['9MM','10MM']
    })

    let [tapeDyeingValues,setTapeDyeingValues] = React.useState({
        rows:[
            {
                id:uuid(),
                mainColors:'Black',
                grossPcs:1500,
                tapeColor:'Black',
                tapeType:'16MM',
                finishConsCm:0,
                finishConsM:0,
                finishConsKGPM:0,
                finishTtlM:0,
                finishTtlKgs:0,
                rawConsCm:0,
                rawConsM:0,
                rawConsKGPM:0,
                rawTtlM:0,
                rawTtlKgs:0
            }
        ]
    })

    const addNewRow = () => {
        setTapeDyeingValues({rows:[...tapeDyeingValues.rows,{
            id:uuid(),
            mainColors:'Black',
            grossPcs:1500,
            tapeColor:'Black',
            tapeType:'16MM',
            finishConsCm:0,
            finishConsM:0,
            finishConsKGPM:0,
            finishTtlM:0,
            finishTtlKgs:0,
            rawConsCm:0,
            rawConsM:0,
            rawConsKGPM:0,
            rawTtlM:0,
            rawTtlKgs:0
        }]})
    }
    const clearTable = () => {
        setTapeDyeingValues({rows:[]})
    }

    const recalculate = async (tapeDyeingValues) => {

        console.log('here',tapeDyeingValues)
        let newValues = await Promise.all(tapeDyeingValues.map(r => {
            r.finishConsM = parseFloat(r.finishConsCm)/100
            r.rawConsM = parseFloat(r.rawConsCm)/100
            r.rawConsCm = parseFloat(r.finishConsCm*((100+shrinkageMargin)/100)).toFixed(2)
            r.finishTtlM = parseFloat(r.grossPcs*r.finishConsM).toFixed(2)
            r.rawTtlM = parseFloat(r.grossPcs*r.rawConsM).toFixed(2)
            r.finishTtlKgs = ((parseFloat(r.finishConsKGPM)/1000)*parseFloat(r.grossPcs)).toFixed(2)
            r.rawTtlKgs = ((parseFloat(r.rawConsKGPM)/1000)*parseFloat(r.grossPcs)).toFixed(2)
            return r
        }))
        console.log('here',newValues)

        setTapeDyeingValues({rows:newValues})

    }

    const handleChange = (e,attr) => {
        setTropicalFinish({...tropicalFinish,[attr]:e.target.value})
    }


    return(<div>
        <div style={{margin:20,textAlign:'center'}}>
            <Typography variant="h6" className={classes.title}>
                Dyeing Information
            </Typography>
            <ColorInforamtion />
            <Typography variant="subtitle1" color="primary" className={classes.title} style={{textAlign:'left',marginTop:20,fontWeight:'bold'}}>
                Tropical Finish
            </Typography>
            <div style={{display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
                <table style={{width:'80%',margin:0}}>
                    <thead>
                        <tr>
                            <th>Purpose</th>
                            <th>Application</th>
                            <th>Standard</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input value={tropicalFinish.purpose} onChange={e=>handleChange(e,'purpose')} style={{backgroundColor:'rgba(0, 0, 0, 0)',border:'none',width:'100%',textAlign:'center'}} /></td>
                            <td><input value={tropicalFinish.application} onChange={e=>handleChange(e,'application')} style={{backgroundColor:'rgba(0, 0, 0, 0)',border:'none',width:'100%',textAlign:'center'}} /></td>
                            <td><input value={tropicalFinish.standard} onChange={e=>handleChange(e,'standard')} style={{backgroundColor:'rgba(0, 0, 0, 0)',border:'none',width:'100%',textAlign:'center'}} /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',marginTop:20}}>
                <Typography variant="subtitle1" color="primary" className={classes.title} style={{textAlign:'left',marginTop:20,fontWeight:'bold'}}>
                    Tape Dyeing Plan &nbsp; <span className={classes.tableFunction} onClick={addNewRow}>Row +</span>&nbsp; <span className={classes.tableFunction} onClick={clearTable}>Clear</span>
                </Typography>
                <div style={{marginTop:25}}>
                    <TextField 
                        variant="outlined" 
                        label="Shrinkage Margin" 
                        value={shrinkageMargin} 
                        type="number" 
                        style={{height:30}}
                        onChange={e => {
                            setShrinkageMargin(e.target.value)
                            recalculate(tapeDyeingValues)
                        }}
                        inputProps={{
                            style: {
                              height:0
                            }
                        }}
                    />
                </div>
            </div>
            <TapeDyeingPlan 
                tapeDyeingValues={tapeDyeingValues}
                setTapeDyeingValues={setTapeDyeingValues}
                recalculate={recalculate}
                tapeDyeingOptions={tapeDyeingOptions}
                setTapeDyeingOptions={setTapeDyeingOptions}
            />
        </div>
    </div>)
}


export default DyeingInformation