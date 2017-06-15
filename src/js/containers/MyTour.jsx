import React from 'react';
// import {object, func} from 'prop-types';
import {inject, observer, PropTypes} from 'mobx-react';

import Banner from '../components/mytour/Banner';
import NoTour from '../components/mytour/noTours';


const MyTour = ({tour}) => {
  console.log(tour);
  return (
    <div className='mytour-guide'>
      <Banner />
      <NoTour />


        <section className='rondleiding-container'>
          <section className='friends-container'>

            <div className='friend-container'>
              <img src='assets/images/profile-pics/profile01.jpg' alt='' className='friend-pic' />
              <p className='friend-name'>Isaac Yaki</p>
            </div>

            <div className='friend-container'>
              <img src='assets/images/profile-pics/profile01.jpg' alt='' className='friend-pic' />
              <p className='friend-name'>Isaac Yaki</p>
            </div>

            <div className='friend-container'>
              <img src='assets/images/profile-pics/profile01.jpg' alt='' className='friend-pic' />
              <p className='friend-name'>Isaac Yaki</p>
            </div>
          </section>

          <div className='tour-done'>
            <p>
              Al jullie weetjes werden samengevoegd om de <em>perfecte rondleiding</em> voor jullie samen te stellen. Kom langs bij het museum om de rondleiding te starten. Jullie kunnen <em>weetjes scannen</em> met jullie smartphone of tablet.
            </p>
            <p><em>Tot binnenkort!</em></p>
          </div>

        </section>
        <a href='#' className='main-button red-button'>Koop Tickets</a>




    </div>
  );
};

MyTour.propTypes = {
  tour: PropTypes.observableArray.isRequired
};

export default inject(
  ({guideStore}) => ({
    tour: guideStore.tour
  })
)(observer(MyTour));
