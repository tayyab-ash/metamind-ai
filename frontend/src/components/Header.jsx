import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { NavLink } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { useAppStore } from '@/Context/Zustand';
const navLinks = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Simulator",
    link: "/simulation",
  },
  // {
  //   name: "Feedback",
  //   link: "/feedback",
  // },
  {
    name: "Report",
    link: "/reports",
  },
  {
    name: "Log Out",
    link: "/login",
  },

];
const Header = () => {
  const input = useAppStore((state) => state.input);
  console.log(input)
  const location = useLocation()  
  return (
   <header className={`${(location.pathname==='/login' || location.pathname==='/signup') ? 'hidden' :'flex' } container justify-start md:justify-between mt-8 mx-auto `}>
    <div className='md:hidden'>
    <Sidebar/>
    </div>
    <h1 className=' text-2xl md:text-4xl font-bold text-gray-100'>MetaMindAI</h1>
   <nav className='md:flex hidden gap-4 text-gray-300'>
   {navLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.link}
                className={({ isActive }) =>
                  `transition-all ease-in duration-100 cursor-pointer text-gray-200 p-1 sm:p-3 text-sm sm:text-base lg:text-xl rounded-md sm:rounded-full px-3 lg:px-6 hover:backdrop-blur-md ${
                    isActive
                      ? " text-teal-900 bg-white/75 font-semibold  " // Active styles
                      : "hover:bg-gradient-to-r hover:from-white/20 hover:to-white/10"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
   </nav> 
   </header>
  )
}

export default Header