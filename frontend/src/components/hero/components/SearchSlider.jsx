import React from 'react'
import Card from './Card';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import"./Slider.css"
import { IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowDropleft } from "react-icons/io";
import { useState, useEffect } from 'react';
import { useUserStore } from '../../../store/Userdetails';


const SimpleSearchSlider = ({slidername,sliderdata}) => {
  const token = useUserStore((state) => state.token);
  const [articles,setarticles] = useState([])

  const url=import.meta.env.VITE_REACT_IMAGE_URL
  const len=sliderdata.length   



    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow:len<5?len:5,
        slidesToScroll: 1,
        arrows:true,
        nextArrow: <IoIosArrowDropright />,
        prevArrow: <IoIosArrowDropleft />,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: len<3?len:3,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: len<2?len:2,
              slidesToScroll: 1,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };

    


  return (
    <div className='w-3/4 m-auto'>
        <div className='mt-20'>

            <span className='flex mx-3 my-5 gap-10 justify-start items-center'>
                <h1 className='text-3xl font-bold'>Search Results</h1>
            </span>
        
            <Slider {...settings}>
                {sliderdata.map((e)=>{
                  
                    return (
                      <Card title={e.title} subtitle={e.subtitle} category={e.category} img={e.images} link={e.pdfs} />
                    )
                  
                })}
            </Slider>
        </div>
    </div>
  )
}

export default SimpleSearchSlider