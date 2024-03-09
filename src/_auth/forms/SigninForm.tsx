import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


const SigninForm = () => {
  const navigate =  useNavigate();
  //run whenever app loads with []
  useEffect(() => {
    if(
      localStorage.getItem("cookieFallback") === '[]' 
      //localStorage.getItem("cookieFallback") === null
    ){
      //navigate('/sign-up');
    }
      
    
  }, []);
  return (
    <div>SigninForm</div>
  )
}

export default SigninForm