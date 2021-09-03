import path from 'path';
import { merge } from 'webpack-merge';
import common from './webpack.common.js';

const __dirname = path.resolve();

export default merge(common, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // style-loader : 자바스크립트로 변경된 스타일을 동적으로 돔에 추가하는 로더
        exclude: /node_modules/, // css-loader : CSS 파일을 모듈처럼 불러와 사용할 수 있게 도와줌
      },
    ],
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '/dist'),
    index: 'index.html',
    port: 9000,
    writeToDisk: true,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api/': {
        target: 'http://localhost:3000',
        changeOrigin: true, // cross origin 허용 설정
      },
    },
  },
});
