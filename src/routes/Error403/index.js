import React from 'react';
import {Body, Exception} from '../../components';
import {Link} from 'dva/router';

const Exception403 = () => (
  <Body>
    <Exception
      type="403"
      desc='抱歉，你无法访问此页面'
      linkElement={Link}
    />
  </Body>
);

export default Exception403;
