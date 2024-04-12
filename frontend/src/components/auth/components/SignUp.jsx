import React from 'react'
import Card from './Card'

import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import {Link } from 'react-router-dom'
import { useState } from 'react';
import { useUserStore } from '../../../store/Userdetails';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const url=import.meta.env.VITE_REACT_API_URL+"user/registration"
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreeToPrivacyPolicy, setAgreeToPrivacyPolicy] = useState(false);
    const [passwordtypeerror,setPasswordtypeerror] = useState(false);

    
    const [token,setToken] = useUserStore((state)=>[state.token,state.setToken])
    
    const pushChanges=(data)=>{
        setToken(data.token)
        navigate('/signin')
    }
    const handleNameChange = (e) => {
      setName(e.target.value);
    };
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const isPasswordValid = (s) => {
        // Password regex: at least 8 characters with at least one number
        const passwordRegex = /^(?=.*\d).{8,}$/;
        setPasswordtypeerror(passwordRegex.test(s));
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        isPasswordValid(e.target.value);
        
    };
  
    const handleConfirmPasswordChange = (e) => {
      setConfirmPassword(e.target.value);
    };
  
    const handleCheckboxChange = () => {
      setAgreeToPrivacyPolicy(!agreeToPrivacyPolicy);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Add logic to handle form submission, e.g., create account
      const data = {
        name: name,
        email: email,
        password: password,
        confirmpassword: confirmPassword,
      };
      
      if(agreeToPrivacyPolicy){fetch(url, {
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
        })
        .catch(error => {
          console.error('Error:', error);
        });}
        else{
            alert("Please agree to the privacy policy")
        }
      // console.log('Name:', name);
      // console.log('Email:', email);
      // console.log('Password:', password);
      // console.log('Confirm Password:', confirmPassword);
      // console.log('Agree to Privacy Policy:', agreeToPrivacyPolicy);
    };

  return (
    <Card> 
        <h1 className='text-3xl font-bold'>Create your account</h1>
        <form className='flex w-full max-w-[500px] flex-col justify-center items-center gap-4 text-sm' action="" onSubmit={handleSubmit}>
            <div className='flex flex-col w-[100%] gap-2'>
                <label className='font-bold' htmlFor="Name">Full Name</label>
                <input className='p-1 px-4 border-solid border border-[#C6C6C6] rounded-md w-[100%] h-10' id='Name' placeholder='Enter your name' type="text" value={name} onChange={handleNameChange} />
            </div>
            <div className='flex flex-col w-[100%] gap-2'>
                <label className='font-bold' htmlFor="Email">Email</label>
                <input className='p-1 px-4 border-solid border border-[#C6C6C6] rounded-md w-[100%] h-10' id='Email' placeholder='Enter your email' type="text" value={email} onChange={handleEmailChange}/>
            </div>
            <div className='flex flex-col w-[100%] gap-2'>
                <label className='font-bold' htmlFor="Password">Password</label>
                <input className='p-1 px-4 border-solid border border-[#C6C6C6] rounded-md w-[100%] h-10' id='Password' placeholder='Enter your Password' type="password" value={password} onChange={handlePasswordChange} />
            </div>
            <div className='flex flex-col w-[100%] gap-2'>
                {(password!="" && !passwordtypeerror) && <p className='text-red-500'>Password must be at least 8 characters and contain at least one number</p>}
            </div>
            <div className='flex flex-col w-[100%] gap-2'>
                <label className='font-bold' htmlFor="ConfirmPass">Confirm Password</label>
                <input className='p-1 px-4 border-solid border border-[#C6C6C6] rounded-md w-[100%] h-10' id='ConfirmPass' placeholder='Enter your Password again' type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
            </div>

            <div className='flex gap-2 w-full'>
                <input type="checkbox" name="" id="checkbox"  checked={agreeToPrivacyPolicy} onChange={handleCheckboxChange} />
                <label className='text-sm text-gray-400' htmlFor='checkbox'>By submitting this form, you agree to our Privacy Policy.</label>
            </div>
            
            <button type='submit' className='bg-[#F55D5A] text-white w-full max-w-[500px] h-[3rem] font-bold rounded-md'>Create your account</button>
        </form>
        <div><hr /><p>or</p><hr /></div>
       

       

        <div className='flex flex-row justify-center gap-2 items-center'>
            <p className='text-gray-500'>Already have an account?</p>
            <Link to='/signin' className='text-[#F55D5A] font-bold'>Sign in</Link>
        </div>
    </Card>
  )
}

export default SignUp