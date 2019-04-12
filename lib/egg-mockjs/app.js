'use strict';
module.exports = app => {
  const path = require('path');
  const fs = require('fs');
  const {router, config} = app;
  const {mockjs} = config;
  const {apiUrl, dir} = mockjs;
  const {join} = path;
  app.beforeStart(async () => {
    const rule_get = path.join(dir, 'get'), rule_post = path.join(dir, 'post'),
      rule_delete = path.join(dir, 'delete'), rule_put = path.join(dir, 'put');

    function findSync(startPath) {
      let result = [];

      function finder(path) {
        try {
          let files = fs.readdirSync(path);
          files.forEach(val => {
            let fPath = join(path, val);
            let stats = fs.statSync(fPath);
            if (stats.isDirectory()) finder(fPath);
            if (stats.isFile()) result.push(fPath.replace(startPath, ''));
          });
        } catch (files) {
          result = []
        }
      }

      finder(startPath);
      return result;
    }

    let files_get = findSync(rule_get), files_post = findSync(rule_post), files_delete = findSync(rule_delete),
      files_put = findSync(rule_put), mockList_get = [], mockList_post = [], mockList_delete = [], mockList_put = [];
    files_get.forEach(function (item) {
      const c = item.split('\\');
      let s = '';
      c.map(item => {
        if (item !== '') {
          s += '/';
          s += item;
        }
      });
      mockList_get.push(s.replace('.js', ''))
    });
    files_post.forEach(function (item) {
      const c = item.split('\\');
      let s = '';
      c.map(item => {
        if (item !== '') {
          s += '/';
          s += item;
        }
      });
      mockList_post.push(s.replace('.js', ''))
    });
    files_delete.forEach(function (item) {
      const c = item.split('\\');
      let s = '';
      c.map(item => {
        if (item !== '') {
          s += '/';
          s += item;
        }
      });
      mockList_delete.push(s.replace('.js', ''))
    });
    files_put.forEach(function (item) {
      const c = item.split('\\');
      let s = '';
      c.map(item => {
        if (item !== '') {
          s += '/';
          s += item;
        }
      });
      mockList_put.push(s.replace('.js', ''))
    });
    mockList_get.map(item => {
      const middle = async (ctx, next) => {
        ctx.body = require(path.join(dir, 'get/' + item));
        await next();
      };
      return router.get(apiUrl + item, middle)
    });
    mockList_post.map(item => {
      const middle = async (ctx, next) => {
        ctx.body = require(path.join(dir, 'post/' + item));
        await next();
      };
      return router.post(apiUrl + item, middle)
    });
    mockList_delete.map(item => {
      const middle = async (ctx, next) => {
        ctx.body = require(path.join(dir, 'delete/' + item));
        await next();
      };
      return router.delete(apiUrl + item, middle)
    });
    mockList_put.map(item => {
      const middle = async (ctx, next) => {
        ctx.body = require(path.join(dir, 'put/' + item));
        await next();
      };
      return router.put(apiUrl + item, middle)
    });
    app.coreLogger.info('[egg-mockjs] mockjs start success');
  });
};