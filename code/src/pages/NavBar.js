import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button.js';
import { FaUserCircle, FaInfoCircle } from 'react-icons/fa';
import UserProfileModal from './UserProfileModal.js';
import WelcomeModal from './WelcomeModal.js';

function NavBar() {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  return (
    <>
      <nav style={{ display: 'flex', alignItems: 'center' }}>
        <ul
          style={{
            listStyle: 'none',
            display: 'flex',
            padding: 0,
            margin: 0,
            alignItems: 'center',
            width: '100%',
          }}
        >
          {/* User Icon on the far left */}
          <li style={{ marginRight: 'auto' }}>
            <FaUserCircle
              size={30}
              onClick={() => setShowProfileModal(true)}
              style={{ cursor: 'pointer' }}
              title="User Profile"
            />
          </li>

          {/* Navigation buttons center-right */}
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

          {/* Info icon on the far right */}
          <li style={{ marginLeft: '10px' }}>
            <FaInfoCircle
              size={26}
              onClick={() => setShowWelcomeModal(true)}
              style={{ cursor: 'pointer' }}
              title="Instructions"
            />
          </li>
        </ul>
      </nav>

      {/* Modals */}
      {showProfileModal && <UserProfileModal onClose={() => setShowProfileModal(false)} />}
      {showWelcomeModal && <WelcomeModal onClose={() => setShowWelcomeModal(false)} />}
    </>
  );
}

export default NavBar;
