import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
//import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Drawer from '../../../components/Sidebar'
import Header from '../../../components/Header/Header'
import OrderBooking from '../../../components/IndexOrderBooking'
import SewingThread from '../../../components/SewingThreadInformation'
import PackingInformation from '../../../components/PackingInformation'
import YarnInformation from '../../../components/IndexYarnInformation'
import DyeingInformation from '../../../components/DyeingInformation'
import KnittingPlanning from '../../../components/KnittingPlanning'
import StitchingInformation from '../../../components/StitchingInformation'
import FeedingStatus from '../../../components/FeedingStatus'
import AccessoryInformation from '../../../components/AccessoryInformation'
import Fullscreen from "react-full-screen";
import './index.css'
// import ROApprovalForm from '../../../components/Forms/ROApprovalForm'
// import OrderFeedingForm from '../../../components/Forms/OrderFeedingForm'
// import BOMOrderingForm from '../../../components/Forms/BOMOrderingForm'
// import YarnAvailabilityForm from '../../../components/Forms/YarnAvailabilityForm'
// import FabricAvaiability from '../../../components/Forms/FabricAvaiability'
// import OrderFeedingTable from '../../../components/ROApprovalTable'
// import Divider from '@material-ui/core/Divider';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: '#EFF0F1',
    padding: theme.spacing(3),
  },
  contentPaper:{
      backgroundColor:'#fff'
  }
}));

export default function PermanentDrawerLeft() {
  const classes = useStyles();

  const [state,setState] = React.useState(0)
  const [fullScreen,setFullScreen] = React.useState(false)

  const goFull = () => {
    setFullScreen(true)
  }
  const exitFull = () => {
    setFullScreen(false)
  }

  return (
       <Fullscreen
        enabled={fullScreen}
        onChange={isFull => setFullScreen(isFull)}
        style={{overflow:'scroll'}}
      >
    <div className={classes.root}>
      <Header exitFull={exitFull} goFull={goFull} fullScreen={fullScreen} />
      <Drawer selected={state} setSelected={setState} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Paper className={classes.contentPaper}>
            <div style={{padding:'20px'}}>
            {
                state === 0? 
                <OrderBooking />
                :
                state === 1?
                <YarnInformation />
                :
                state === 2?
                <KnittingPlanning />
                :
                state === 3?
                <FeedingStatus />
                :
                state === 4?
                <AccessoryInformation />
                :
                state === 7?
                <PackingInformation />
                :
                state === 6?
                <StitchingInformation />
                :
                state === 5?
                <DyeingInformation />
                :
                state === 8?
                <SewingThread />
                :
                <div style={{padding:30,display:'flex',justifyContent:'center'}}>
                    <Typography variant="subtitle1">
                    Nothing here yet.
                    </Typography>
                </div>
            }
            </div>
        </Paper>
      </main>
    </div>
      </Fullscreen>
  );
}

// import React from 'react'
// import { connect } from "react-redux";
// import authActions from '../../../redux/auth/actions'
// import { Link } from 'react-router-dom'

// const { basicFetch } = authActions

// const Landing = props => {

//     const { loading, basicFetch } = props;
//     console.log(`Landing page. Loading value: `,loading)

//     React.useEffect(()=>{
//         basicFetch()
//     },[])

//     return (
//         <>
//             <div style={{padding:'0px 20px'}}>
//                 <h2>Landing</h2>
//                 {
//                     loading === true ?
//                     <p>fetching data...</p>
//                     :
//                     <p>Hey! How are you? Click <Link to="/signup">here</Link> to sign up.</p>
//                 }
//             </div>
//         </>
//     )


// }

// export default connect(
//     state => ({
//         loading: state.Auth.loading
//     }),
//     { basicFetch }
// )(Landing)