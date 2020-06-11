import React from 'react'
import AddYarnInformation from '../../components/YarnInformation'
import ViewYarn from '../../components/YarnInformation/ViewYarnInfo'
import { Typography,FormControl,RadioGroup,Radio,FormControlLabel } from '@material-ui/core'

const Index = props => {

    const [mode, setMode] = React.useState('add')

    return(<div style={{ marginBottom: 20, textAlign: 'center', marginTop: 20,position:'relative' }}>
        <div style={{paddingBottom:35}}>
            <Typography variant="h6">
                Yarn Information
            </Typography>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center',marginBottom:15, alignItems: 'center',position:'absolute',right:10,top:-20 }}>
            <FormControl component="fieldset">
                <RadioGroup aria-label="gender" name="gender1" value={mode} onChange={event => setMode(event.target.value)}>
                    <FormControlLabel labelPlacement="start" value="add" color="primary" control={<Radio />} label="Add New Yarn" />
                    <FormControlLabel labelPlacement="start" value="view" color="primary" control={<Radio />} label="View Existing Yarn" />
                </RadioGroup>
            </FormControl>
        </div>
        {
            mode==='add'?
            <AddYarnInformation/>
            :<ViewYarn/>
        }
    </div>
    )
}

export default Index