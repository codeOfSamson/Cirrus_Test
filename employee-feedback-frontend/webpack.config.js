// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js',  // Your main JS file (or entry point)
  output: {
    filename: 'bundle.js',  // The output file for your JavaScript
    path: path.resolve(__dirname, 'dist'),  // The directory where your bundled files will go
  },
  module: {
    rules: [
      {
        test: /\.css$/i,  // Target CSS files
        use: [
          'style-loader',  // Injects the styles into the DOM
          'css-loader',    // Resolves CSS imports
          'postcss-loader',  // Runs PostCSS (including Tailwind CSS)
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css'],  // Make sure Webpack knows how to resolve various extensions
  },
  mode: 'development',  // Set the mode to development (or 'production' when building for production)
};
