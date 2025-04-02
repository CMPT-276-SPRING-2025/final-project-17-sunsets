// NavBar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button.js';
import { FaUserCircle } from 'react-icons/fa';
import UserProfileModal from './UserProfileModal.js';

function NavBar() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <nav style={{ display: 'flex', alignItems: 'center' }}>
        <ul style={{ listStyle: 'none', display: 'flex', padding: 0, margin: 0, alignItems: 'center', width: '100%' }}>
          {/* User Icon on the far left */}
          <li style={{ marginRight: 'auto' }}>
            <FaUserCircle 
              size={30} 
              onClick={() => setShowModal(true)} 
              style={{ cursor: 'pointer' }} 
              title="User Profile"
            />
          </li>

          {/* Other Nav buttons to the right */}
          <li>
            <Link to="/">
              <Button name="Dashboard" />
            </Link>
          </li>
          <li>
            <Link to="/about">
              <Button name="Workouts" />
            </Link>
          </li>
          <li>
            <Link to="/weather">
              <Button name="Weather" />
            </Link>
          </li>
        </ul>
      </nav>
      {showModal && <UserProfileModal onClose={() => setShowModal(false)} />}
    </>
  );
}

export default NavBar;
