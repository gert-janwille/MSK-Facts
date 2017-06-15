/* eslint-disable react/jsx-filename-extension *//* eslint-disable react/no-multi-comp */

import React from 'react';
import {inject, observer} from 'mobx-react';
import {func} from 'prop-types';

const Notification = ({setScreen}) => {

  const handleClickNotification = e => {
    e.preventDefault();
    setScreen(`notifications`);
  };

  return (
    <div className='notifications'>
      <div className='notifications-amount'>1</div>
      <a href='#' className='notifications-bel round-button' onClick={handleClickNotification}><span className='hidden'>Notifications</span></a>
    </div>
  );
};

Notification.propTypes = {
  setScreen: func.isRequired
};

export default inject(
  ({guideStore}) => ({
    setScreen: guideStore.setScreen
  })
)(observer(Notification));
