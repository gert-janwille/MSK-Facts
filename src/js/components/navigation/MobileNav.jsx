import React from 'react';
import {Link} from 'react-router-dom';

import {inject, observer} from 'mobx-react';
import {func} from 'prop-types';


const MobileNav = ({getQRdata, setScreen}) => {

  const handleChange = e => {
    e.preventDefault();
    getQRdata(e);
    setScreen(`scanned`);
  };

  return (
    <nav className='mobile-nav'>
      <label htmlFor='scan' href='' className='scan-button'>
        <form encType='multipart/form-data' method='post'>
          <input type='file' accept='image/*' onChange={handleChange} />
        </form>
        <span className='hidden'>scan</span>
      </label>

      <ul className='mobile-nav-container'>
        <li className='mobile-nav-item'><Link to={`/favorites`} href='' className='mobile-nav-link favorite-button'>Favotieten</Link></li>
        <li className='mobile-nav-item'><Link to={`/`} href='' className='mobile-nav-link home-button'>Home</Link></li>
        <li className='mobile-nav-item'><Link to={`/mytour`} className='mobile-nav-link tour-button'>Rondleiding</Link></li>
      </ul>
    </nav>
  );
};

MobileNav.propTypes = {
  getQRdata: func.isRequired,
  setScreen: func.isRequired
};


export default inject(
  ({factStore, guideStore}) => ({
    getQRdata: factStore.getQRdata,
    setScreen: guideStore.setScreen
  })
  )(observer(MobileNav));
