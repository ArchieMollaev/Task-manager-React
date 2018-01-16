const Path = require('path');
module.exports = {
   resolve: {
      extensions: ['.js', '.jsx'],
      modules: [
         './src',
         './node_modules'
      ]
   },
   entry : ["babel-polyfill", "./src/index.js"],
   output: {
        path: Path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/'
    },
   module: {
    loaders: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: 'babel-loader?cacheDirectory',
      },
      {
        test: /\.(scss|sass|css)$/,
        loader: 'style-loader!css-loader!sass-loader?cacheDirectory',
      }
    ],
   },
   devServer: {
      open: true,
      historyApiFallback: true
   }
};