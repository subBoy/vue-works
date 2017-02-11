var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
	loaders: utils.cssLoaders({
		sourceMap: isProduction
			? config.build.productionSourceMap
			: config.dev.cssSourceMap,
		extract: isProduction
	}),
	postcss: [
		require('autoprefixer')({
			browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
		})
	]
}
