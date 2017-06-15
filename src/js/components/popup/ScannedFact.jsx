import React from 'react';
import {Link} from 'react-router-dom';

import {inject, observer, PropTypes} from 'mobx-react';
import {func} from 'prop-types';

const ScannedFact = ({setPopUp, scannedFact}) => {

  const handleClickLogin = () => {
    setPopUp(false);
  };

  return (
      <section className='popup-screen'>
        <p className='main-paragraf'>{scannedFact === undefined ? `` : scannedFact.fact}</p>
        <Link to={`/`} href='' className='main-button red-button' onClick={handleClickLogin}>Ga terug</Link>
      </section>
  );
};

ScannedFact.propTypes = {
  setPopUp: func.isRequired,
  scannedFact: PropTypes.observableObject.isRequired
};

export default inject(
  ({guideStore, factStore}) => ({
    setPopUp: guideStore.setPopUp,
    scannedFact: factStore.scannedFact
  })
)(observer(ScannedFact));
