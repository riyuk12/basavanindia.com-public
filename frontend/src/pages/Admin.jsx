import React, { useEffect,useState } from 'react'
import { PiSignOutBold } from "react-icons/pi";
import { useUserStore } from '../store/Userdetails'
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { FaBook } from "react-icons/fa";

import Card from '../components/hero/components/Card'

const Admin = () => {
    const [name,setName] = useUserStore((state)=>[state.name,state.setName])
    const [avatar,setAvatar] = useUserStore((state)=>[state.avatar,state.setAvatar])
    const [role,setRole] = useUserStore((state)=>[state.role,state.setRole])
    const [token] = useUserStore((state) => [state.token]);
    const [approvals,setapprovals] = useState(false)
    const [approveddata,setapproveddata] = useUserStore((state)=>[state.data,state.setData])
    const [alldata,setalldata] = useState()


    
    const [formData, setFormData] = useState({
        category: 'news',
        title: '',
        subtitle: '',
        imageFile: null,
        pdfFile: null,
      });

    useEffect(()=>{
        console.log(formData)
        
    },[formData])

    const [image,setimage] = useState(null)
    const [pdf,setpdf] = useState(null)
    const [key,setkey] = useState(true)
    const navigate = useNavigate()
    // const checkauth=()=>{
    //     console.log(role)
    //     if((role!=='admin' && role!=='superadmin') || role===""){
    //         navigate('/')
    //     }
    // }



    // useEffect(()=>{checkauth()},[])
    // const reset=useUserStore((state)=>state.reset)

    const baseurl=import.meta.env.VITE_REACT_API_URL
    const imgurl=import.meta.env.VITE_REACT_IMAGE_URL

    const url1 =`${baseurl}image/upload`
    const url2 =`${baseurl}pdf/upload`
    const url3 =`${baseurl}/upload/magzine`

    const getApprovedMagazinesUrl=`${baseurl}all/magzine` 
    const getAllMagazinesUrl=`${baseurl}/getallmagzine/admin`
    const approveMagazineUrl=`${baseurl}/apporved/magzine`


    const handleApproval=(id)=>{
      
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);

      var raw = JSON.stringify({
        "MagzineId": id,
        "Apporved": true
      });

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch(approveMagazineUrl, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }

    useEffect(()=>{
    
      const fetchData = async () => {
        
  
        try {
          const response = await fetch(getApprovedMagazinesUrl, {
            method: 'GET',
            
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          const result = await response.json();
          
          setapproveddata(result.data);
        } catch (error) {
          console.error(error.message);
        }
      };
      
      fetchData();
        },[handleApproval])

    useEffect(()=>{
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

      fetch(getAllMagazinesUrl, requestOptions)
        .then(response => response.text())
        .then(result => JSON.parse(result))
        .then(result => {setalldata(result.data)})
        .catch(error => console.log('error', error));

      },[])

    

    const handleChange = (e) => {
        
        const { name, value, type } = e.target;
    
        setFormData((prevData) => ({
          ...prevData,
          [name]: type === 'file' ? e.target.files[0] : value,
        }));
      };

    const handleImageUpload=async()=>{
        const myHeaders = new Headers();
        myHeaders.append(
            "Authorization",
            `Bearer ${token}`
        );

        const formdata = new FormData();
        formdata.append("image", formData.imageFile);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
            redirect: "follow",
        };

        try {
            const response = await fetch(url1, requestOptions);
            const result = await response.text();
            console.log(result,JSON.parse(result));
            const jsonResult = JSON.parse(result)
            return jsonResult.filename
        } catch (error) {
            console.error("Error:", error);
        }

    }

    const handlePdfUpload = async () => {
      
        const myHeaders = new Headers();
        myHeaders.append(
          "Authorization",
          `Bearer ${token}`
        );
      
        const formdata = new FormData();
        formdata.append("pdf", formData.pdfFile);
      
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: formdata,
          redirect: "follow",
        };
      
        try {
          const response = await fetch(url2, requestOptions);
          const result = await response.text();
          console.log(result,JSON.parse(result));
          const jsonResult = JSON.parse(result)
          return jsonResult.filename
        } catch (error) {
          console.error("Error:", error);
        }
      };

      const handleMagazineUpload = async (imageResult,pdfResult) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append(
          "Authorization",
          `Bearer ${token}`
        );
      
        // const formdata = new FormData();
        // formdata.append("pdf", formData.pdfFile);
        const requestBody = {
            category: formData.category,
            title: formData.title,
            subtitle: formData.subtitle,
            images: imageResult,
            pdfs: pdfResult,
          };
        

        
      
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify(requestBody),
          redirect: "follow",
        };
      
        try {
          const response = await fetch(url3, requestOptions);
          const result = await response.text();
          console.log(result);
        } catch (error) {
          console.error("Error:", error);
        }
      };

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(token);

        try {
          const [imageResult, pdfResult] = await Promise.all([handleImageUpload(), handlePdfUpload()]);
          
          // Access the results of image and pdf uploads
          console.log('Image Result:', imageResult);
          console.log('PDF Result:', pdfResult);
      
          // Call handleMagazineUpload after image and pdf uploads are completed
          handleMagazineUpload(imageResult, pdfResult);
          alert('Form submitted successfully!');
        } catch (error) {
          console.error('Error during image or pdf upload:', error);
          alert('Error during form submission!');
        }
        console.log('Form submitted:', formData);
        window.location.reload()
      };

  return (
    <section className='w-full  h-full flex py-10'>
        <div className='w-[20%] py-9 max-w-[300px] rounded-lg shadow-xl'>
            <ul className='w-full h-[60%] flex flex-col '>
                <li className='flex flex-col h-[50%] max-h-[200px] gap-6 p-6 justify-center items-center'>
                    {avatar ? (<img src={avatar} alt="" />) : (<FaRegUserCircle size={80} />) }
                    <h1 className='bold text-xl'>
                        {name}
                    </h1>
                </li>
                <li className='flex flex-col gap-6 p-6 justify-center items-center '>
                    <a href="/" >
                        <button className=' flex  justify-start gap-5 px-4 text-xl semibold'>
                            <FaBook size={30}/>
                            Magazine
                        </button>
                    </a>
                </li>
                { role=="superadmin" && (!approvals?  
                (
                <li className='flex flex-col gap-6 p-6 justify-center items-center'>
                    <button onClick={()=>{
                        setapprovals(true)
                        }} className=' flex  justify-start gap-5 px-4 text-xl semibold'>
                        <PiSignOutBold size={30}/>
                        Approvals
                    </button>
                </li>)
                :
                (
                  <li className='flex flex-col gap-6 p-6 justify-center items-center'>
                      <button onClick={()=>{
                          setapprovals(false)
                          }} className=' flex  justify-start gap-5 px-4 text-xl semibold'>
                          <PiSignOutBold size={30}/>
                          Upload
                      </button>
                  </li>))
                
                }
                <li className='flex flex-col gap-6 p-6 justify-center items-center'>
                    <button onClick={()=>{
                        reset()
                        navigate("/")
                        }} className=' flex  justify-start gap-5 px-4 text-xl semibold'>
                        <PiSignOutBold size={30}/>
                        Sign Out
                    </button>
                </li>
            </ul>
        </div>
        {approvals? (
        <div className='mt-16 w-full flex justify-evenly items-start max-h-[100vh] overflow-scroll'>
            <div className='mt-20'>

              <span className='flex mx-3 my-5 gap-10 justify-start items-center'>
                  <h1 className='text-3xl font-bold'>Approved Magazines</h1>
              </span>
                  {approveddata.map((e)=>{
                    
                      return (
                        
                          <Card title={e.title} img={imgurl+e.images} link={e.pdfs} key={e._id} />
                        
                      )
                    
                  })}
              
              </div>
            <div className='mt-20' >

              <span className='flex mx-3 my-5 gap-10 justify-start items-center'>
                  <h1 className='text-3xl font-bold'>Unapproved Magazines</h1>
              </span>
              {alldata.filter(e => !e.isActive) // Filter elements where e.isActive is false
                  .map(e => (
                    <div onClick={() => { handleApproval(e._id)
                      setkey(prev=>!prev) }} key={key} className='w-[300px]'>
                      <Card title={e.title} img={imgurl + e.images} link={e.pdfs} key={e._id} />
                    </div>
                  ))}
              
              </div>
            
        </div>
        ):(
        <div className='mt-16 w-full flex justify-center items-start'>
            <form onSubmit={handleSubmit} className='w-[700px] h-auto flex flex-col items-center p-6 shadow-lg rounded-lg' >
                <label className='w-full text-lg semibold flex flex-col gap-2 px-3'>
                    <p className='font-bold'>Category</p>
                    <select className='border-[1px] border-[#C6C6C6] p-3 rounded-lg border-solid' name="category" value={formData.category} onChange={handleChange}>
                    <option value="news">News</option>
                    <option value="sports">Sports</option>
                    <option value="international">International</option>
                    </select>
                </label>

                <br />

                <label className='w-full text-lg semibold flex flex-col gap-2 px-3'>
                    <p className='font-bold'>Title</p>
                    <input className='border-[1px] border-[#C6C6C6] p-3 rounded-lg border-solid'
                    type="text"
                    name="title"
                    placeholder='Enter title'
                    value={formData.title}
                    onChange={handleChange}
                    />
                </label>

                <br />

                <label className='w-full text-lg semibold flex flex-col gap-2 px-3'>
                    <p className='font-bold'>Subtitle</p>
                    <input className='border-[1px] border-[#C6C6C6] p-3 rounded-lg border-solid'
                    type="text"
                    name="subtitle"
                    placeholder='Enter subtitle'
                    value={formData.subtitle}
                    onChange={handleChange}
                    />
                </label>

                <br />

                <label className='w-full text-lg semibold flex flex-col gap-2 px-3'>
                    <p className='font-bold'>Image</p>
                    <div className='border-[1px] border-[#C6C6C6] p-3 rounded-lg border-solid'>
                        <input 
                        type="file"
                        accept="image/*"
                        name="imageFile"
                        onChange={handleChange}
                        />
                        {formData.imageFile && (
                        <div>
                            <strong>Selected Image:</strong> {formData.imageFile.name}
                        </div>
                        )}
                    </div>
                </label>

                <br />

                <label className='w-full text-lg semibold flex flex-col gap-2 px-3'>
                    <p className='font-bold'>PDF</p>
                    <div className='border-[1px] border-[#C6C6C6] p-3 rounded-lg border-solid'>
                        <input
                        
                        type="file"
                        accept=".pdf"
                        name="pdfFile"
                        onChange={handleChange}
                        />
                        {formData.pdfFile && (
                        <div className='w-full'>
                            <strong>Selected PDF:</strong> {formData.pdfFile.name}
                        </div>
                        )}
                    </div>
                </label>

                <br />

                <button type="submit" className=' px-5 py-2 font-semibold  border-solid border-[1px] border-[#C6C6C6] rounded-lg'>Submit</button>
            </form>
        </div>)}
    </section>
  )
}

export default Admin