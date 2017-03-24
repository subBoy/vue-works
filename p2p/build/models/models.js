var mongoose = require('mongoose');
var InvestSchema = require('../schemas/schemas');
var Invest = mongoose.model('projectSource', InvestSchema);

module.exports = Invest;
