import React from 'react';
import {inject, observer} from 'mobx-react';
import {func, string} from 'prop-types';

const Popup = () => {

  return (
    <section className='popup-screen'>
      <p className='main-paragraf'>Er werd een verzoek gestuurd naar 2 van jouw Vrienden. Als deze geaccepteerd worden krijgen jullie elkaars namen zodat jullie contact kunnen opnemen met elkaar.</p>
      <a href='' className='main-button red-button'>Scan!</a>
      <a href='http://mskgent.be' className='main-button red-button'>Koop een Ticket</a>
    </section>
  );
};

Popup.propTypes = {
  setPopUp: func.isRequired,
  screen: string.isRequired
};

export default inject(
  ({guideStore}) => ({
    setPopUp: guideStore.setPopUp
  })
)(observer(Popup));
