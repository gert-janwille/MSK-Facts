import React from 'react';
import {Link} from 'react-router-dom';
import {inject, observer, PropTypes} from 'mobx-react';
import {func, number, string} from 'prop-types';

const PickRandom = ({increse, decrese, randomPersons, maxPersons, createTour, fbid, savedFacts, setPopUp}) => {

  const handleClickMore = () => increse();
  const handleClickLess = () => decrese();

  const handleClickMakeTour = e => {
    createTour(e.target.innerHTML, savedFacts, fbid, randomPersons);
    setPopUp(false);
  };

  return (
    <section className='popup-screen'>
      <p className='main-paragraf'>{`We vonden ${maxPersons} personen met dezelfde weetjes. Met hoeveel personen wil je een rondleiding?`}</p>

      <div className='friends-amount-container'>
        <div className='friends-change-amount' onClick={handleClickLess}>-</div>
        <p className='friends-amount'>{randomPersons}</p>
        <div className='friends-change-amount' onClick={handleClickMore}>+</div>
      </div>

      <Link to={`/mytour`} className='main-button red-button' onClick={handleClickMakeTour}>Stel rondleiding samen</Link>
    </section>
  );
};

PickRandom.propTypes = {
  increse: func.isRequired,
  decrese: func.isRequired,
  randomPersons: number.isRequired,
  maxPersons: number.isRequired,
  createTour: func.isRequired,
  fbid: string.isRequired,
  savedFacts: PropTypes.observableArray.isRequired,
  setPopUp: func.isRequired
};

export default inject(
  ({guideStore, userStore}) => ({
    increse: guideStore.increse,
    decrese: guideStore.decrese,
    randomPersons: guideStore.randomPersons,
    maxPersons: guideStore.maxPersons,
    createTour: guideStore.createTour,
    fbid: userStore.fbid,
    savedFacts: userStore.savedFacts,
    setPopUp: guideStore.setPopUp
  })
)(observer(PickRandom));
