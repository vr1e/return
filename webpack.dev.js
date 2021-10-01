const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
var dotenv = require('dotenv');
const path = require('path');

module.exports = {
	mode: 'development',
	entry: path.join(__dirname, 'src', 'index.js'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js',
		chunkFilename: '[name].bundle.js',
		publicPath: '/'
	},
	devtool: 'source-map',
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
		// new CleanWebpackPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			favicon: 'src/assets/favicon.ico',
			meta: {
				viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
			},
			template: 'src/template.html'
		}),
		// new HtmlWebpackPlugin({
		// 	inject: false,
		// 	template: require('html-webpack-template'),
		// 	appMountId: 'root',
		// 	title: 'return.rs',
		// 	meta: [
		// 		{
		// 			charset: 'utf-8'
		// 		},
		// 		{
		// 			name: 'viewport',
		// 			content: 'width=device-width, initial-scale=1'
		// 		}
		// 	],
		// 	mobile: true,
		// 	lang: 'sr',
		// 	links: [
		// 		{
		// 			href: '/apple-touch-icon.png',
		// 			rel: 'apple-touch-icon',
		// 			sizes: '32x32',
		// 			type: 'image/png'
		// 		},
		// 		{
		// 			href: '/favicon-32x32.png',
		// 			rel: 'icon',
		// 			sizes: '32x32',
		// 			type: 'image/png'
		// 		},
		// 		{
		// 			href: '/favicon-16x16.png',
		// 			rel: 'icon',
		// 			sizes: '16x16',
		// 			type: 'image/png'
		// 		},
		// 		{
		// 			href: '/safari-pinned-tab.svg',
		// 			rel: 'mask-icon',
		// 			color: '#e63946'
		// 		},
		// 		{
		// 			href: '/manifest.json',
		// 			rel: 'manifest'
		// 		},
		// 		{
		// 			href: 'https://fonts.googleapis.com/css?family=Open+Sans:400,700',
		// 			rel: 'stylesheet'
		// 		}
		// 	],
		// 	googleAnalytics: {
		// 		trackingId: 'UA-90771646-8',
		// 		pageViewOnLoad: true
		// 	}
		// }),
		new MiniCssExtractPlugin({
			filename: '[name]-[contenthash].css'
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.join(__dirname, 'src/assets'),
					to: path.join(__dirname, 'dist/'),
					toType: 'dir'
				}
			]
		}),
		new WebpackBar()
	],
	optimization: {
		runtimeChunk: 'single',
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\\/]node_modules[\\\/]/,
					name: 'vendors',
					chunks: 'all'
				}
			}
		}
	},
	devServer: {
		https: true,
		client: {
			logging: 'warn'
		},
		compress: true,
		historyApiFallback: true,
		// contentBase: path.join(__dirname, 'src'),
		// port: 9000,
		// stats: 'minimal'
	}
};
