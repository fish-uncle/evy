import dva from 'dva';
import './index.less';
import './utils/always';

// 1. Initialize
const app = dva({
  onError: function (e) {
    e.preventDefault();
    console.error('全局onError', e);
  }
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/router').default);
app.model(require('./models/left').default);
app.model(require('./models/config').default);
app.model(require('./models/sheet').default);
app.model(require('./models/modal').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
