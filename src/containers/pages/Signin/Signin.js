// import React from 'react'
// import { Link } from "react-router-dom"
// import axios from 'axios';
// import { Typography, TextField, Button, CircularProgress, Grid } from '@material-ui/core';
// import { datePickerDefaultProps } from '@material-ui/pickers/constants/prop-types';
// import { withRouter } from 'react-router-dom'
// import BackgroundImage from '../../../assets/images/972d7e84419325.5d5c55208a4ee.jpg'
// import { connect } from 'react-redux'
// import authActions from '../../../redux/auth/actions'
// import { end_point } from '../../../util/config'
// const { login } = authActions

// const Signin = props => {


//     // React.useEffect(()=>{
//     //     axios.get('/api/basic/list')
//     //     .then(res => console.log('res.data.Basic: ',res.data.Basic))
//     // },[])
//     const [state,setState] = React.useState({})
//     const [username,setUsername] = React.useState('')
//     const [password,setPassword] = React.useState('')
//     const [loading,setLoading] = React.useState(false)
//     const handleSignin = () => {
//         setLoading(true)
//         setTimeout(()=>{
//             setLoading(false)
//             props.login({username,password})
//         },1000)
//     }
//     // const handleImageChange = (e) => {
//     //     console.log('handleCHange: ',e.target.value,e.target.files[0])
//     //     setState({image:e.target.files[0]})

//     // }
//     // const uploadImage = () => {

//     //     let filename = state.image.name.split('/').pop();
//     //     let match = /\.(\w+)$/.exec(filename);
//     //     let type = match ? `image/${match[1]}` : `image`;
//     //     // setLoading(true)

//     //     let formData = new FormData();
//     //     formData.append('picture', state.image);

//     //     if (match[1] === 'png' || match[1] === 'jpg' || match[1] === 'jpeg') {
//     //         console.log('filename: ', filename, ', match: ', match, ', type: ', type)
//     //         try {
//     //             setLoading(false)
//     //             fetch(end_point + `/api/upload-report`, {
//     //                 method: 'post',
//     //                 headers: {
//     //                     'Content-Type': 'multipart/form-data'
//     //                 },
//     //                 body: formData
//     //             })
//     //                 .then(res => res.json())
//     //                 .then(res => {
//     //                     setLoading(false)
//     //                     console.log('resssssssssssssss', res)
//     //                     // dispatch({ type: 'UPDATE_USER_DETAILS', payload: res.Restaurant })
//     //                 })
//     //                 .catch(err => {
//     //                     console.log('error while uploading picture', err)
//     //                     setLoading(false)
//     //                 })
//     //         } catch (err) {
//     //             console.log('err in try catch while uploading picture', err)
//     //             setLoading(false)
//     //         }
//     //     } else {
//     //         console.log('Only png and jpg type allowed')
//     //     }
//     // }

//     return (
//             <div style={{ marginTop:'0px',display:'flex',justifyContent:'center', 
//             backgroundImage:`linear-gradient(rgba(31, 138, 56, 0.9), rgba(0, 0, 6, 0.9)),url(${BackgroundImage})`,
//             // backgroundImage:`linear-gradient(rgba(31, 78, 36), rgba(10, 20, 16))`,
//             height:'100vh',padding:'50px',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover' }}>
//                 {/* <h2>Sign In</h2>
//                 <p>Welcome to sign up page. Click <Link to="/">here</Link> to go back!</p> */}
//                 <div style={{height:'500px',width:'800px',borderRadius:'10px',
//                 backgroundColor:'#fff',
//                 border:'1px solid #212121',marginTop:'20px',display:'grid',gridTemplateColumns:'60% 40%',overflow:'hidden'}}>
//                     <Grid container style={{backgroundColor:'#212121',padding:'30px',display:'flex',justifyContent:'center',alignItems:'center'}}>
//                         <Grid item lg={12} md={12} sm={12} xs={12} style={{display:'flex',justifyContent:'center'}}>
//                             <Typography variant="h4" style={{textAlign:'center',fontWeight:'300',color:'#fff',marginTop:'20px',height:'0px'}}>
//                                 Smart Factory Management System
//                             </Typography>
//                         </Grid>
//                         <Grid item lg={12} md={12} sm={12} xs={12} style={{display:'flex',justifyContent:'center',height:'0px',marginTop:'-40px'}}>
//                             <Typography variant="subtitle2" style={{fontWeight:'300',color:'#fff'}}>
//                                 Powered by
//                             </Typography>
//                         </Grid>
//                         <Grid item lg={12} md={12} sm={12} xs={12} style={{display:'flex',justifyContent:'center',height:'100px',marginTop:'-100px'}}>
//                             <img src={require('../../../assets/images/WiMetrix.png')} style={{height:'100px'}}/>
//                         </Grid>
//                     </Grid>
//                     <div style={{padding:'25px',display:'flex',flexDirection:'column',justifyContent:'center'}}>
//                         <div style={{textAlign:'center',marginTop:0}}>
//                             <Typography variant="h6" style={{fontWeight:'300'}}>
//                                 Sign In
//                             </Typography>
//                         </div>
//                         <div style={{marginTop:'20px'}}>
//                             <TextField
//                                 name="username"
//                                 label="Username"
//                                 variant="outlined"
//                                 fullWidth
//                                 value={username}
//                                 onChange={(e)=> setUsername(e.target.value)}
//                             />
//                         </div>
//                         <div style={{marginTop:'10px'}}>
//                             <TextField
//                                 name="password"
//                                 label="Password"
//                                 variant="outlined"
//                                 fullWidth
//                                 type="password"
//                                 value={password}
//                                 onChange={(e)=> setPassword(e.target.value)}
//                             />
//                         </div>
//                         <div style={{marginTop:'10px'}}>
//                             <Button variant="contained" color={'primary'} style={{height:'50px'}} fullWidth onClick={handleSignin}>
//                                 {
//                                     loading === true?
//                                     <CircularProgress size="15px" style={{color:'#fff'}}/>
//                                     :`Sign In`
//                                 }
//                             </Button>
//                         </div>
//                         {/* <input type='file' onChange={handleImageChange}/>
//                         <button onClick={uploadImage}>add</button> */}
//                         {/* <div style={{marginTop:'10px',textAlign:'center'}}>
//                             <Typography variant="subtitle2" style={{fontSize:'12px'}}>
//                                 Don't have an account? <span style={{color:'#4B5573',cursor:'pointer'}} onClick={()=>props.history.push('/signup')}>Sign Up</span>
//                             </Typography>
//                         </div> */}
//                     </div>
//                 </div>
//             </div>
//     )
// }
// export default connect(
//         state => ({
//             loading: state.Auth.loading,
//             //user:
//         }),
//         { login }
//     )(withRouter(Signin))
// //export default withRouter(Signin)

