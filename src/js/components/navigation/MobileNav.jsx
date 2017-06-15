import React from 'react';
import {Link} from 'react-router-dom';

const MobileNav = () => (
  <nav className='mobile-nav'>
    <a href='' className='scan-button'><span className='hidden'>scan</span></a>
    <ul className='mobile-nav-container'>
      <li className='mobile-nav-item'><Link to={`/favorites`} href='' className='mobile-nav-link favorite-button'>Favotieten</Link></li>
      <li className='mobile-nav-item'><Link to={`/`} href='' className='mobile-nav-link home-button'>Home</Link></li>
      <li className='mobile-nav-item'><Link to={`/mytour`} className='mobile-nav-link tour-button'>Rondleiding</Link></li>
    </ul>
  </nav>
  );

export default MobileNav;
