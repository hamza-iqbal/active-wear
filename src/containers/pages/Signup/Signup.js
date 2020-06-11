import React from 'react'
import { Link } from "react-router-dom"
import axios from 'axios';
import { Typography, TextField, Button, Grid,CircularProgress } from '@material-ui/core';
import { datePickerDefaultProps } from '@material-ui/pickers/constants/prop-types';
import { withRouter } from 'react-router-dom'
import BackgroundImage from '../../../assets/images/mountain.jpg'

const SignUp = props => {


    const [loading,setLoading] = React.useState(false)
    const handleSignup = () => {
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
            props.history.push('/')
        },2000)
    }
    

    return (
            <div style={{ marginTop:'0px',display:'flex',justifyContent:'center', backgroundImage:`linear-gradient(rgba(31, 38, 56, 0.7), rgba(31, 38, 56, 0.7)),url(${BackgroundImage})`,height:'100vh',padding:'50px',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover' }}>
                {/* <h2>Sign In</h2>
                <p>Welcome to sign up page. Click <Link to="/">here</Link> to go back!</p> */}
                <div style={{height:'500px',width:'800px',borderRadius:'10px',backgroundColor:'#fff',marginTop:'20px',display:'grid',gridTemplateColumns:'60% 40%',overflow:'hidden'}}>
                <Grid container style={{backgroundColor:'#191F33',padding:'30px',display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <Grid item lg={12} md={12} sm={12} xs={12} style={{display:'flex',justifyContent:'center'}}>
                            <Typography variant="h4" style={{fontWeight:'300',color:'#fff',marginTop:'20px',height:'0px'}}>
                                General Order Status
                            </Typography>
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12} style={{display:'flex',justifyContent:'center',height:'0px',marginTop:'-40px'}}>
                            <Typography variant="subtitle2" style={{fontWeight:'300',color:'#fff'}}>
                                Powered by
                            </Typography>
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12} style={{display:'flex',justifyContent:'center',height:'100px',marginTop:'-100px'}}>
                            <img src={require('../../../assets/images/WiMetrix.png')} style={{height:'100px'}}/>
                        </Grid>
                    </Grid>
                    <div style={{padding:'25px'}}>
                        <div style={{textAlign:'center',marginTop:'30px'}}>
                            <Typography variant="h6" style={{fontWeight:'300'}}>
                                Sign Up
                            </Typography>
                        </div>
                        <div style={{marginTop:'30px'}}>
                            <TextField
                                name="username"
                                label="Username"
                                variant="outlined"
                                fullWidth
                            />
                        </div>
                        <div style={{marginTop:'10px'}}>
                            <TextField
                                name="password"
                                label="Password"
                                variant="outlined"
                                fullWidth
                            />
                        </div>
                        <div style={{marginTop:'10px'}}>
                            <TextField
                                name="repassword"
                                label="Re-enter Password"
                                variant="outlined"
                                fullWidth
                            />
                        </div>
                        <div style={{marginTop:'10px'}}>
                            <Button variant="contained" style={{backgroundColor:'rgb(235, 65, 82)',color:'#fff',height:'50px'}} fullWidth onClick={handleSignup}>
                            {
                                    loading === true?
                                    <CircularProgress size="15px" style={{color:'#fff'}}/>
                                    :`Sign Up`
                                }
                            </Button>
                        </div>
                        <div style={{marginTop:'10px',textAlign:'center'}}>
                            <Typography variant="subtitle2" style={{fontSize:'12px'}}>
                                Already have an account? <span style={{color:'#4B5573',cursor:'pointer'}} onClick={()=>props.history.push('/')}>Sign In</span>
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default withRouter(SignUp)