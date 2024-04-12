import React from 'react'

const CategoryTemplate = ({bannerimg,children,className}) => {

return (
    <section className={`h-full w-full ${className}`}>
      <div className='relative  w-full max-h-[50vh] overflow-hidden bg-black'>
        <img
          src={bannerimg}
          className='brightness-[70%] lg:translate-y-[-10%] h-auto w-full'
        />
        
      </div>
      {children}
    </section>
  );
}

export default CategoryTemplate