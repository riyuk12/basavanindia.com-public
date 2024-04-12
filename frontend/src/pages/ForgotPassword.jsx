import React from 'react'
import ForgotPasswordComponent from '../components/auth/components/ForgotPassword'
import Logintemplate from '../components/auth/Logintemplate'


const ForgotPassword = () => {
  return (
    <Logintemplate>
        <ForgotPasswordComponent />
    </Logintemplate>
  )
}

export default ForgotPassword