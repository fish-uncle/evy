import path from 'path';

const publicPath = `/`;
export default {
  theme: {
    "primary-color": "#1DA57A",
  },
  define: {
    'process.env.NODE_ENV': process.env.NODE_ENV,
  },
  entry: {
    index: './src/index.js',
    vendor: ['dva', 'react-dom', 'react', 'antd']
  },
  outputPath: path.resolve(__dirname, 'app', 'public'),
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
  hash: false,
  disableCSSModules: true,
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:6602',  // 本地
      changeOrigin: true,
      secure: true,
    }
  },
  extraBabelPlugins: [["import", {
    "libraryName": "antd",
    "libraryDirectory": "es",
    "style": true
  }]],
  env: {
    development: {
      "extraBabelPlugins": ["dva-hmr"]
    },
    production: {
      publicPath
    }
  }
};
