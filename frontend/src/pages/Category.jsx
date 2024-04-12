import React from 'react'
import CategoryTemplate from '../components/hero/CategoryTemplate'
import Card from '../components/hero/components/Card'
import { useParams } from 'react-router-dom'
import { LuSettings2 } from "react-icons/lu";
import { useUserStore } from '../store/Userdetails';

const Category = () => {

    const data=useUserStore((state)=>state.data)
    const url=import.meta.env.VITE_REACT_IMAGE_URL
    const { category } = useParams();


  return (
    <CategoryTemplate bannerimg={"/herobg.jpeg"}>
        <div className='h-auto my-9 w-full flex justify-center items-center'>
            <div className='h-auto max-w-[60%] w-full flex flex-col justify-center items-center'>
                <div className='h-full px-5 w-full flex flex-row justify-between items-center'>
                    <span className=' text-4xl font-semibold '>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                    <button className=' m-5 p-1 flex items-center border-[2px] border-gray-300 border-solid rounded-[6px] bg-transparent'>
                    <LuSettings2/>
                        <span className=' text-lg font-semibold '>Filters by date</span>
                    </button>
                </div>
                <div className='w-full h-auto flex flex-wrap items-center py-10 '>
                    {data.map((e)=>{
                        if(e.category === category){
                            return (
                                <div className='w-[275px] h-auto'>
                                    <Card title={e.title} subtitle={e.subtitle} img={e.images} category={e.category} link={e.pdfs} />
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    </CategoryTemplate>
  )
}

export default Category