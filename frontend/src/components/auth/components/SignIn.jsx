import React, { useEffect } from 'react'
import Card from './Card'

import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import {Link } from 'react-router-dom'
import { useState } from 'react';
import { useUserStore } from '../../../store/Userdetails';
import { useNavigate } from 'react-router-dom';

const SignInForm = () => {
    //const [name,setName] = useUserStore((state)=>[state.name,state.setName])
    
    const url=import.meta.env.VITE_REACT_API_URL+"user/login"
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const [name,setName] = useUserStore((state)=>[state.name,state.setName])
    const [email1,setEmail1] = useUserStore((state)=>[state.email,state.setEmail])
    const [token,setToken] = useUserStore((state)=>[state.token,state.setToken])
    const [id,setId] = useUserStore((state)=>[state.id,state.setId])
    const [resetToken,setResetToken] = useUserStore((state)=>[state.resetToken,state.setResetToken])
    const [role,setRole] = useUserStore((state)=>[state.role,state.setRole])
    const [avatar,setAvatar] = useUserStore((state)=>[state.avatar,state.setAvatar])


    useEffect(()=>{
      // console.log(name,email1,token,id,resetToken,role,avatar)
    },[name,email1,token,id,resetToken,role,avatar])
    const pushChanges=(data)=>{
        
        setName(data.data.name)
        setEmail1(data.data.email)
        setToken(data.token)
        setId(data.data._id)
        setResetToken(data.data.resetToken)
        setRole(data.data.role)
        setAvatar(data.data.avatar)
        
    }
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Add logic to handle form submission, e.g., sign in
      const data={
        "email":email,
        "password":password
      }

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          // console.log('Response:', data);
          pushChanges(data)
          navigate('/')
        })
        .catch(error => {
          console.error('Error:', error);
          alert("username or password is incorrect")
        });
      // console.log('Email:', email);
      // console.log('Password:', password);
    };


  return (
    <Card> 
        <h1 className='text-3xl font-bold'>Sign in to your account</h1>
        <form className='flex w-full max-w-[500px] flex-col justify-center items-center gap-4 text-sm' action="" onSubmit={handleSubmit}>
            <div className='flex flex-col w-full gap-2'>
                <label className='font-bold' htmlFor="Email">Email</label>
                <input className='p-1 px-4 border-solid border border-[#C6C6C6] rounded-md w-[100%] h-10' id='Email' placeholder='Enter your email' type="text"  value={email} onChange={handleEmailChange} />
            </div>
            <div className='flex flex-col w-full gap-2'>
                <label className='font-bold' htmlFor="Password">Password</label>
                <input className='p-1 px-4 border-solid border border-[#C6C6C6] rounded-md w-[100%] h-10' id='Password' placeholder='Enter your Password' type="password" value={password} onChange={handlePasswordChange} />
            </div>

            <div className='flex justify-between items-center w-full'>
                <div className='flex gap-2 w-full'>
                    <input type="checkbox" name="" id="checkbox" />
                    <label className='text-sm text-gray-400' htmlFor='checkbox'>Remember me</label>
                </div>
                
                <Link to='/forgotpassword' className='text-gray-400 font-bold w-[10rem]'>Forgot Password?</Link>
                
            </div>
            
            <button type='submit' className='bg-[#F55D5A] text-white w-full max-w-[500px] h-[3rem] font-bold rounded-md'>Sign in</button>
        </form>
        <div><hr /><p>or</p><hr /></div>
        

        

        <div className='flex flex-row justify-center gap-2 items-center'>
            <p className='text-gray-500'>Don't have an account?</p>
            <Link to='/signup' className='text-[#F55D5A] font-bold'>Sign up</Link>
        </div>
    </Card>

  )
}

export default SignInForm