import React from 'react';
import {bool, string} from 'prop-types';

import {inject, observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import {Route} from 'react-router-dom';

import Home from './Home';
import Favorites from './Favorites';
import MyTour from './MyTour';
import Fact from './Fact';

import SideBar from '../components/SideBar';
import MobileNav from '../components/navigation/MobileNav';
import Popup from '../components/popup/';

import Notification from '../components/notification/';

const App = ({popupRequired, screenPop}) => {

  return (
    <section>

      {process.env.NODE_ENV !== `production` ? <DevTools /> : null}

        <SideBar />

        {popupRequired ? <Popup popscreen={screenPop} /> : ``}

        <main>
          <Route exact path='/' component={Home} />
          <Route path='/favorites' component={Favorites} />
          <Route path='/mytour' component={MyTour} />
          <Route path='/fact/:id' component={Fact} />
        </main>

        <Notification />
        <MobileNav />

    </section>
  );
};

App.propTypes = {
  popupRequired: bool.isRequired,
  screenPop: string.isRequired
};

export default inject(
  ({guideStore}) => ({
    popupRequired: guideStore.popupRequired,
    screenPop: guideStore.screenPop
  })
)(observer(App));
