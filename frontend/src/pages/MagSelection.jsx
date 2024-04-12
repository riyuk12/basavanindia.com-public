import React from 'react'
import BannerCard from '../components/hero/components/BannerCard'
import SimpleSlider from '../components/hero/components/Slider'
import { useParams } from 'react-router-dom'


const MagSelection = () => {
    const {title,subtitle,img,link,category} = useParams()
  
  return (
    <section className={`h-full w-full `}>
      <div className='relative  w-full p-10 overflow-hidden bg-slate'>
        <BannerCard title={title} subtitle={subtitle} img={img}  link={link}/>
        
      </div>
      <h1 className='text-3xl font-bold mt-10 mx-10'>Recommended Magazines</h1>
      <SimpleSlider slidername={category}/>
      
    </section>
  )
}

export default MagSelection