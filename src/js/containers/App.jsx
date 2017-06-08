import React from 'react';
import {func, object} from 'prop-types';

import {inject, observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import {Route} from 'react-router-dom';
import Home from './Home';

const App = ({login, user}) => {
  const handleClick = e => {
    e.preventDefault();
    login();
  };

  return (
    <section>

      {process.env.NODE_ENV !== `production` ? <DevTools /> : null}

      <header>
        <h1>Hello, {user.firstName} {user.lastName}</h1>
        <button type='button' name='login' onClick={handleClick}>Login with Facebook</button>

      </header>

      <section>
        <Route
          exact path='/'
          component={Home}
        />
      </section>

    </section>
  );
};

App.propTypes = {
  login: func.isRequired,
  user: object.isRequired
};

export default inject(
  ({userStore}) => ({
    login: userStore.login,
    user: userStore.user
  })
)(observer(App));
