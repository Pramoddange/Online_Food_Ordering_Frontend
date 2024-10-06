import { Box, Modal } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { style } from '../Cart/Cart';
import RegisterFrom from './RegisterFrom';
import LoginFrom from './LoginFrom';

const Auth = () => {
    const location=useLocation();
    const navigate=useNavigate();
    const handledOnclose=()=>{
        navigate("/")
    }
    
  return (
    <>
      <Modal  onClose={handledOnclose} open={
        location.pathname==="/account/register"
        ||location.pathname==="/account/login"
       
      }>
        <Box sx={style}>
     { location.pathname==="/account/register" ? <RegisterFrom/> : <LoginFrom/>}
        </Box>
        
      </Modal>
    </>
  )
}

export default Auth
