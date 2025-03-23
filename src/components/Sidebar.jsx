import React, { useState } from 'react';
import { SidebarData } from '../Data/Data';
import { UilSignOutAlt } from '@iconscout/react-unicons';
import './Sidebar.css';
import Logo from '../imgs/logo.png';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="Sidebar">
      <div className="logo">
        <img src={Logo} alt="logo" />
        <span>
          Nir<span>bho</span>ya
        </span>
      </div>

      {/* Menu */}
      <div className="menu">
        {SidebarData.map((item, index) => (
          <Link to={item.link} key={index} className="menuItem">
            <div
              className={selected === index ? 'menuItem active' : 'menuItem'}
              onClick={() => setSelected(index)}
            >
              <item.icon />
              <span>{item.heading}</span>
            </div>
          </Link>
        ))}

        {/* Logout Button */}
        <div className="menuItem">
          <UilSignOutAlt />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
