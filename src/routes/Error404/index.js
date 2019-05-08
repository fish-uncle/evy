import React from 'react';
import {Body, Exception} from '../../components';
import {Link} from 'dva/router';

const Exception404 = () => (
  <Body>
    <Exception
      type="404"
      desc='抱歉，你访问的页面不存在'
      linkElement={Link}
    />
  </Body>
);

export default Exception404;
