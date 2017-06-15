import React from 'react';
import {Link} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import {func, object} from 'prop-types';

const TourCompagnie = ({createTour, savedFacts, user, setScreen, setPopUp, getFriends}) => {

  const handleClickComp = e => {
    e.preventDefault();
    switch (e.target.innerHTML) {
    case `Eigen rondleiding`:
      createTour(e.target.innerHTML, savedFacts, user.id);
      setPopUp(false);
      break;
    case `Met vrienden`:
      setScreen(`selectFriends`);
      getFriends();
      break;
    case `Verras mij!`:
      setScreen(`pickPersons`);
      break;

    }
  };

  return (
    <section className='popup-screen'>
      <p className='main-paragraf'>Stel je eigen rondleiding samen met jouw opgeslagen weetjes.</p>
      <Link to={`/mytour`} className='main-button red-button' onClick={handleClickComp}>Eigen rondleiding</Link>
      <a className='main-button red-button' onClick={handleClickComp}>Met vrienden</a>
      <a className='main-button red-button' onClick={handleClickComp}>Verras mij!</a>
    </section>
  );
};

TourCompagnie.propTypes = {
  createTour: func.isRequired,
  user: object.isRequired,
  savedFacts: object.isRequired,
  setScreen: func.isRequired,
  setPopUp: func.isRequired,
  getFriends: func.isRequired
};

export default inject(
  ({guideStore, userStore}) => ({
    createTour: guideStore.createTour,
    user: userStore.user,
    savedFacts: userStore.savedFacts,
    setScreen: guideStore.setScreen,
    setPopUp: guideStore.setPopUp,
    getFriends: guideStore.getFriends
  })
)(observer(TourCompagnie));
