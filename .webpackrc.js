import path from 'path';
import pkg from './package';


const fullYear = new Date().getFullYear();
const realEnv = process.env.YY_ENV === 'prod' ? 'prod' : 'test';
const yuming = process.env.YY_ENV === 'prod' ? '8' : 'source';

// const publicPath = `https://${yuming}.yingyinglicai.com/lyfe/node-projects/${fullYear}/credit-card/${pkg.name}/${pkg.version}/${realEnv}/`;
const publicPath = `https://${yuming}.yingyinglicai.com/lyfe/h5-activities/${fullYear}/${pkg.name}/${realEnv}/${pkg.version}/`; // h5-activities

export default {
  define: {
    'process.env.YY_ENV': process.env.YY_ENV,
  },
  entry: {
    index: './src/index.js',
    vendor: ['dva', 'react-dom', 'react', 'styled-components']
  },
  commons: [
    {name: ['vendor']}
  ],
  browserslist: [
    '> 1% in CN',
    'last 2 versions',
    'Firefox >= 20',
    'Safari >= 6',
    'Explorer >= 9',
    'Chrome >= 12',
    'ChromeAndroid >= 4.4',
    'iOS >= 6',
    'and_uc >= 9.1'
  ],
  outputPath: path.resolve(__dirname, 'dist', pkg.version),
  hash: false,
  disableCSSModules: true,
  extraPostCSSPlugins: [
    require('postcss-px2rem')({remUnit: 75})
  ],
  alias: {
    'styled-px2rem': path.resolve(__dirname, 'src/lib/styled-px2rem.js')
  },
  proxy: {

  },

  extraBabelPlugins: [],
  env: {
    development: {
    },
    production: {
      publicPath
    }
  }
};
