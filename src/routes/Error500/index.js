import React from 'react';
import {Body, Exception} from '../../components';
import {Link} from 'dva/router';

const Exception500 = () => (
  <Body>
    <Exception
      type="500"
      desc='抱歉，服务器出错了'
      linkElement={Link}
    />
  </Body>
);

export default Exception500;
