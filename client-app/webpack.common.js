const path = require('path')
const SERVER_URL = require('./src/Global')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

//const BrotliPlugin = require('brotli-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
	.BundleAnalyzerPlugin
const PreloadWebpackPlugin = require('preload-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')

module.exports = {
	devServer: {
		historyApiFallback : true,
		headers            : {
			'Cache-Control': 'max-age=31536000'
		}

		// https: true
	},
	resolve: {
		alias: {
			'react-spring/renderprops$': 'react-spring/renderprops.cjs'
		}
	},
	entry: {
		/*
		 * commons: [ 'react', 'react-dom' ],
		 *  vendor: [
		 *    'react',
		 *    'redux',
		 *  ],
		 */
		app: './src/index.js'
	},
	output: {
		filename      : '[name].[hash:8].js',
		chunkFilename : '[name].[chunkhash:8].chunk.js',
		path          : path.resolve(__dirname, 'dist'),
		publicPath    : '/',
		globalObject  : 'self'
	},
	module: {
		rules: [
			{
				test : /\.less$/,
				use  : [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader' // translates CSS into CommonJS
					},
					{
						loader  : 'less-loader', // compiles Less to CSS
						options : {
							lessOptions: {
								// If you are using less-loader@5 please spread the lessOptions to options directly
								modifyVars: {
									/*
									 * 'layout-header-background': '#022907',
									 * 'primary-color': '#e8b600'
									 * 'primary-color': '#ffffff'
									 */
									'primary-color': '#3498db'

									/*
									 * "font-size-base": "20px",
									 * "font-family": "'Montserrat', 'Arial', sans-serif",
									 */
								},
								javascriptEnabled: true
							}
						}
					}
				]
			},
			{
				test : /\.s[ac]ss$/i,
				use  : [

					// Creates `style` nodes from JS strings
					"style-loader",

					// Translates CSS into CommonJS
					"css-loader",

					// Compiles Sass to CSS
					"sass-loader"
				]
			},
			{
				test    : /\.js$/,
				exclude : /node_modules\/(?!react-spring)/,
				use     : {
					loader: 'babel-loader'
				}
			},
			{
				test : /\.html$/,
				use  : [
					{
						loader  : 'html-loader',
						options : {
							minimize: true
						}
					}
				]
			},
			{
				test    : /\.(png|jpg|jpeg|gif|ico|svg)$/,
				exclude : [/\.inline\.svg$/],
				use     : ['url-loader']
			},
			{
				test : /\.inline\.svg$/,
				use  : ['svg-react-loader']
			},
			{
				loader  : "webpack-modernizr-loader",
				options : {
					// Full list of supported options can be found in [config-all.json](https://github.com/Modernizr/Modernizr/blob/master/lib/config-all.json).
					options           : ["setClasses"],
					"feature-detects" : [
						"test/css/all",
						"test/css/flexbox",
						"test/es6/promises",
						"test/serviceworker"
					]

					/*
					 * Uncomment this when you use `JSON` format for configuration
					 * type: 'javascript/auto'
					 */
				},
				test: /\.modernizrrc$/
			}
		]
	},
	resolve: {
		alias: {
			modernizr$: path.resolve(__dirname, ".modernizrrc")
		}
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebPackPlugin({
			template : './src/index.html',
			filename : './index.html'
		}),

		/*
		 * new ScriptExtHtmlWebpackPlugin({
		 *   preload: /\.css$/,
		 *   custom: [
		 *     {
		 *       test: /(vendor|antd)/,
		 *       attribute: 'defer',
		 *     },
		 *     {
		 *       test: /^((?!vendor|antd).)*$/,
		 *       attribute: 'async',
		 *     },
		 *   ],
		 * }),
		 */
		new MiniCssExtractPlugin({
			filename      : '[name].css',
			chunkFilename : '[id].css'
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from : 'public/',
					to   : 'img/'
				},
				{
					from : 'toROOT/',
					to   : ''
				}
			]
		}),

		//создание .gz файлов
		new CompressionPlugin({
			// filename: '[path].gz[query]',
			// algorithm: 'gzip',
			// // .js и .css файлы
			// test: /\.js$|\.css$/,
			// //минимальное соотношение размеров сжатого и исходного файлов
			minRatio: 2,

			// //удаление исходных файлов
			deleteOriginalAssets : true,
			filename             : '[path].gz[query]',
			algorithm            : 'gzip',
			test                 : /\.(js|css|svg)$/

			/*
			 * threshold: 8192,
			 * minRatio: 0.8
			 */
		}),

		/*
		 * new BrotliPlugin({ //brotli plugin
		 *   asset: '[path].br[query]',
		 *   test: /\.(js|css|html|svg)$/,
		 *   threshold: 10240,
		 *   minRatio: 0.8
		 * }),
		 * new BundleAnalyzerPlugin(),
		 */
		new PreloadWebpackPlugin({
			rel           : 'prefetch',
			as            : 'style',
			fileBlacklist : [/\.(js|ttf|png|eot|jpe?g|svg)/],
			include       : 'allChunks'
		})
	],
	externals: {
		// global app config object
		config: JSON.stringify({
			apiUrl: SERVER_URL
		})
	}
}
