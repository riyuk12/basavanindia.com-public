import React from 'react'


const Logintemplate = ({children,className}) => {
  return (
    <div className={`flex items-center justify-start w-full h-[100vh] ${className} `}>
        <div className='hidden lg:flex w-[50%] h-full  flex items-center justify-center overflow-y-auto'>
            <img src='/Login.png' alt="Login" className=''/>
        </div>
        <div className='w-full lg:w-[40%] h-full  flex flex-col items-center justify-center'>{children}</div>
    </div>
  )
}

export default Logintemplate