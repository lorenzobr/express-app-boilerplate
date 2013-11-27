var config = null;

var WelcomeController = module.exports = function(cfg) {
	config = cfg;
	return exports;
};

exports.index = function(req, res) {
	res.render('welcome'):
};