const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
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
		new HtmlWebpackPlugin({
			favicon: 'src/assets/favicon.ico',
			meta: {
				viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
			},
			template: 'src/template.html'
		}),
		// 	googleAnalytics: {
		// 		trackingId: 'UA-90771646-8',
		// 		pageViewOnLoad: true
		// 	}
		// }),
		new MiniCssExtractPlugin({
			filename: '[name]-[contenthash].css'
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
		hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
		// contentBase: path.join(__dirname, 'src'),
		port: 9000,
		// stats: 'minimal'
	}
};
