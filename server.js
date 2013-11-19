var express = require('express');
var app = express();

var compiler = require('less-middleware');

/**
 * Remove comments to these lines to enable a multi language application,
 * node-polyglot module is required
 * @see http://airbnb.github.io/polyglot.js/
 */
//var polyglot = require('node-polyglot');
//var messages = require('./messages.json');

/**
 * Application configuration file
 * @type json
 */
var config = require('./config.json');

/**
 * General application configuration
 */
app.configure(function() 
{
	app.set('views', __dirname + '/app/views');
	app.set('view engine', 'jade');

	app.use(express.cookieParser());
	app.use(express.session({ secret: '64BOjS7b81937c5b229f33fb234' }));

	app.use(express.bodyParser());

	app.use(compiler({ src: __dirname + '/app/assets/less', dest: __dirname + '/public/css', prefix: '/public/css', debug: false }));
	app.use('/public', express.static(__dirname + '/public'));
	
	app.use(function(req, res, next) {
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.locals.session = req.session;

		next();
	});
});

/**
 * Routes
 */

var controller_name = require('./app/controllers/controller_name')(config);
app.get('/', controller_name.index);

/**
 * Application start
 */
app.listen(config.listening_port);
console.log('application: started and listening on port ' + config.listening_port);