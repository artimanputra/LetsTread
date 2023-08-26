import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'
import { useLocation } from 'react-router-dom'
import Home from './Home/Home'

const Header = () => {
  const location = useLocation();
  
  function my() {
    console.log(location.pathname);
    if(location.pathname==='/'){
      return 'Home';
    }
    else if(location.pathname==='/about'){
      return 'About';
    }
    else if(location.pathname==='/dashboard'){
      return 'Dashboard';
    }
    else if(location.pathname==='/courses'){
      return 'Course';
    }
    else if(location.pathname==='/courses'){
      return 'Course';
    }
    else{
      return '404';
    }
  }  
  return (
    <div className=' bg-[#09092c] text-white font-bold py-2 px-4 flex justify-between'>
      <Link to='/'><img src={logo} className=" h-14 ml-3" alt="logo" /></Link>
      <div className='flex justify-center static w-full'>
        <div className=' m-1 px-20 bg-slate-50 rounded-full text-[#216825] py-2 text-center text-2xl max-sm:px-6'>{my()}</div>
      </div>
    </div>
  )
}

export default Header;