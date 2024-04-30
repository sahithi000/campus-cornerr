import React, { Children, useState } from 'react'
import {FaThList,FaRegCalendarCheck,FaHome,FaUser}from "react-icons/fa";
import { Link, NavLink } from 'react-router-dom';
import { MdOutlineLogout } from "react-icons/md";
export default function Sidebar({children}) {
  const[isOpen,setIsOpen]=useState(false)
  const toggle=()=>setIsOpen(!isOpen)
    const menuItem=[
      {
      Path:'/',
      name:"Home",
      icon:<FaHome />
    },
    {
      Path:'/events',
      name:"Events",
      icon:<FaRegCalendarCheck />
    },
    {
      Path:'/profile',
      name:"Profile",
      icon:<FaUser />
    },
    {
      Path:'/logout',
      name:"Log Out",
      icon:<MdOutlineLogout />
    },
    
  
  ]
    return (
    <div className='container'>
      <div style={{width: isOpen ? "200px" : "50px"}} className='sidebar'>
        <div className='top'>
          <div style={{marginLeft: isOpen ? "50px" : "0px"}} className='bar'>
          <FaThList onClick={toggle}/>
          </div>
        </div>
        {
          menuItem.map((item,index)=>(
          <NavLink to={item.Path} key={index} className="link" activeclassName="active">
            <div className='icon'>{item.icon}</div>
            <div style={{display: isOpen ? "block" : "None"}} className="text">{item.name}</div>
          </NavLink>
          ))
        }
      </div>
      <main>{children}</main>
    </div>
  );
};
