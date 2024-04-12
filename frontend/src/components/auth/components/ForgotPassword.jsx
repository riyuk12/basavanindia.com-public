import React from 'react'
import { Link } from 'react-router-dom'
import Card from './Card'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ForgotPasswordComponent = () => {
  const url = import.meta.env.VITE_REACT_API_URL+'user/forgot';
  const [email, setEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const requestBody = {
    email: email
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission, e.g., send reset link
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // You may need to add other headers like authorization if required
      },
      body: JSON.stringify(requestBody)
    })
      .then(response => response.json())
      .then(data => {console.log('Success:', data)
      setResetSent(true)
      navigate('/resetpassword')})
      .catch(error => console.error('Error:', error));
    console.log('Email submitted:', email);
  };

  return (
    <Card> 
        <h1 className='text-3xl font-bold'>Forgot Your Password?</h1>
        <form className='flex w-full max-w-[500px] flex-col justify-center items-center gap-4 text-sm' action="" onSubmit={handleSubmit}>
            <div className='flex flex-col w-full max-w-[500px] gap-2'>
                <label className='font-bold' htmlFor="Email">Email</label>
                <input className='p-1 px-4 border-solid border border-[#C6C6C6] rounded-md w-[100%] h-10' id='Email' placeholder='Enter your email' type="text" value={email} onChange={handleEmailChange}/>
            </div>
            {resetSent && <p className='text-gray-500'>Remember your password?</p>}
            <button type='submit' className='bg-[#F55D5A] text-white w-full max-w-[500px] h-[3rem] font-bold rounded-md'>Send Reset Link</button>
        </form>

        <div className='flex flex-row justify-center gap-2 items-center'>
            <p className='text-gray-500'>Remember your password?</p>
            <Link to='/signin' className='text-[#F55D5A] font-bold'>Sign in</Link>
        </div>
    </Card>

  )
}

export default ForgotPasswordComponent