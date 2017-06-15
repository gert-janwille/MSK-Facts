import React from 'react';
import {Link} from 'react-router-dom';
import {inject, observer, PropTypes} from 'mobx-react';

import {func, object} from 'prop-types';
import {isEmpty} from 'lodash';

const SelectFriends = ({createTour, savedFacts, user, setScreen, requestFriends, friends}) => {

  const handleInvite = e => {
    e.preventDefault();
    const colorstyle = e.target.style.color;

    if (isEmpty(colorstyle) || colorstyle === `black`) {
      e.target.style.color = `tomato`;
    } else {
      e.target.style.color = `black`;
    }
    requestFriends(e.target.id, user.id, savedFacts);
  };

  const handleClickNext = () => {
    setScreen(`sentInvite`);
    createTour(`Met vrienden`, savedFacts, user.id);
  };

  const generateFriends = () => {
    if (!friends) return;
    return friends.map(i => {
      return <li key={i.id} id={i.id} onClick={handleInvite}>{i.name}</li>;
    });
  };

  return (
    <section className='popup-screen'>
      <ul className='friends-container'>
        {generateFriends()}
      </ul>
      <a className='main-button red-button' onClick={handleClickNext}>Vrienden uitnodigen</a>
    </section>
  );
};

SelectFriends.propTypes = {
  createTour: func.isRequired,
  user: object.isRequired,
  savedFacts: object.isRequired,
  setScreen: func.isRequired,
  requestFriends: func.isRequired,
  friends: PropTypes.observableArray.isRequired
};

export default inject(
  ({guideStore, userStore}) => ({
    createTour: guideStore.createTour,
    user: userStore.user,
    savedFacts: userStore.savedFacts,
    setScreen: guideStore.setScreen,
    setPopUp: guideStore.setPopUp,
    requestFriends: guideStore.requestFriends,
    friends: guideStore.friends
  })
)(observer(SelectFriends));
