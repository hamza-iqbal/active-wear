import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import OrderIcon from '@material-ui/icons/Storefront';
import { RiPaintLine } from 'react-icons/ri';
import { AiOutlineShop, AiOutlineMacCommand } from 'react-icons/ai';
import { GiSewingNeedle, GiRolledCloth, GiTripleNeedle,GiSewedShell } from 'react-icons/gi';
import { GoPackage, GoGraph } from 'react-icons/go';
import FeedingStatusIcon from '@material-ui/icons/Timeline';
import AccessoryIcon from '@material-ui/icons/AmpStories';
import YarnIcon from '@material-ui/icons/LineStyle';
import KnittingIcon from '@material-ui/icons/MergeType';
import Avatar from '@material-ui/core/Avatar';

import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';

const drawerWidth = 280;

const useStyles = makeStyles(theme => ({
//   root: {
//     display: 'flex',
//   },
//   appBar: {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: drawerWidth,
//   },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor:'#212121',
    color:'#fff'
  },
  toolbar: theme.mixins.toolbar,
//   content: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.default,
//     padding: theme.spacing(3),
//   },
}));

const Sidebar = props => {
  const classes = useStyles();

  return (
    <>
        <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        {/* <div className={classes.toolbar} />
        <Divider /> */}
        <div style={{margin:'20px 10px 10px',textAlign:'center',fontSize:'20px',zIndex:'999'}}>
            WIMETRIX
        </div>
        <div style={{margin:'10px',color:'#fff',marginTop:-10,display:'flex',justifyContent:'center',fontSize:'20px'}}>
          {/* <img src={require('../../assets/images/interloop.png')} alt="interloop" style={{height:120}}/> */}
        <Avatar style={{marginTop:15,marginBottom:15,height:'90px',width:'90px',cursor:'pointer',fontSize:30}}>A</Avatar>
        </div>
        <div style={{margin:'10px 0px',marginTop:-10,display:'flex',justifyContent:'center',fontSize:'20px',borderBottom:'1px solid black',padding:'0px 10px 20px',cursor:'pointer'}}>
        Active Wear
        </div>
        <List>
            <div style={{backgroundColor:props.selected===0?'#4B8D3A':'transparent',margin:'10px',}}>
                <ListItem button  onClick={()=>props.setSelected(0)}>
                <ListItemIcon><AiOutlineShop size={20} style={{color:'#fff'}} /></ListItemIcon>
                <ListItemText primary={`Order Booking`} />
                </ListItem>
            </div>
            <div style={{backgroundColor:props.selected===1?'#4B8D3A':'transparent',margin:'10px',}}>
                <ListItem button  onClick={()=>props.setSelected(1)}>
                <ListItemIcon><GiRolledCloth size={20} style={{color:'#fff'}} /></ListItemIcon>
                <ListItemText primary={`Yarn Information`} />
                </ListItem>
            </div>
            <div style={{backgroundColor:props.selected===2?'#4B8D3A':'transparent',margin:'10px',}}>
                <ListItem button  onClick={()=>props.setSelected(2)}>
                <ListItemIcon><GiSewingNeedle size={20} style={{color:'#fff'}} /></ListItemIcon>
                <ListItemText primary={`Knitting Information`} />
                </ListItem>
            </div>
            <div style={{backgroundColor:props.selected===5?'#4B8D3A':'transparent',margin:'10px',}}>
                <ListItem button  onClick={()=>props.setSelected(5)}>
                <ListItemIcon><RiPaintLine style={{color:'#fff'}} size={20}/></ListItemIcon>
                <ListItemText primary={`Dyeing Information`} />
                </ListItem>
            </div>
            <div style={{backgroundColor:props.selected===6?'#4B8D3A':'transparent',margin:'10px',}}>
                <ListItem button  onClick={()=>props.setSelected(6)}>
                <ListItemIcon><GiTripleNeedle style={{color:'#fff'}} size={20} /></ListItemIcon>
                <ListItemText primary={`Stitching Information`} />
                </ListItem>
            </div>
            <div style={{backgroundColor:props.selected===8?'#4B8D3A':'transparent',margin:'10px',}}>
                <ListItem button  onClick={()=>props.setSelected(8)}>
                <ListItemIcon><GiSewedShell size={20} style={{color:'#fff'}} /></ListItemIcon>
                <ListItemText primary={`Sewing Thread Information`} />
                </ListItem>
            </div>
            <div style={{backgroundColor:props.selected===7?'#4B8D3A':'transparent',margin:'10px',}}>
                <ListItem button  onClick={()=>props.setSelected(7)}>
                <ListItemIcon><GoPackage style={{color:'#fff'}} size={20} /></ListItemIcon>
                <ListItemText primary={`Packing Information`} />
                </ListItem>
            </div>
            <div style={{backgroundColor:props.selected===4?'#4B8D3A':'transparent',margin:'10px',}}>
                <ListItem button  onClick={()=>props.setSelected(4)}>
                <ListItemIcon><AiOutlineMacCommand size={20} style={{color:'#fff'}} /></ListItemIcon>
                <ListItemText primary={`Accessory Information`}/>
                </ListItem>
            </div>
            <div style={{backgroundColor:props.selected===3?'#4B8D3A':'transparent',margin:'10px',}}>
                <ListItem button  onClick={()=>props.setSelected(3)}>
                <ListItemIcon><GoGraph size={20} style={{color:'#fff'}} /></ListItemIcon>
                <ListItemText primary={`Feeding Status`} />
                </ListItem>
            </div>
            
        </List>
        
      </Drawer>
    </>
  );
}

export default Sidebar