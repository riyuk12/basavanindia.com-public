import React from 'react'
import {useNavigate} from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";

const Card = ({img,title,subtitle,category,link}) => {
  const navigate=useNavigate()
  const url=import.meta.env.VITE_REACT_IMAGE_URL



  return (
    <div className='group h-[335px] w-auto max-w-[300px] p-4 m-2 rounded-lg flex flex-col justify-START items-start gap-[10px] bg-white hover:shadow-lg transition-all ease-linear' >
        <div className='h-[200px] w-full rounded-md overflow-hidden' onClick={()=>{navigate(`/test/${title}/${subtitle}/${img}/${link}/${category}`)}}>
            <img src={img?url+img:"/herobg.jpeg"} className="h-full w-full object-fill"  />
        </div>
        <div className='mt-[20px] flex flex-col justify-center w-full items-start gap-3'>
            <h1 className='text-xl font-semibold' onClick={()=>{navigate(`/test/${title}/${subtitle}/${img}/${link}/${category}`)}}>{title?title:"Hindustan Times"}</h1>
            <div className='w-full flex justify-between items-center'>
              <a onClick={()=>{navigate(`/readertest/${link}`)}} className='text-gray-400 underline'>Read Now</a>
              <FaArrowRight className='relative right-[-10px] group-hover:right-0 opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-300'/>
            </div>
        </div>
    </div>
  )
}

export default Card