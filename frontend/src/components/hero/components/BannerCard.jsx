import React from 'react'
import { useNavigate } from 'react-router-dom'
const BannerCard = ({title,subtitle,img,link}) => {
    const url=import.meta.env.VITE_REACT_IMAGE_URL
    const navigate=useNavigate()
  return (
    <div className='w-full  h-auto py-5'>
        <h1 className='text-3xl font-bold  '>{title?title:"Hindustan Times"}</h1>
        <div className='group h-auto mx-5 p-10 m-2  rounded-lg flex flex-col md:flex-row-reverse sm:flex-row-reverse  justify-between items-center gap-[10px] bg-white hover:shadow-lg transition-all ease-linear'>
            <div className='h-auto max-h-[400px]  w-full sm:w-[50%] md:w-[50%] rounded-md overflow-hidden '>
                <img src={img?url+img:"/herobg.jpeg"} className="h-full transform  md:-translate-y-1/4 w-full object-contain "  />
            </div>
            
            <div className='mt-[20px] p-6 flex sm:basis-[40%] flex-col justify-center w-full items-start gap-3'>
                <h1 className='text-3xl font-bold '>{subtitle?subtitle:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, fuga officiis. Harum nostrum enim quidem optio laboriosam qui sit voluptatum."}</h1>
                <h1 className='text-l '>{subtitle?subtitle:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, fuga officiis. Harum nostrum enim quidem optio laboriosam qui sit voluptatum."}</h1>
                <div className='w-full flex justify-between items-center'>
                <a onClick={()=>{
                    // console.log(link)
                    navigate(`/readertest/${link}`)}} className='text-gray-400 underline'>
                    <button  className='py-3 px-4 bg-[#F55D5A] m-4 rounded-lg text-white font-bold'>Read Now</button>
                </a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BannerCard