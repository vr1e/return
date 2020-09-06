const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	mode: 'production',
	devtool: '(none)',
	entry: path.join(__dirname, 'src', 'index.js'),
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.html$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'html-loader',
						options: { minimize: true }
					}
				]
			},
			{
				test: /\.(css|scss)$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
			},
			{
				test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
				loaders: ['file-loader']
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				exclude: /node_modules/,
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
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			inject: false,
			template: require('html-webpack-template'),
			appMountId: 'root',
			title: 'return.rs',
			meta: [
				{
					charset: 'utf-8'
				},
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1'
				}
			],
			mobile: true,
			lang: 'sr',
			links: [
				{
					href: '/apple-touch-icon.png',
					rel: 'apple-touch-icon',
					sizes: '32x32',
					type: 'image/png'
				},
				{
					href: '/favicon-32x32.png',
					rel: 'icon',
					sizes: '32x32',
					type: 'image/png'
				},
				{
					href: '/favicon-16x16.png',
					rel: 'icon',
					sizes: '16x16',
					type: 'image/png'
				},
				{
					href: '/safari-pinned-tab.svg',
					rel: 'mask-icon',
					color: '#e63946'
				},
				{
					href: '/manifest.json',
					rel: 'manifest'
				},
				{
					href: 'https://fonts.googleapis.com/css?family=Open+Sans:400,700',
					rel: 'stylesheet'
				}
			],
			googleAnalytics: {
				trackingId: 'UA-90771646-8',
				pageViewOnLoad: true
			}
		}),
		new MiniCssExtractPlugin({
			filename: '[contenthash].css',
			chunkFilename: '[id].css'
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.join(__dirname, 'src/assets'),
					to: path.join(__dirname, 'build/'),
					toType: 'dir'
				}
			]
		}),
		new WebpackBar()
		// new BundleAnalyzerPlugin()
	],
	output: {
		filename: '[contenthash].bundle.js',
		path: path.resolve(__dirname, 'build'),
		publicPath: '/'
	},
	optimization: {
		splitChunks: {
			chunks: 'all'
		}
	}
};
