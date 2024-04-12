import React from 'react'
import Logintemplate from '../components/auth/Logintemplate'
import SignInForm from '../components/auth/components/SignIn'

const SignIn = () => {
  return (
    <Logintemplate className="h-[100vh]">
        <SignInForm/>
    </Logintemplate>
  )
}

export default SignIn