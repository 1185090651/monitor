import json from 'rollup-plugin-json'
// 这个 rollup-plugin-node-resolve 插件可以告诉 Rollup 如何查找外部模块。 安装它...
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel';
const commonjs = require('rollup-plugin-commonjs');

export default {
    input: '../dykt-monitor/index.js',
    output: {
      file: '../dykt-monitor/dist/monitor.js',
      format: 'umd',
      name: 'monitor'
    },
    plugins: [ json(),commonjs(), resolve(), babel(
      {
        babelrc: false,
            presets: [
          ['@babel/preset-env', { modules: false }]
        ],
        // plugins: [
        //   ["@babel/plugin-transform-classes", {
        //     "loose": true
        //   }]
        // ]
      }) ],
     // 指出应将哪些模块视为外部模块
    // external: ['user-agent'],
}