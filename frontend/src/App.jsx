import { useEffect, useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route, redirect} from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import Card from './components/hero/components/Card'
import SimpleSlider from './components/hero/components/Slider'
import Category from './pages/Category'
import Pdfreadertest from './components/pdfreader/Pdfreadertest'
import { pdfjs } from "react-pdf";
import { FaRegUserCircle } from "react-icons/fa";
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import BannerCard from './components/hero/components/BannerCard'


import { useUserStore } from './store/Userdetails'
import Admin from './pages/Admin'
import MagSelection from './pages/MagSelection'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function App() {

  const pageurl=location.href.split('/')[3]

  const [toggleMenu, setToggleMenu] = useState(true)
  const url=import.meta.env.VITE_REACT_API_URL+"all/magzine"
  const [name,setName] = useUserStore((state)=>[state.name,state.setName])
  const [role,setRole] = useUserStore((state)=>[state.role,state.setRole])
  const [data,setData] = useUserStore((state)=>[state.data,state.setData])
  const token = useUserStore((state)=>state.token)
  const setReset = useUserStore((state)=>state.reset)
  

  const dropdownToggle = () => {
    setToggleMenu(prev=>!prev)
    let list = document.querySelector('ul');
    toggleMenu ? (list.classList.add('top-[80px]') , list.classList.add('opacity-100')) :(list.classList.remove('top-[80px]'),list.classList.remove('opacity-100'))
    let list2 = document.querySelector('nav');
    toggleMenu ? (list2.classList.add('sticky') ) :(list2.classList.remove('sticky'))
  }


  useEffect(()=>{
    
    const fetchData = async () => {
      

      try {
        const response = await fetch(url, {
          method: 'GET',
          
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        // console.log(result.data)
        setData(result.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    
    fetchData();
      },[])

  

  return (
    <div className='m-0 p-0 w-full h-auto bg-transparent '>
      <nav className={(pageurl=="")?'sticky sm:absolute md:absolute  z-50 w-full md:flex md:justify-between md:items-center ps-10 pe-10 p-2 bg-white sm:bg-transparent md:bg-transparent shadow':'absolute z-50 w-full md:flex md:justify-between bg-slate-200 md:items-center ps-10 pe-10 p-2 bg-transparent shadow'}>
        <div className='flex justify-between items-center md:block'>
          <a href="/">
          <span className='text-2xl flex justify-center items-center font-[poppins] cursor-pointer'>
            <img src="/logo-text.PNG" className='h-7 inline ' />
          </span>
          </a>

          <span class="text-3xl cursor-pointer mx-2 md:hidden block">
            <div onClick={()=>{dropdownToggle()}}>
              {toggleMenu?<IoMenu />:<IoMdClose/>}
            </div>
          </span>
        </div>
        
        <ul className='flex flex-col gap-5 justify-center md:opacity-100 opacity-0 md:flex md:flex-row transition-all ease-in bg-white sm:bg-transparent md:bg-transparent dura md:gap-8 z-[1] md:z-auto md:static absolute  left-0 w-full md:w-auto  md:py-0 py-4 md:pl-0 pl-7 items-center'>
        {(name==="") ? (
          <>
          <li>
            <a href="/signin" className={(pageurl=="")?'text-xl text-[#F55D5A] sm:text-[#e3e3e3] md:text-[#e3e3e3] cursor-pointer':'text-xl text-[#F55D5A] cursor-pointer'}>Sign In</a>
          </li>
          <li>
            <a href="/signup" className={(pageurl=="")?'text-xl text-[#F55D5A] sm:text-[#e3e3e3] md:text-[#e3e3e3] cursor-pointer':'text-xl text-[#F55D5A] cursor-pointer'}>
              <button className={(pageurl=="")?'text-xl text-[#F55D5A] sm:text-[#e3e3e3] md:text-[#e3e3e3] cursor-pointer p-3 ps-4 pe-4 rounded-md  ':'text-xl text-[#F55D5A] cursor-pointer p-3 ps-4 pe-4 rounded-md '} >
                Sign Up
              </button>
            </a>
          </li>
          </>
        ):(<>
          {(role==="admin" || role==="superadmin") &&  (
            <li>
            <a href="/admin" className='text-xl text-[#F55D5A] cursor-pointer'>dashboard</a>
          </li>)}
          <button onClick={()=>{setReset()
          }} className='p-3 ps-4 pe-4 text-[#F55D5A] text-xl rounded-md cursor-pointer' >
            Log Out
          </button>
          <FaRegUserCircle size={40} />
        </>)}
        </ul>
      </nav>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/signin' element={<SignIn/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/forgotpassword' element={<ForgotPassword/>} />
          <Route path='/resetpassword' element={<ResetPassword/>} />
          <Route path='/card/:category' element={<Category/>} />
          <Route path='/readertest/:pdf' element={<Pdfreadertest/>} />
          <Route path='/admin' element={<Admin/>} />
          <Route path='/terms' element={<Terms/>} />
          <Route path='/privacy' element={<Privacy/>} />
          <Route path='/test/:title/:subtitle/:img/:link/:category' element={<MagSelection/>} />
        </Routes>
      </Router>

      

    


    

      <footer class="bg-[#000000]">
          <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
              <div class="md:flex md:justify-between">
                <div class="mb-6 md:mb-0">
                    <a href="#" class="flex items-center">
                        <span class="self-center text-2xl font-semibold whitespace-nowrap text-white "><img src="logo.PNG" className='h-[200px]' /></span>
                    </a>
                </div>
                <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                    
                    <div>
                        <h2 class="mb-6 text-sm font-semibold  uppercase text-white">Contact Us</h2>
                        <ul class=" text-gray-400 font-medium">
                            <li class="mb-4">
                                <a href="mailto:basavanindia@gmail.com" target='_blank' class="hover:underline ">Email</a>
                            </li>
                            
                        </ul>
                    </div>
                    <div>
                        <h2 class="mb-6 text-sm font-semibold  uppercase text-white">Follow us</h2>
                        <ul class=" text-gray-400 font-medium">
                            <li class="mb-4">
                                <a href="https://www.facebook.com/basavanindia?mibextid=eHce3h" target='_blank' class="hover:underline ">Facebook</a>
                            </li>
                            <li>
                                <a href="https://x.com/BasavanIndia?t=azZwwCO8dUXYoJVIMqjNaA&s=09" target='_blank' class="hover:underline">Twitter</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 class="mb-6 text-sm font-semibold  uppercase text-white">Legal</h2>
                        <ul class=" text-gray-400 font-medium">
                            <li class="mb-4">
                                <a href="/privacy" class="hover:underline">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="/terms" class="hover:underline">Terms &amp; Conditions</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div className='w-full h-[1px] bg-white my-4'></div>

            <div class="sm:flex sm:items-center sm:justify-between">
                <span class="text-sm  sm:text-center text-gray-400">© 2023 <a href="https://flowbite.com/" class="hover:underline">Basavan India</a>. All Rights Reserved.
                </span>
                <div class="flex gap-3 mt-4 sm:justify-center items-center sm:mt-0">
                    <span class="  text-white" >basavanindia@gmail.com</span>
                    <a href="https://www.facebook.com/basavanindia?mibextid=eHce3h" class=" text-white">
                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                              <path fill-rule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clip-rule="evenodd"/>
                          </svg>
                        <span class="sr-only">Facebook page</span>
                    </a>
                    
                    <a href="https://x.com/BasavanIndia?t=azZwwCO8dUXYoJVIMqjNaA&s=09" class=" text-white ms-5">
                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                          <path fill-rule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clip-rule="evenodd"/>
                      </svg>
                        <span class="sr-only">Twitter page</span>
                    </a>
                    
                </div>
            </div>
          </div>
      </footer>


    </div>
  )
}

export default App
