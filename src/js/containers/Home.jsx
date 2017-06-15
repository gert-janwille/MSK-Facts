import React from 'react';
import {func} from 'prop-types';

import {inject, observer} from 'mobx-react';
// import {isEmpty} from 'lodash';

import Fact from '../components/facts/Fact';

const Home = ({pickRandom, setScreen}) => {

  const handleClickFact = e => {
    e.preventDefault();
    pickRandom();
  };

  const handleClickTour = e => {
    e.preventDefault();
    setScreen(`tour`);
  };

  return (
    <section className='fact-page'>

      <section className='fact'>
        <Fact />
        <a href='#' className='main-button red-button' onClick={handleClickFact}>Nog meer weetjes?</a>
      </section>

      <section className='functional-container'>
        <div className='functional-item tour'>
          <h1 className='functional-title'>Maak jouw eigen rondleiding.</h1>
          <p className='functional-text'>Maak een eigen gepersonaliseerde rondleiding met jouw <em>favoriete weetjes</em></p>
          <a href='' className='main-button white-button' onClick={handleClickTour}>Stel rondleiding samen</a>
        </div>
        <div className='functional-item visit'>
          <h1 className='functional-title'>Meer weetjes? Bezoek het MSK.</h1>
          <p className='functional-text'>500 jaar kunst in 40 zalen.</p>
          <a href='https://www.mskgent.be' className='main-button white-button'>Koop tickets</a>
        </div>
      </section>
    </section>
  );
};

Home.propTypes = {
  pickRandom: func.isRequired,
  setScreen: func.isRequired
};

export default inject(
  ({factStore, guideStore}) => ({
    pickRandom: factStore.pickRandom,
    setScreen: guideStore.setScreen
  })
)(observer(Home));
