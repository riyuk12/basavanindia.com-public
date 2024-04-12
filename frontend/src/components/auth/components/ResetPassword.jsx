import React from 'react'
import { Link } from 'react-router-dom'
import Card from './Card'

const ResetPasswordComponent = () => {
  return (
    <Card> 
        <h1 className='text-3xl font-bold'>Reset Your Password</h1>
        <form className='flex flex-col justify-center items-center w-full gap-4 text-sm' action="">
            <div className='flex flex-col w-full max-w-[500px] gap-2'>
                <label className='font-bold' htmlFor="otp">otp</label>
                <input className='p-1 px-4 border-solid border border-[#C6C6C6] rounded-md w-[100%] h-10' id='otp' placeholder='Enter your new password' type="password" />
            </div>
            <div className='flex flex-col w-full max-w-[500px] gap-2'>
                <label className='font-bold' htmlFor="NewPassword">New Password</label>
                <input className='p-1 px-4 border-solid border border-[#C6C6C6] rounded-md w-[100%] h-10' id='NewPassword' placeholder='Enter your new password' type="password" />
            </div>
            <div className='flex flex-col w-full max-w-[500px] gap-2'>
                <label className='font-bold' htmlFor="ConfirmNewPassword">Confirm New Password</label>
                <input className='p-1 px-4 border-solid border border-[#C6C6C6] rounded-md w-[100%] h-10' id='ConfirmNewPassword' placeholder='Confirm your new password' type="password" />
            </div>

            <button type='submit' className='bg-[#F55D5A] text-white w-full max-w-[500px] h-[3rem] font-bold rounded-md'>Reset Password</button>
        </form>

        <div className='flex flex-row justify-center gap-2 items-center'>
            <p className='text-gray-500'>Remember your password?</p>
            <Link to='/signin' className='text-[#F55D5A] font-bold'>Sign in</Link>
        </div>
    </Card>

  )
}

export default ResetPasswordComponent