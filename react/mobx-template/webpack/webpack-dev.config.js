const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

const common = require('./webpack-common.config.js');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'cheap-eval-source-map',
	output: {
		chunkFilename: 'js/[name].chunk.js'
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development')
		}),
		new webpack.HotModuleReplacementPlugin(),
	],
	devServer: {
		host: '0.0.0.0',
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		hot: true,
		open: true,
		port: 9000
	}
});
