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
        publicPath: 'http://localhost:3000/',
    },
   module: {
    loaders: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: 'babel-loader?cacheDirectory',
      }, {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.(scss|sass|css)$/,
        loader: 'style-loader!css-loader!sass-loader?cacheDirectory',
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
      },
    ],
   },
   devServer: {
      open: true,
      historyApiFallback: true
   }
};