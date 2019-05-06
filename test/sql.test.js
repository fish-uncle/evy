const mock = require('egg-mock');

describe('sql', () => {
  let app;
  before(() => {
    app = mock.app();
    return app.ready();
  });

  it('空判断', function* () {
    yield app.sql.select('evy-menu', {
      where: {},
      like: {},
      columns: [],
      orders: {},
    });
  });

  it('有数据处理', function* () {
    yield app.sql.select('evy-menu', {
      where: {
        soft_delete: 0
      },
      like: {
        title: '回收站'
      },
      limit: 10,
      offset: 0,
      columns: ['title', 'url'],
      orders: [['create_time', 'desc']],
    });
  });
});