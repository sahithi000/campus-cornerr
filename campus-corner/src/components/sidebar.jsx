import React, { useState } from "react";
import { FaThList, FaRegCalendarCheck, FaHome, FaUser } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import "./Sidebar.css";

function Sidebar({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const navigate = useNavigate(); // Initialize navigate function

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login' // Use navigate to redirect to the login page
  };

  const menuItem = [
    {
      path: "/home",
      name: "Home",
      icon: <FaHome />,
    },
    {
      path: "/events",
      name: "Events",
      icon: <FaRegCalendarCheck />,
    },
    {
      path: "/profile",
      name: "Profile",
      icon: <FaUser />,
    },
    {
      path: "/about",
      name: "Creators",
      icon: <RiTeamFill />,
    },
    {
      path: "#",
      name: "Log Out",
      icon: <MdOutlineLogout />,
      action: handleLogout, // Add action to logout menu item
    },
  ];

  return (
    <div className="container">
      <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
        <div className="top">
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bar">
            <FaThList onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <div
            key={index}
            className="link"
            onClick={item.action ? item.action : null}
          >
            <NavLink
              to={item.path}
              className="link"
              activeClassName="active"
            >
              <div className="icon">{item.icon}</div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="text"
              >
                {item.name}
              </div>
            </NavLink>
          </div>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
}

export default Sidebar;

// import React, { Children, useState } from "react";
// import { FaThList, FaRegCalendarCheck, FaHome, FaUser } from "react-icons/fa";
// import { RiTeamFill } from "react-icons/ri";
// import { Link, NavLink } from "react-router-dom";
// import { MdOutlineLogout } from "react-icons/md";
// import "./Sidebar.css";
// function Sidebar({ children }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggle = () => setIsOpen(!isOpen);
//   const menuItem = [
//     {
//       Path: "/home",
//       name: "Home",
//       icon: <FaHome />,
//     },
//     {
//       Path: "/events",
//       name: "Events",
//       icon: <FaRegCalendarCheck />,
//     },
//     {
//       Path: "/profile",
//       name: "Profile",
//       icon: <FaUser />,
//     },
//     {
//       Path: "/about",
//       name: "Creators",
//       icon: <RiTeamFill />,
//     },
//     {
//       Path: "/login",
//       name: "Log Out",
//       icon: <MdOutlineLogout />,
//     },
//   ];
//   return (
//     <div className="container">
//       <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
//         <div className="top">
//           <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bar">
//             <FaThList onClick={toggle} />
//           </div>
//         </div>
//         {menuItem.map((item, index) => (
//           <NavLink
//             to={item.Path}
//             key={index}
//             className="link"
//             activeclassName="active"
//           >
//             <div className="icon">{item.icon}</div>
//             <div
//               style={{ display: isOpen ? "block" : "None" }}
//               className="text"
//             >
//               {item.name}
//             </div>
//           </NavLink>
//         ))}
//       </div>
//       <main>{children}</main>
//     </div>
//   );
// }
// export default Sidebar;