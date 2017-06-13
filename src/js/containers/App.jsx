import React from 'react';
import {func, object} from 'prop-types';

import {inject, observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import {Route} from 'react-router-dom';
import Home from './Home';

const App = ({login, user, pickRandom, saveFact, fact, savedFacts}) => {
  const handleClick = e => {
    e.preventDefault();
    login();
  };

  const handleClickFact = e => {
    e.preventDefault();
    pickRandom();
  };

  const handleClickSave = e => {
    e.preventDefault();
    saveFact(fact._id, `add`);
  };

  const handleClickDelete = e => {
    e.preventDefault();
    saveFact(fact._id, `remove`);
  };

  const tryf = () => {
    if (!savedFacts) return;

    return savedFacts.map(i => {
      return <li key={user._id + Math.random(3)}>{i.fact}</li>;
    });
  };

  return (
    <section>

      {process.env.NODE_ENV !== `production` ? <DevTools /> : null}

      <header>
        <h1>Hello, {user ? user.firstName : ``} {user ? user.lastName : ``}</h1>
        <button type='button' name='login' onClick={handleClick}>Login with Facebook</button>
        <br /><br />

        <button type='button' name='save' onClick={handleClickSave}>Save</button>
        <button type='button' name='next' onClick={handleClickFact}>Next</button>
        <button type='button' name='next' onClick={handleClickDelete}>Delete</button>

        <ol>
          {tryf()}
        </ol>


      </header>

      <section>
        <Route exact path='/' component={Home} />
      </section>

    </section>
  );
};

App.propTypes = {
  login: func.isRequired,
  user: object.isRequired,
  pickRandom: func.isRequired,
  saveFact: func.isRequired,
  fact: object.isRequired,
  savedFacts: object.isRequired
};

export default inject(
  ({userStore, factStore}) => ({
    savedFacts: userStore.savedFacts,
    fact: factStore.fact,
    saveFact: userStore.saveFact,
    pickRandom: factStore.pickRandom,
    login: userStore.login,
    user: userStore.user
  })
)(observer(App));
