import React from 'react';
import {object, func} from 'prop-types';
import {isEmpty} from 'lodash';

import FavoFact from '../components/facts/FavoFact';

import {inject, observer} from 'mobx-react';


const Favorites = ({savedFacts, setScreen}) => {

  const handleClickTour = e => {
    e.preventDefault();
    setScreen(`tour`);
  };

  return (
    <section className='fact-page'>
      <section className='favorites-page'>

        <section className='top-banner'>
          <p className='banner-text'>Je hebt al enkele weetjes opgeslagen, wil je al een rondleiding samenstellen?</p>
          <a className='main-button white-button' onClick={handleClickTour}>Stel rondleiding samen</a>
        </section>

        <section className='favorites-container'>
          {isEmpty(savedFacts) ? <h1>Je hebt nog geen weetjes bewaard.</h1> : savedFacts.map(f => <FavoFact {...f} key={f._id} />)}
        </section>

      </section>
    </section>
  );
};

Favorites.propTypes = {
  savedFacts: object.isRequired,
  setScreen: func.isRequired
};

export default inject(
  ({userStore, guideStore}) => ({
    savedFacts: userStore.savedFacts,
    setScreen: guideStore.setScreen
  })
)(observer(Favorites));
