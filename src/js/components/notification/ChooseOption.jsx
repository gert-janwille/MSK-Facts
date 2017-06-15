import React from 'react';
import {Link} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import {func} from 'prop-types';

const Notification = ({setScreen, setPopUp}) => {

  const handleClickAccept = () => setPopUp(false);

  const handleClickDeny = e => {
    e.preventDefault();
    setScreen(`notAccept`);
  };

  return (
    <section className='popup-screen'>
      <p className='main-paragraf'>Er zond jou iemand een verzoek om samen met 2 andere personen een rondleiding te maken. Accepteer het verzoek om deze mensen te ontmoeten.</p>
      <Link to={`/mytour`} className='main-button red-button' onClick={handleClickAccept}>Accepteren</Link>
      <a href='' className='main-button red-button' onClick={handleClickDeny}>Niet Accepteren</a>
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
