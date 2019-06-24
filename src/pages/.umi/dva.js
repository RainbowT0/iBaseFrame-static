import dva from 'dva';
import { Component } from 'react';
import createLoading from 'dva-loading';
import history from '@tmp/history';

let app = null;

export function _onCreate() {
  const plugins = require('umi/_runtimePlugin');
  const runtimeDva = plugins.mergeConfig('dva');
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach(plugin => {
    app.use(plugin);
  });
  
  app.model({ namespace: 'global', ...(require('C:/Works/iBaseFrame-static/src/models/global.js').default) });
app.model({ namespace: 'list', ...(require('C:/Works/iBaseFrame-static/src/models/list.js').default) });
app.model({ namespace: 'login', ...(require('C:/Works/iBaseFrame-static/src/models/login.js').default) });
app.model({ namespace: 'menu', ...(require('C:/Works/iBaseFrame-static/src/models/menu.js').default) });
app.model({ namespace: 'project', ...(require('C:/Works/iBaseFrame-static/src/models/project.js').default) });
app.model({ namespace: 'setting', ...(require('C:/Works/iBaseFrame-static/src/models/setting.js').default) });
app.model({ namespace: 'user', ...(require('C:/Works/iBaseFrame-static/src/models/user.js').default) });
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
