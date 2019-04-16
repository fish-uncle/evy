import React from 'react';
import {Default, Exception} from '../../components';
import {Link} from 'dva/router';

const Exception500 = () => (
  <Default>
    <Exception
      type="500"
      desc='抱歉，服务器出错了'
      linkElement={Link}
    />
  </Default>
);

export default Exception500;
