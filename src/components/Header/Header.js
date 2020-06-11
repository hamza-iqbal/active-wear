import React from 'react'
import { MdFullscreen,MdFullscreenExit } from 'react-icons/md'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { CircularProgress } from '@material-ui/core';
import { withRouter } from 'react-router-dom'

const drawerWidth = 240;


const useStyles = makeStyles(theme => ({
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      backgroundColor:'#212121',
      color:'#fff',
      display:'flex',
      justifyContent:'space-between',
      height:'60px',
      flexDirection:'row',
      alignItems:'center'
    },
}))


const Header = props => {

    const classes = useStyles();
    const [loading,setLoading] = React.useState(false)
    const handleLogout = () => {
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
            props.history.push('/')
        },1000)
    }

    return(
        <>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <div >

                    <Typography variant="h4" style={{fontWeight:'300',color:'#fff',display:'inline-block'}}>
                        Smart Factory System
                    </Typography>
                </div>
                <div style={{display:'flex',justifyItems:'center',
                alignItems:'center'
                }}>
                    {
                        props.fullScreen === true?
                        <MdFullscreenExit style={{cursor:'pointer',marginRight:15}} size={25} onClick={()=>props.exitFull()} />
                        :
                        <MdFullscreen style={{cursor:'pointer',marginRight:15}} size={25} onClick={()=>props.goFull()} />
                    }
                    <Typography variant="subtitle2" style={{fontSize:'12px',color:'#fff',marginRight:'15px',cursor:'pointer'}} onClick={handleLogout}>
                        {
                            loading === true?
                            <CircularProgress style={{color:'#fff'}} size="16px" />
                            :`LOGOUT`
                        }
                    </Typography>
                </div>
            </AppBar>
        </>
    )
}

export default withRouter(Header)