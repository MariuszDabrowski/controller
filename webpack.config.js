const path = require('path');

module.exports = {
  entry: {
    popup: './src/popup/index.js',
    overlay: './src/overlay/index.js'
  },
  output: {
		path: path.join(__dirname, "plugin/js"),
		filename: "[name].bundle.js"
	},
  mode: 'production'
}