const path = require('path');

module.exports = {
  entry: {
    deploy: './scripts/deploy.ts',
    plantTrackerFunction: './src/lambda/plantTrackerFunction/entry.ts'
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: '[name]/index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd'
  },
};