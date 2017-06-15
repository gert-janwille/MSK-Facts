import React from 'react';
import {inject, observer} from 'mobx-react';
import {func} from 'prop-types';

const LoginRequired = ({login, setPopUp}) => {

  const handleClickLogin = e => {
    e.preventDefault();
    login();
    setPopUp(false);
  };

  return (
      <section className='popup-screen'>
        <p className='main-paragraf'>Je moet eerst inloggen om weetjes te kunnen opslaan.</p>
        <a href='' className='main-button red-button' onClick={handleClickLogin}>Login met Facebook</a>
      </section>
  );
};

LoginRequired.propTypes = {
  login: func.isRequired,
  setPopUp: func.isRequired
};

export default inject(
  ({userStore, guideStore}) => ({
    login: userStore.login,
    setPopUp: guideStore.setPopUp
  })
)(observer(LoginRequired));
