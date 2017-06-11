import React from 'react';
import {object, func} from 'prop-types';

import {inject, observer} from 'mobx-react';

const Home = ({fact, getQRdata, scannedFact}) => {

  const handleChange = e => {
    getQRdata(e);
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
    </section>
  );
};

Home.propTypes = {
  fact: object.isRequired,
  scannedFact: object.isRequired,
  getQRdata: func.isRequired
};

export default inject(
  ({factStore}) => ({
    fact: factStore.fact,
    getQRdata: factStore.getQRdata,
    scannedFact: factStore.scannedFact
  })
)(observer(Home));
