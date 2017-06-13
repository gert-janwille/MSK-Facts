import React from 'react';
import {object, func} from 'prop-types';

import {inject, observer} from 'mobx-react';

const Home = ({fact, getQRdata, scannedFact, createTour, savedFacts, tour, user, userInvites}) => {

  const handleChange = e => getQRdata(e);

  const handleClickTour = e => {
    e.preventDefault();
    //me, friends, random
    const value = document.querySelector(`input[type = number]`).value;
    createTour(`random`, savedFacts, user.id, value);
  };

  const makeTour = () => {
    if (!tour) return;

    return tour.map(i => {
      return <li key={Math.random(3)}>{i.name}</li>;
    });
  };

  const makeInvites = () => {
    if (!userInvites) return;
    return userInvites.map(i => {
      return <li key={Math.random(3)}>{i.email}</li>;
    });
  };

  return (
    <section>
      <p>{fact.fact}</p>
      <br />
      <form encType='multipart/form-data' method='post'>
        <input type='file' accept='image/*' onChange={handleChange} />
      </form>

      <br />

      <h1>Scanned Fact:</h1>
      <p>{scannedFact ? scannedFact.fact : ``}</p>

      <br />

      <button type='button' name='next' onClick={handleClickTour}>Friends Tour</button>

    <form action='post' onSubmit={handleClickTour}>
        <input type='number' />
        <input type='submit' />
      </form>

        <ul>
          {makeTour()}
        </ul>

        <ol>
          {makeInvites()}
        </ol>
    </section>
  );
};

Home.propTypes = {
  fact: object.isRequired,
  scannedFact: object.isRequired,
  savedFacts: object.isRequired,
  getQRdata: func.isRequired,
  createTour: func.isRequired,
  tour: object.isRequired,
  user: object.isRequired,
  userInvites: object.isRequired
};

export default inject(
  ({factStore, guideStore, userStore}) => ({
    fact: factStore.fact,
    getQRdata: factStore.getQRdata,
    scannedFact: factStore.scannedFact,
    savedFacts: userStore.savedFacts,
    createTour: guideStore.createTour,
    tour: guideStore.tour,
    user: userStore.user,
    userInvites: userStore.userInvites
  })
)(observer(Home));
