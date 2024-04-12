import React from 'react'
import Logintemplate from '../components/auth/Logintemplate'
import ResetPasswordComponent from '../components/auth/components/ResetPassword'

const ResetPassword = () => {
  return (
    <Logintemplate>
        <ResetPasswordComponent />
    </Logintemplate>
  )
}

export default ResetPassword