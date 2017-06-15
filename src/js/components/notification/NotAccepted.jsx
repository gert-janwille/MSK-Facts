import React from 'react';
import {inject, observer} from 'mobx-react';
import {func} from 'prop-types';

const Notification = ({setScreen, setPopUp}) => {

  const handleClickYes = e => {
    e.preventDefault();
    setScreen(`tour`);
  };

  const handleClickNo = e => {
    e.preventDefault();
    setPopUp(false);
  };

  return (
    <section className='popup-screen'>
      <p className='main-paragraf'>Je accepteerde het verzoek niet, wil je zelf al een rondleiding laten samenstellen met jouw weetjes?</p>
      <a href='' className='main-button red-button' onClick={handleClickYes}>Ja</a>
      <a href='' className='main-button red-button' onClick={handleClickNo}>Nee</a>
    </section>
  );
};

Notification.propTypes = {
  setScreen: func.isRequired,
  setPopUp: func.isRequired
};

export default inject(
  ({guideStore}) => ({
    setScreen: guideStore.setScreen,
    setPopUp: guideStore.setPopUp
  })
)(observer(Notification));
