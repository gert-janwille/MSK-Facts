/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import {string} from 'prop-types';
import {observer} from 'mobx-react';


const Art = ({name}) => {

  return (
    <div className='friend-container'>
      <img src={`assets/images/profile-pics/${name.split(` `).join(`-`)}.jpg`} alt='' className='friend-pic' />
      <p className='friend-name'>{name}</p>
    </div>
  );
};

Art.propTypes = {
  name: string.isRequired
};

export default observer(Art);
