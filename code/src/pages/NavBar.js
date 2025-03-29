// NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button.js'; // Adjust path if necessary

function NavBar() {
  return (
    <nav>
      <ul>
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
  );
}

export default NavBar;
