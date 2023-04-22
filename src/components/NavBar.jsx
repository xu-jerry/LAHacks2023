import React from 'react';
import { Link } from 'react-router-dom';

// Navigation Bar component used to navigate to different pages

function NavBar() {
  return (
    <div>
      <Link to="/example">
        Example
      </Link>
    </div>
  );
}

export default NavBar;
