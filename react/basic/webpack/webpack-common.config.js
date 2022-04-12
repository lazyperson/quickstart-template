const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const argv = require('minimist')(process.argv.slice(2));


const apiDomains = require('./api-domain.json');

console.log(argv.env);

let apiEnv = '';

let isAnalyzer = null;

if (argv.env) {
	let params = argv.env.split('=')[1];
	if (params.indexOf(',') > -1) {
		apiEnv = params.split(',')[0];
		isAnalyzer = true;
	} else {
		apiEnv = params;
	}
}

const resolve = dir => path.resolve(__dirname, dir);

const systemEnv = process.env.NODE_ENV;

const log = (msg, color = '32m') => {
	console.log('-'.repeat(2 * msg.length + 2));
	console.log('\033[40;' + color + ' ' + msg + ' \033[0m');
	console.log('-'.repeat(2 * msg.length + 2));
};

if (apiEnv === 'production') {
	log('(⊙ˍ⊙) -> 即将连接【线上环境】，请谨慎操作！！！！！！');
}
if (apiEnv === 'qa') {
	log('(*￣▽￣*) -> 即将连接【qa环境】数据，别看错了环境哦');
}
if (apiEnv === 'develop') {
	log('即将连接【development环境】数据， 开发同学机器数据。');
}
if (apiEnv === 'mock') {
	log('即将连接【mock环境】数据， 本地数据。');
}

function genCssRule(module = false) {
    return [
        {
            loader: systemEnv === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
            options: systemEnv === 'development' ? {} : { esModule: true },
        },
        {
            loader: 'css-loader',
            options: {
                modules: module
                    ? {
                          localIdentName: '[local]_[hash:base64:6]',
                          exportLocalsConvention: 'camelCase',
                      }
                    : false,
                importLoaders: 1,
                url: true, // 启用/禁用 url() 处理
                sourceMap: false,
            },
        },
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: loader => [
                        'postcss-import', // 支持@import 引入css
                        'autoprefixer',
                        'cssnano', // 压缩css
                    ],
                },
            },
        },
        {
            loader: 'less-loader',
            options: {
                sourceMap: true
            },
        },
    ];
}

module.exports = (args) => {
	const obj = {
		module: {
			// 如果一些第三方模块没有AMD/CommonJS规范版本，可以使用 noParse 来标识这个模块，但是webpack不进行转化和解析
			rules: [
				{
					test: /\.(jsx|js)?$/,
					use: ['babel-loader?cacheDirectory=true'],
					// thread-loader：放置在这个 loader 之后的 loader 就会在一个单独的 worker 池中运行
					// use: ['babel-loader?cacheDirectory=true', 'eslint-loader'],

					include: [path.resolve(__dirname, '../src')],
					exclude: /node_modules/,
				},
				{
					// css 全局样式的配置，放在assets下面
					test: /\.(le|c)ss$/,
					use: genCssRule(false),
					include: [/node_modules/, path.resolve(__dirname, '../src/assets')],
				},
				{
					test: /\.(le|c)ss$/,
					use: genCssRule(true),
					exclude: [/node_modules/, path.resolve(__dirname, '../src/assets')],
					include: path.resolve(__dirname, '../src'),
				},
				{
					// 图片、字体等处理
					test: /\.(png|jpg|jpeg|gif|webp|svg|eot|ttf|woff|woff2)$/,
					use: [
						{
							loader: 'url-loader',
							options: {
								limit: 1024, // 最大10K,
								esModule: false, // 文件加载器生成使用ES模块语法的JS模块
								name: '[name]_[chunkhash].[ext]',
								outputPath: 'assets', // 文件过多时输出到名称为assets的文件夹中
							},
						},
					],
				},
				{
					test: /\.html$/,
					use: [{
						loader: 'html-loader',
					}]
				}
			],
		},
		externals: {
			react: 'React',
			'react-dom': 'ReactDOM',
		},
		resolve: {
			alias: {
				'@components': resolve('../src/components'),
				'@commons': resolve('../src/commons'),
				'@constants': resolve('../src/constants'),
				'@http': resolve('../src/commons/http'),
				'@assets': resolve('../src/assets'),
				'@hooks': resolve('../src/hooks'),
			},
			extensions: ['.js', '.jsx', '.ts', '.tsx'],
		}
	};

	let plugins = [];
	if (isAnalyzer) {
		plugins.push(new BundleAnalyzer());
	}
	plugins = plugins.concat([
		new HtmlWebpackPlugin({
			title: '网站标题',
			env: false,
			template: 'src/index.html',
			filename: 'index.html',
			inject: false,
			// 最小化输出方式
			minify: {
				removeAttributeQuotes: false,
				collapseWhitespace: false,
			},
		}),

		// 配置环境变量
		new webpack.DefinePlugin({
			'process.env': {
				API_DOMAIN: JSON.stringify(apiDomains[apiEnv]),
			},
		}),

		// 抽离样式文件到单独目录
		new MiniCssExtractPlugin({
			filename: 'app-[chunkhash].css',
			chunkFilename: '[id].css',
		}),
		// 打包进度
		new webpack.ProgressPlugin(),
	]);

    return {
		...obj,
		plugins,
    };
};
