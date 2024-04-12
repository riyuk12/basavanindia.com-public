import React from 'react'

const Card = ({children,className}) => {
  return (
    <div className={`${className} flex flex-col gap-4 w-full justify-center items-center p-4 gap-10`}>{children}</div>
  )
}

export default Card