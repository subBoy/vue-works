var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var glob = require('glob')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var env = config.build.env

var webpackConfig = merge(baseWebpackConfig, {
	module: {
		rules: utils.styleLoaders({
			sourceMap: config.build.productionSourceMap,
			extract: true
		})
	},
	devtool: config.build.productionSourceMap ? '#source-map' : false,
	output: {
		path: config.build.assetsRoot,
		filename: utils.assetsPath('js/[name].[chunkhash].js'),
		chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
	},
	plugins: [
		// http://vuejs.github.io/vue-loader/en/workflow/production.html
		new webpack.DefinePlugin({
			'process.env': env
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			},
			sourceMap: true
		}),
		// extract css into its own file
		new ExtractTextPlugin({
			filename: utils.assetsPath('css/[name].[contenthash].css')
		}),
		// generate dist index.html with correct asset hash for caching.
		// you can customize output by editing /index.html
		// see https://github.com/ampedandwired/html-webpack-plugin
		// new HtmlWebpackPlugin({
		//   filename: config.build.index,
		//   template: 'index.html',
		//   inject: true,
		//   minify: {
		//     removeComments: true,
		//     collapseWhitespace: true,
		//     removeAttributeQuotes: true
		//     // more options:
		//     // https://github.com/kangax/html-minifier#options-quick-reference
		//   },
		//   // necessary to consistently work with multiple chunks via CommonsChunkPlugin
		//   chunksSortMode: 'dependency'
		// }),
		// // split vendor js into its own file
		// new webpack.optimize.CommonsChunkPlugin({
		//   name: 'vendor',
		//   minChunks: function (module, count) {
		//     // any required modules inside node_modules are extracted to vendor
		//     return (
		//       module.resource &&
		//       /\.js$/.test(module.resource) &&
		//       module.resource.indexOf(
		//         path.join(__dirname, '../node_modules')
		//       ) === 0
		//     )
		//   }
		// }),
		// extract webpack runtime and module manifest to its own file in order to
		// prevent vendor hash from being updated whenever app bundle is updated
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest',
			chunks: ['vendor']
		})
	]
})

if (config.build.productionGzip) {
	var CompressionWebpackPlugin = require('compression-webpack-plugin')

	webpackConfig.plugins.push(
		new CompressionWebpackPlugin({
			asset: '[path].gz[query]',
			algorithm: 'gzip',
			test: new RegExp(
				'\\.(' +
				config.build.productionGzipExtensions.join('|') +
				')$'
			),
			threshold: 10240,
			minRatio: 0.8
		})
	)
}

function getEntry(globPath) {
	var entries = [],
		basename, tmp, pathname;

	glob.sync(globPath).forEach(function(entry) {
		basename = path.basename(entry, path.extname(entry));
		tmp = entry.split('/').splice(-3);
		pathname = tmp.splice(0, 1) + '/' + basename; // 正确输出js和html的路径
		entries[pathname] = entry;
	});
	return entries;
}

var pages = getEntry('./src/module/**/*.html');

for (var pathname in pages) {
	// 配置生成的html文件，定义路径等
	var conf = {
		filename: pathname + '.html',
		template: pages[pathname], // 模板路径
		chunks: [pathname, 'vendor', 'manifest'], // 每个html引用的js模块
		inject: true, // js插入位置
		minify: { //压缩HTML文件
			removeComments: true, //移除HTML中的注释
			collapseWhitespace: false, //删除空白符与换行符
			removeAttributeQuotes: true  //去除属性引用
		}
	};
	// 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
	module.exports.plugins.push(new HtmlWebpackPlugin(conf));


if (config.build.bundleAnalyzerReport) {
	var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
	webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
