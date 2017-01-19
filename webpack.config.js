module.exports = {
  entry: "./src/exif.js",
  output: {
    path: __dirname + "/dist",
    filename: "exif.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: [/node_modules/, /\.spec\.js$/], loader: "babel-loader" }
    ]
  }
};
