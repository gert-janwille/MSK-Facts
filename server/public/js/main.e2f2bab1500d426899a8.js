/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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

var onScroll = function onScroll() {
  var $back = document.querySelector(".back");

  if (scrollY > 180) {
    $back.style.position = "fixed";
    $back.style.top = "3rem";
  } else {
    $back.style.position = "absolute";
    $back.style.top = "21rem";
  }
};

var init = function init() {

  window.addEventListener("scroll", onScroll);

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

/***/ }),
/* 1 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Missed semicolon (392:17)\n\n \u001b[90m 390 | \u001b[39m    font-size\u001b[33m:\u001b[39m 3.5em\u001b[33m;\u001b[39m\n \u001b[90m 391 | \u001b[39m    color\u001b[33m:\u001b[39m white\u001b[33m;\u001b[39m\n\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 392 | \u001b[39m    margin-top\u001b[33m:\u001b[39m 0\n \u001b[90m     | \u001b[39m                \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\n \u001b[90m 393 | \u001b[39m    background-color\u001b[33m:\u001b[39m \u001b[36mvar\u001b[39m\u001b[36m(--red)\u001b[39m\u001b[33m;\u001b[39m\n \u001b[90m 394 | \u001b[39m  \u001b[33m}\u001b[39m\n\n    at runLoaders (/Users/astridslingerland/Documents/Howest/2016-2017/sem2/MA4/juni/development/MSK-Facts/node_modules/webpack/lib/NormalModule.js:192:19)\n    at /Users/astridslingerland/Documents/Howest/2016-2017/sem2/MA4/juni/development/MSK-Facts/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /Users/astridslingerland/Documents/Howest/2016-2017/sem2/MA4/juni/development/MSK-Facts/node_modules/loader-runner/lib/LoaderRunner.js:230:18\n    at context.callback (/Users/astridslingerland/Documents/Howest/2016-2017/sem2/MA4/juni/development/MSK-Facts/node_modules/loader-runner/lib/LoaderRunner.js:111:13)\n    at /Users/astridslingerland/Documents/Howest/2016-2017/sem2/MA4/juni/development/MSK-Facts/node_modules/postcss-loader/index.js:146:13");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(0);


/***/ })
/******/ ]);
//# sourceMappingURL=main.e2f2bab1500d426899a8.js.map