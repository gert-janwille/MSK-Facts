import React from 'react';
import {observer} from 'mobx-react';

const Banner = () => (
    <section className='top-banner'>
      <p className='banner-text'>Bekijk de status van jouw rondleiding. Als iedereen geaccepteerd heeft kan je bij het museum langskomen voor de rondleiding.</p>
    </section>
  );

export default observer(Banner);
