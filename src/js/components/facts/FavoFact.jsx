import React from 'react';
import {string, func} from 'prop-types';

import {inject, observer} from 'mobx-react';


const FavoFact = ({fact, _id, share, saveFact}) => {

  const handleClickShare = () => {
    share();
  };

  const handleClickSave = e => {
    e.preventDefault();
    saveFact(_id, `add`);
    e.target.style.opacity = 1;
  };

  return (
    <div className='favorite-container'>
      <img src={`assets/images/illustraties/${_id}.png`} alt='' className='favorite-image' />
      <h1 className='favorite-title'>Wist je dat?</h1>
      <p className='favorite-text'>{fact}</p>
      <div className='social'>
        <div className='like' onClick={handleClickSave}>
          <span className='hidden'>Like</span>
        </div>
        <div className='share' onClick={handleClickShare}>
          <span className='share-text'>Delen</span>
        </div>
      </div>
    </div>
  );
};

FavoFact.propTypes = {
  fact: string.isRequired,
  _id: string.isRequired,
  share: func.isRequired,
  saveFact: func.isRequired
};

export default inject(
  ({userStore}) => ({
    share: userStore.share,
    saveFact: userStore.saveFact
  })
)(observer(FavoFact));
