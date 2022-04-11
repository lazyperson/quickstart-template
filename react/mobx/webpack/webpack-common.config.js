const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HappyPack = require('happypack');
const os = require('os');

const recommendCpuLength = os.cpus().length - 1;

const happyThreadPool = HappyPack.ThreadPool({size: recommendCpuLength });

module.exports = {
	entry: {
		app: path.resolve(__dirname, '../src/index.js'),
	},
	output: {
		path: path.join(__dirname, '../dist'),
		filename: 'js/[name].js',
	},
	resolve: {
		alias: {
			'~': path.resolve(__dirname, '../src'),
		},
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)?$/,
				use: 'happypack/loader?id=jsx',
				exclude: /(node_modules)|(bower_components)|(\.min\.(js|jsx)$)/
			},
			{
				test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[path][name].[ext]',
					},
				},
			},
			{
				test: /\.css|less$/,
				use: [
					isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							sourceMap: false,
							localsConvention: 'camelCase',
							modules: {
								localIdentName: '[local]_[hash:base64:5]'
							}
						}
					},
					'postcss-loader'
				]
			},
			{
				test: /\.less$/,
				use: [
					'less-loader'
				]
			},
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HappyPack({
			id: 'jsx',
			threadPool: happyThreadPool,
			loaders: ['babel-loader?cacheDirectory'],
			verbose: true
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '../src/index.html'),
		}),
		new webpack.ProgressPlugin(),
		new FriendlyErrorsWebpackPlugin()
	],
	optimization: {
		mergeDuplicateChunks: true,
		minimize: true,
		minimizer: [
			new TerserPlugin({
				cache: true,
				parallel: recommendCpuLength
			}),
			new CssMinimizerPlugin({
				include: /\/src/,
				cache: true,
				parallel: recommendCpuLength

			}),
		],
		splitChunks: {
			chunks: 'all',
			name: false,
		},
	},
	performance: {
		hints: false
	},
	profile: false,
	stats: 'errors-only',
	cache: true
}