import React from 'react'
import { withRouter } from 'react-router-dom'
import Image from '../../../assets/images/972d7e84419325.5d5c55208a4ee.jpg'
import { Grid, TextField, Button, Typography, CircularProgress } from '@material-ui/core'
import { connect } from 'react-redux'
import authActions from '../../../redux/auth/actions'
// import Image from '../../../assets/528.jpg'
//import axios from 'axios';

const { login } = authActions


const Signin = props => {

    const [state,setState] = React.useState({username:'',password:''})
    const [loading,setLoading] = React.useState(false)

    // React.useEffect(()=>{
    //     axios.get('/api/basic/list')
    //     .then(res => console.log('res.data.Basic: ',res.data.Basic))
    // },[])
    const handleChange = (e) => {
        setState({...state,[e.target.name]:e.target.value})
    }

    const handleSignin = () => {
                setLoading(true)
                setTimeout(()=>{
                    setLoading(false)
                    props.login({username:state.username,password:state.password})
                },1000)
            }

    return (
        <div style={{backgroundColor:'#f6f6f6',height:'100vh',display:'grid',gridTemplateColumns:'40% 60%'}}>
            <div style={{ display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',backgroundColor:'black',color:'#fff',backgroundImage:`linear-gradient(to bottom, rgba(13, 81, 5, 0.9), rgba(37, 37, 37, 0.9)),
url(${Image})` }}>
                <Typography variant="h3" style={{marginBottom:20,fontWeight:'700'}}>Interloop - Acvtive Wear</Typography>
                {/* <div style={{display:'flex',justifyContent:'center',paddingTop:0,paddingBottom:20}}>
                    <img src={require('../../../assets/rtl.jpg')} alt="Logo" style={{width:310}}/>
                </div> */}
                <Typography variant="subtitle2">Sign In To Continue</Typography>
                {/* <h4>Sign In To Continue</h4> */}
            </div>
            <div style={{ padding: '0px 20px',display:'flex',flexDirection:'column',justifyContent:'center' }}>
                <Grid container style={{ display:'flex',justifyContent:'center'}}>
                    <Typography variant="h3" color='secondary' style={{textAlign:'center',fontWeight:'700'}}>Welcome to Smart Factory Management System</Typography>
                </Grid>
                {/* <Grid container style={{ display:'flex',justifyContent:'center'}}>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                        <Typography variant="h6" color='primary' style={{textAlign:'center'}}>Sign In</Typography>
                    </Grid>
                </Grid> */}
                
                <Grid container style={{ display:'flex',justifyContent:'center',marginTop:50}}>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                        <TextField name="username" onChange={handleChange} value={state.username} label="Username" variant="outlined" fullWidth />
                    </Grid>
                    </Grid>
                <Grid container style={{ display:'flex',justifyContent:'center',marginTop:20 }}>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                        <TextField name="password" type="password" onChange={handleChange} value={state.password} label="Password" variant="outlined" fullWidth />
                    </Grid>
                </Grid>
                <Grid container style={{ display:'flex',justifyContent:'center',marginTop:20 }}>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                        <Button variant="contained" fullWidth style={{height:'50px',color:'#fff'}} color="primary" onClick={handleSignin}>
                            {
                                loading === true?
                                <CircularProgress size="15px" style={{color:'#fff'}}/>
                                :`Sign In`
                            }
                        </Button>
                    </Grid>
                </Grid>
                <div style={{display:'flex',justifyContent:'center',paddingTop:40,paddingBottom:20}}>
                    <Typography variant='subtitle2' color='secondary'>Powered By</Typography>
                </div>
                <div style={{display:'flex',justifyContent:'center',paddingTop:0,paddingBottom:20}}>
                    <img src={require('../../../assets/images/WiMetrix.png')} alt="Logo" style={{width:210}}/>
                </div>
            </div>
        </div>
    )
}

export default connect(
        state => ({
            loading: state.Auth.loading,
            //user:
        }),
        { login }
    )(withRouter(Signin))
//export default withRouter(Signin)