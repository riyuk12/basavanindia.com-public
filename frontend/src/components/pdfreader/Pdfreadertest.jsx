import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import {Document, Page} from 'react-pdf'
import pdf from '/ft.pdf'
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import { useParams } from 'react-router-dom';

const Pdfreadertest = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const screenWidthRef = useRef(window.innerWidth);
    const screenHeightRef = useRef(window.innerHeight);
    const [dim,setDim] = useState([screenWidthRef.current,screenHeightRef.current])
    const {pdf} = useParams()
    const url=import.meta.env.VITE_REACT_PDF_URL

    // Effect to run when the component mounts and when the screen is resized
    const handleResize = () => {
      // Update the ref with the current screen width
        screenWidthRef.current = window.innerWidth;
        setDim([screenWidthRef.current,screenHeightRef.current])
        screenHeightRef.current = window.innerHeight;
        console.log('Current Screen Width:', screenWidthRef.current);
        console.log('Current Screen Width:', screenHeightRef.current);
    };
    useEffect(() => {
  
      // Attach the event listener for the resize event
      window.addEventListener('resize', handleResize);
      console.log(url+pdf)
      // Cleanup function to remove the event listener when the component unmounts
      return () => window.removeEventListener('resize', handleResize);
      
    }, [screenWidthRef.current,screenHeightRef.current]);

    function onDocumentLoadSuccess({numPages}){
        setNumPages(numPages);
        setPageNumber(1);
    }       
  return (
    <div className=' h-full w-full flex flex-col justify-center items-center'>
        <div className={`w-full h-full absolute z-10 flex justify-between items-center px-[10%]`}>
            <div className='h-full w-[50%] flex justify-start items-center opacity-0 hover:opacity-50 transition ease-in-out delay-150' onClick={()=>{if(pageNumber>1){setPageNumber(prev=>prev-1)}}}>
                <button ><span><MdNavigateBefore size={100}/></span></button>
            </div>
            <div className='h-full w-[50%] flex justify-end items-center opacity-0 hover:opacity-50 transition ease-in-out delay-150' onClick={()=>{if(pageNumber<numPages){setPageNumber(prev=>prev+1)}}}>
                <button ><span><MdNavigateNext size={100}/></span></button>
            </div>
        </div>
        <Document file={url+pdf} onLoadSuccess={onDocumentLoadSuccess} className="h-full w-auto">
            <Page className="z-0 absolute flex justify-center items-center" height={dim[1]*0.9} width={dim[0]<1000?(dim[0]):undefined} pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />
            <div className='flex justify-center items-center'>Page {pageNumber} of {numPages}</div>
        </Document>
        <div className='z-50 flex justify-center items-center'>
          <a href={url+pdf} target='_blank'>
            <button  className='py-3 px-4 bg-[#F55D5A] m-4 rounded-lg text-white font-bold'>Download</button>
          </a>
        </div>
    </div>
  )
}

export default Pdfreadertest