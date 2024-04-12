import React from 'react'
import Herotemplate from '../components/hero/Herotemplate'
import SimpleSlider from '../components/hero/components/Slider'
import { useUserStore } from '../store/Userdetails'

const Home = () => {
  const data=useUserStore((state)=>state.data) 
  const categories=[...new Set(data.map(item => item.category))]

  return (
    <Herotemplate className="overflow-auto bg-[#ECE9E9]" bannerimg="/herobg.jpg">
      
      <div className='w-auto h-auto flex flex-col gap-7'>
        {
        categories.map((category)=>(
          <SimpleSlider slidername={category}/>
        )) 
        } 
        
      </div>
    </Herotemplate>
  )
}

export default Home