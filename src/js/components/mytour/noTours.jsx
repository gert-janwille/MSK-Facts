import React from 'react';
import {func} from 'prop-types';
import {inject, observer} from 'mobx-react';

const noTours = ({setScreen}) => {

  const handleClick = e => {
    e.preventDefault();
    setScreen(`tour`);
  };

  return (
    <section className='tour-page page'>
      <p className='main-paragraf'>Bekijk de status van jouw rondleiding.</p>
      <a href='#' className='main-button' onClick={handleClick}>Stel rondleiding samen</a>
    </section>
  );
};

noTours.propTypes = {
  setScreen: func.isRequired
};

export default inject(
  ({guideStore}) => ({
    setScreen: guideStore.setScreen
  })
)(observer(noTours));
