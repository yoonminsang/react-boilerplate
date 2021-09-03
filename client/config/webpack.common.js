import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

const __dirname = path.resolve();

export default {
  entry: './src/index.tsx',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    assetModuleFilename: 'assets/[hash].[ext]?[query]',
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.ts', '.tsx'],
    plugins: [new TsconfigPathsPlugin()], // tsconfig.json의 경로 섹션에 위치가 지정된 모듈을 로드
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-typescript',
              [
                '@babel/preset-env',
                {
                  targets: '> 1%, not dead',
                  useBuiltIns: 'usage',
                  corejs: { version: '3.16' },
                },
              ],
              '@babel/preset-react',
            ],
          },
        },
        exclude: /(node_modules)/,
      },
      { test: /\.tsx?$/, loader: 'ts-loader' },
      {
        test: /\.(ico|png|jpe?g|gif|svg|woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      // favicon: './public/favicon.png',
    }), // HTML 파일을 후처리하는데 사용, 빌드 타임의 값을 넣거나 코드를 압축
  ],
};
