import React from 'react'
import { useState } from 'react'
import { useUserStore } from '../../store/Userdetails'
import SimpleSearchSlider from './components/SearchSlider'

const Herotemplate = ({bannerimg,children,className}) => {
    const data=useUserStore((state)=>state.data)
    const [search,setSearch]=useState('')
    const [filteredData,setFilteredData]=useState([])


    const handleSearch=(value)=>{
        setSearch(value)
        const searchResult=data.filter((item)=>{
            return item.title.toLowerCase().includes(value.toLowerCase())
        })
        setFilteredData(searchResult)
        console.log(filteredData)
    }


return (
    <section className={`h-full w-full ${className}`}>
      <div className='relative  w-full max-h-[75vh] overflow-hidden bg-black'>
        <img
          src={bannerimg}
          className='brightness-50 lg:translate-y-[-10%] h-auto w-full'
        />
        <div className="absolute h-full w-full top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] bg-transparent">
            <div className='h-full w-full flex flex-col justify-center items-center'>
                <div className='w-auto my-7 h-auto flex flex-col justify-center items-center'>
                    <span className='lg:text-4xl md:text-3xl sm:text-2xl font-bold text-white'>Dive into a multiverse of <span className='text-[#F55D5A]'>Magazines</span></span>
                    <span className='lg:text-2xl md:text-xl sm:text-md text-center font-semibold text-white mt-5' >Engaging, Insightful, and Always Just a Click Away</span>
                </div>
                <div className=' w-[50vw] m-5 p-1 flex items-center border border-white border-solid border-[2px] text-white rounded-[6px] bg-transparent'>
                    <input
                        type="text"
                        placeholder="Search your favourite magazines..."
                        className="w-full h-full px-4 py-2 outline-none bg-transparent text-white"
                        onChange={(e)=>{handleSearch(e.target.value)}}
                    />
                    <button className='px-[15px] py-[5px] flex justify-center items-center bg-[#F55D5A] rounded-[6px]'>
                        <span className="text-white m-0">
                        {/* Magnifying glass icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6M3 9a6 6 0 1112 0 6 6 0 01-12 0z"
                            />
                        </svg>
                        </span>
                    </button>
                </div>
            </div>
        </div>
      </div>
      {search!=="" && ((filteredData.length!==0) ?(<SimpleSearchSlider sliderdata={filteredData}/>):(<div className='w-full h-200 font-bold text-xl flex justify-center items-center p-5'> No results </div>)) }
      
      {children}
    </section>
  );
}

export default Herotemplate