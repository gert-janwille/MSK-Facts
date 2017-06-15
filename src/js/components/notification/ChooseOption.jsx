import React from 'react';
import {Link} from 'react-router-dom';
import {inject, observer, PropTypes} from 'mobx-react';
import {func, string} from 'prop-types';

const Notification = ({setScreen, setPopUp, savedFacts, fbid, createTour, removeNotification}) => {

  const handleClickAccept = () => {
    setPopUp(false);
    createTour(`Eigen rondleiding`, savedFacts, fbid);
  };

  const handleClickDeny = e => {
    e.preventDefault();
    removeNotification();
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
  setPopUp: func.isRequired,
  createTour: func.isRequired,
  savedFacts: PropTypes.observableArray.isRequired,
  fbid: string.isRequired,
  removeNotification: func.isRequired
};

export default inject(
  ({guideStore, userStore}) => ({
    setScreen: guideStore.setScreen,
    setPopUp: guideStore.setPopUp,
    createTour: guideStore.createTour,
    savedFacts: userStore.savedFacts,
    fbid: userStore.fbid,
    removeNotification: userStore.removeNotification
  })
)(observer(Notification));
