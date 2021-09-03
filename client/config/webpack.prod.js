import { merge } from 'webpack-merge';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import common from './webpack.common.js';

export default merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      compiler => {
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true, //  자바스크립트 코드를 난독화하고 debugger 구문을 제거
            },
          },
        }).apply(compiler);
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }), // 컴파일 + 번들링 CSS 파일이 저장될 경로와 이름 지정
  ],
});
