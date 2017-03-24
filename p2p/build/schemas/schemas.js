var mongoose = require('mongoose');

var InvestSchema = new mongoose.Schema({
	id: String,
	name: String,
	Quota: Number,
	term: Number,
	interestRate: String,
	Hike: String,
	schedule: String,
	Balance: String,
	startTime: String,
	invested: Number,
	expected: Number,
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
});

InvestSchema.pre('save', function(next) {
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	} else {
		this.meta.updateAt = Date.now();
	}

	next();
});

InvestSchema.statics = {
	fetch: function (cb) {
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb)
	},
	findById: function (id, cb) {
		return this
			.findOne({_id: id})
			.exec(cb)
	}
};

module.exports = InvestSchema;
