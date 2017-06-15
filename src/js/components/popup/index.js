/* eslint-disable react/jsx-filename-extension *//* eslint-disable react/no-multi-comp */

import React from 'react';
import {inject, observer} from 'mobx-react';
import {func, string} from 'prop-types';

import LoginRequired from './LoginRequired';

import Tour from './tour/TourCompagnie';
import SendInvitation from './tour/SendInvitation';
import PickRandom from './tour/PickRandom';

import ChooseOption from '../notification/ChooseOption';
import NotAccepted from '../notification/NotAccepted';

const Popup = ({setPopUp, popscreen}) => {

  const handleClickClose = () => {
    setPopUp(false);
  };

  const renderScreen = () => {
    switch (popscreen) {
    case `login`:
      return <LoginRequired />;
    case `tour`:
      return <Tour />;
    case `sentInvite`:
      return <SendInvitation />;
    case `pickPersons`:
      return <PickRandom />;
    case `notifications`:
      return <ChooseOption />;
    case `notAccept`:
      return <NotAccepted />;
    }
  };

  return (
    <section className='popup-container'>
      <div className='close-popup-screen round-button' onClick={handleClickClose}>
        <span className='hidden'>X</span>
      </div>

      {renderScreen()}

  </section>
  );
};

Popup.propTypes = {
  setPopUp: func.isRequired,
  popscreen: string.isRequired
};

export default inject(
  ({guideStore}) => ({
    setPopUp: guideStore.setPopUp
  })
)(observer(Popup));
