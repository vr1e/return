// const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
const CopyPlugin = require('copy-webpack-plugin');
// var dotenv = require('dotenv');
// const BundleAnalyzerPlugin =
// 	require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	mode: 'production',
	entry: path.join(__dirname, 'src', 'index.js'),
	output: {
		filename: '[contenthash].bundle.js',
		path: path.resolve(__dirname, 'build'),
		publicPath: '/',
		clean: true
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: { minimize: true }
					}
				]
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					MiniCssExtractPlugin.loader,
					// Translates CSS into CommonJS
					'css-loader',
					// Compiles Sass to CSS
					'sass-loader'
				]
			},
			{
				test: /\.(jpg|jpeg|png|gif|svg)$/,
				type: 'asset/resource'
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'fonts/',
							publicPath: url => `../fonts/${url}`
						}
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			favicon: 'src/assets/favicon.ico',
			meta: {
				viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
			},
			template: 'src/template.html'
		}),
		new MiniCssExtractPlugin({
			filename: '[name]-[contenthash].css'
		}),
		new WebpackBar(),
		new CopyPlugin({
			patterns: [
				{
					from: path.join(__dirname, 'src/assets'),
					to: path.join(__dirname, 'build/'),
					toType: 'dir'
				}
			]
		})
		// new BundleAnalyzerPlugin()
	],
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /node_modules/,
					chunks: 'initial',
					name: 'vendor',
					enforce: true
				}
			}
		},
		minimize: true
	}
};
