import React from 'react';
import {Default, Exception} from '../../components';
import {Link} from 'dva/router';

const Exception403 = () => (
  <Default>
    <Exception
      type="403"
      desc='抱歉，你无法访问此页面'
      linkElement={Link}
    />
  </Default>
);

export default Exception403;
