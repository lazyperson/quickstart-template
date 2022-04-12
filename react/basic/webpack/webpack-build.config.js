const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack-common.config');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const MainConfig = args => ({
    // 生产环境
    mode: 'production',

    entry: {
        index: path.join(__dirname, '../src/app.jsx'),
    },

    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name]_[chunkhash].js',
        publicPath: '/',
    },

    // 代码优化配置
    optimization: {
        minimizer: [
            // 压缩js
            new TerserWebpackPlugin({
                parallel: true,
                terserOptions: {
                    output: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),

            // 压缩css
            new CssMinimizerPlugin({
                include: /\.css$/g,
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: { removeAll: true },
                        },
                    ],
                },
            }),
        ],
    },
    plugins: [
       new CleanWebpackPlugin(),
    ],
});

module.exports = args => merge(MainConfig(args), commonConfig(args));
