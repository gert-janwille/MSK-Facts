import React from 'react';
import {inject, observer, PropTypes} from 'mobx-react';
import {func, string} from 'prop-types';

const Fact = ({fact, saveFact, share, setScreen, fbid}) => {

  const handleClickShare = () => {
    share();
  };

  const handleClickSave = e => {
    e.preventDefault();
    if (fbid) {
      saveFact(fact._id, `add`);
      e.target.style.opacity = 1;
    } else {
      setScreen(`login`);
    }
  };

  return (
    <div className='fact-container'>
      <p className='fact-text'>{fact.fact}</p>
      <p className='fact-footnote'>500 jaar aan weetjes verzameld doorheen de jaren</p>
      <img src={`assets/images/illustraties/${fact._id ? fact._id : `pixel`}.png`} alt='' className='fact-image' />
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

Fact.propTypes = {
  fact: PropTypes.observableObject.isRequired,
  saveFact: func.isRequired,
  share: func.isRequired,
  setScreen: func.isRequired,
  fbid: string.isRequired
};

export default inject(
  ({factStore, userStore, guideStore}) => ({
    fact: factStore.fact,
    saveFact: userStore.saveFact,
    share: userStore.share,
    setScreen: guideStore.setScreen,
    fbid: userStore.fbid
  })
)(observer(Fact));
