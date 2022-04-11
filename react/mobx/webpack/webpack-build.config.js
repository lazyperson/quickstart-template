const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

const common = require('./webpack-common.config.js');

module.exports = merge(common, {
	mode: 'production',
	devtool: 'none',
	output: {
		chunkFilename: 'js/[name].chunk.js'
	},
});
