require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
	process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var mongoose = require('mongoose')
var Invest = require('./models/models')
var express = require('express')
var bodyParser = require('body-parser')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()

app.use(bodyParser())

mongoose.connect('mongodb://yrd002:yrd002@192.168.1.106:9001/yourendai')

var appData = require('../data.json')

var guides = appData.guides
var slideMaps = appData.slideMaps
var newFirst = appData.newFirst
var active = appData.active
var strength = appData.strength
var latestProject = appData.latestProject
var projectList = appData.projectList

var apiRoutes = express.Router()

apiRoutes.get('/guides', function(req, res) {
	res.json({
		errno: 0,
		data: guides
	})
})

apiRoutes.get('/slide', function(req, res) {
	res.json({
		errno: 0,
		data: slideMaps
	})
})

apiRoutes.get('/update', function(req, res) {
	res.json({
		errno: 0,
		data: newFirst
	})
})

apiRoutes.get('/active', function(req, res) {
	res.json({
		errno: 0,
		data: active
	})
})

apiRoutes.get('/strength', function(req, res) {
	res.json({
		errno: 0,
		data: strength
	})
})

apiRoutes.get('/latestProject', function(req, res) {
	Invest.fetch(function (err, projectDatas) {
		if (err) {
			console.log(err)
		}
		res.json({
			errno: 0,
			data: projectDatas
		})
	});
})

apiRoutes.get('/projectList', function(req, res) {
	res.json({
		errno: 0,
		data: projectList
	})
})

app.post('/increase/project', function(req, res) {
	var formData = req.body;
	var _Invest = new Invest({
		id: formData.itemNumber,
		name: formData.itemName,
		Quota: formData.raiseAmount,
		term: formData.borrowingPeriod,
		interestRate: formData.rateReturn,
		Hike: formData.giftReturn,
		schedule: 0,
		Balance: formData.raiseAmount,
		startTime: formData.startTime
	});
	_Invest.save(function (err, invest) {
		if (err) {
			console.log(err)
		}
	});
});

app.use('/api', apiRoutes)

app.get('/', function(req, res) {
	 res.redirect('/module/index.html')
})

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
	publicPath: webpackConfig.output.publicPath,
	quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
	log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
	compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
		hotMiddleware.publish({ action: 'reload' })
		cb()
	})
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
	var options = proxyTable[context]
	if (typeof options === 'string') {
		options = { target: options }
	}
	app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

devMiddleware.waitUntilValid(function () {
	console.log('> Listening at ' + uri + '\n')
})

module.exports = app.listen(port, function (err) {
	if (err) {
		console.log(err)
		return
	}

	// when env is testing, don't need open it
	if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
		opn(uri)
	}
})
