import React from 'react';
import {Router, Route, Switch} from 'dva/router';
import routerConfig from './routerConfig';

function RouterConfig({history}) {
  return (
    <Router history={history}>
      <Switch>
        {
          routerConfig.map((value, index) => (
            <Route path={value.path} exact={value.exact} component={value.component} key={index}/>
          ))
        }
      </Switch>
    </Router>
  );
}

// process.env.YY_ENV === 'prod' ? void 0 :
//   (function () {
//     var script = document.createElement('script');
//     // script.src = "https://8.yingyinglicai.com/lyfe/common/js/eruda.js";
//     document.body.appendChild(script);
//     // script.onload = function () {
//     //   // eruda.init()
//     // }
//   })();
export default RouterConfig;
