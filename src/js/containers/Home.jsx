import React from 'react';
import {object} from 'prop-types';

import {inject, observer} from 'mobx-react';

const Home = ({fact}) => (
  <p>{fact.fact}</p>
);

Home.propTypes = {
  fact: object.isRequired
};

export default inject(
  ({factStore}) => ({
    fact: factStore.fact,
  })
)(observer(Home));
