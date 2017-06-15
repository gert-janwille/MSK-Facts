import React from 'react';
import {isEmpty} from 'lodash';
import {inject, observer, PropTypes} from 'mobx-react';

import Banner from '../components/mytour/Banner';
import NoTour from '../components/mytour/noTours';
import Art from '../components/art/';


const MyTour = ({tour}) => {

  return (
    <div className='mytour-guide'>

      <Banner />

        <section className='rondleiding-container'>
          <section className='friends-container'>

          {isEmpty(tour) ? <NoTour /> : tour.map(a => <Art {...a} key={a._id} />)}

          </section>

          <div className='tour-done'>
            <p>
              Al jullie weetjes worden samengevoegd om de <em>perfecte rondleiding</em> voor jullie samen te stellen. Kom langs bij het museum om de rondleiding te starten. Jullie kunnen <em>weetjes scannen</em> met jullie smartphone of tablet.
            </p>
            <p><em>Tot binnenkort!</em></p>
          </div>

        </section>
        <a href='http://mskgent.be' className='main-button red-button'>Koop Tickets</a>




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
