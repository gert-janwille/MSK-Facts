import React from 'react';
import {Link} from 'react-router-dom';
import {object} from 'prop-types';

import {inject, observer} from 'mobx-react';

const SideBar = ({user}) => (
  <header className={window.location.pathname === `/mytour` ? `header-tour mobile` : `mobile`}>
    <div className='logo'>
      <span className='hidden'>Museum voor Schone Kunsten</span>
    </div>
    <div className='sticker'>
      <h1 className='hidden'>Wist je dat...</h1>
    </div>


    <nav className='desktop-nav'>
      <ul className='nav-list'>
        <li className='nav-item'><Link to={`/`} className='nav-link'>Home</Link></li>
        <li className='nav-item'><Link to={`/favorites`} className='nav-link'>Favoriete Weetjes</Link></li>
        <li className='nav-item'><Link to={`/mytour`} className='nav-link'>Jouw Rondleiding</Link></li>
      </ul>
    </nav>

    <h1 className='login-name'>Hello, {user ? user.firstName : ``} {user ? user.lastName : ``}</h1>


  </header>

  );

SideBar.propTypes = {
  user: object.isRequired
};

export default inject(
    ({userStore}) => ({
      user: userStore.user
    })
  )(observer(SideBar));
