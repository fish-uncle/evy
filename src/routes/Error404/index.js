import React from 'react';
import {Default, Exception} from '../../components';
import {Link} from 'dva/router';

const Exception404 = () => (
  <Default>
    <Exception
      type="404"
      desc='抱歉，你访问的页面不存在'
      linkElement={Link}
    />
  </Default>
);

export default Exception404;
