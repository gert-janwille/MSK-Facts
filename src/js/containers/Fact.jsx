import React from 'react';
import {func} from 'prop-types';

import {inject, observer} from 'mobx-react';


const Favorites = ({getFact}) => {
  getFact(`5941387e75826a14756c48e6`);
  return (
    <section className='fact-page'>
      <h1>Fact</h1>
    </section>
  );
};

Favorites.propTypes = {
  getFact: func.isRequired
};

export default inject(
  ({factStore}) => ({
    getFact: factStore.getFact,
    searchFact: factStore.searchFact
  })
)(observer(Favorites));
