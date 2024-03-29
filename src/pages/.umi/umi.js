import './polyfills';
import '@tmp/history';
import '../../global.js';
import React from 'react';
import ReactDOM from 'react-dom';


// runtime plugins
const plugins = require('umi/_runtimePlugin');
window.g_plugins = plugins;
plugins.init({
  validKeys: ['patchRoutes','render','rootContainer','modifyRouteProps','onRouteChange','dva','locale',],
});
plugins.use(require('../../../node_modules/umi-plugin-dva/lib/runtime'));
plugins.use(require('@/app'));

require('@tmp/dva')._onCreate();
window.g_app = require('@tmp/dva').getApp();

// render
let oldRender = () => {
  const rootContainer = plugins.apply('rootContainer', {
    initialValue: React.createElement(require('./router').default),
  });
  ReactDOM.render(
    rootContainer,
    document.getElementById('root'),
  );
};
const render = plugins.compose('render', { initialValue: oldRender });

const moduleBeforeRendererPromises = [];

Promise.all(moduleBeforeRendererPromises).then(() => {
  render();
}).catch((err) => {
  window.console && window.console.error(err);
});

require('../../global.less');

// hot module replacement
if (module.hot) {
  module.hot.accept('./router', () => {
    oldRender();
  });
}
