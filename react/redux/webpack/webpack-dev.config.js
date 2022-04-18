const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const { mockServer } = require('./utils');
const commonConfig = require('./webpack-common.config');

const SERVER_PORT = 8089;

const serverConfig = mock => {
    return mock
        ? {
            onBeforeSetupMiddleware: devServer => mockServer(path.resolve(__dirname, '../mock'), devServer.app),
        }
        : {
            // 代理开发同学机器、qa环境、production环境机器的时候请修改如下配置
            proxy: {
                '/api/test': {
                    target: '172.0.10.16',
                    secure: false,
                    changeOrigin: true,
                },
            },
        };
}

module.exports = args =>
    merge(commonConfig(args), {
        mode: 'development',

        devtool: 'eval-cheap-module-source-map',

        entry: {
            index: path.join(__dirname, '../src/app.jsx'),
        },

        output: {
            path: path.resolve(__dirname, '../'),
            filename: '[name]_[chunkhash].js',
            publicPath: '/',
		},

        devServer: {
			static: {
				directory: path.join(__dirname, '../'),
			},
            port: SERVER_PORT,
            client: {
                logging: 'info',
                overlay: true,
                progress: true,
                reconnect: false
            },
            compress: true,
			open: true,
			hot: true,
            ...serverConfig(args && args.mode === 'mock'),
        },

        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [
                        `Your application is running here: http://localhost:${SERVER_PORT}/`,
                    ],
                },
            }),
        ],
    });
