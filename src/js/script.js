/* eslint-disable react/jsx-filename-extension */

// import React from 'react';
// import {render} from 'react-dom';
//
// import App from './containers/App';
//
// import {BrowserRouter as Router, Route} from 'react-router-dom';
//
// import {Provider} from 'mobx-react';
//
// import stores from './stores';

const onScroll = () => {
  const $back = document.querySelector(`.back`);

  if (scrollY > 180) {
    $back.style.position = `fixed`;
    $back.style.top = `3rem`;
  } else {
    $back.style.position = `absolute`;
    $back.style.top = `21rem`;
  }
};

const init = () => {

  window.addEventListener(`scroll`, onScroll);

  // render(
  //   <Provider {...stores}>
  //     <Router>
  //       <Route component={App} />
  //     </Router>
  //   </Provider>,
  //   document.querySelector(`.react-mount`)
  // );

};

init();
