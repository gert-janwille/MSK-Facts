import React from 'react';
import {Link} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import {func} from 'prop-types';

const NeedMoreFacts = ({setPopUp}) => {

  const handleClickLogin = () => {
    setPopUp(false);
  };

  return (
      <section className='popup-screen'>
        <p className='main-paragraf'>Je moet meer weetjes opslaan om een tour te maken.</p>
        <Link to={`/`} href='' className='main-button red-button' onClick={handleClickLogin}>Ontdek meer weetjes</Link>
      </section>
  );
};

NeedMoreFacts.propTypes = {
  setPopUp: func.isRequired
};

export default inject(
  ({guideStore}) => ({
    setPopUp: guideStore.setPopUp
  })
)(observer(NeedMoreFacts));
