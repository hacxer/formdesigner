var requirejs = require('requirejs');
var path = require('path');

var base = path.join(__dirname, '..', 'public', 'rsrc');
console.log(base);

requirejs.config({
	nodeRequire: require,
	baseUrl: base,
	paths: {
		"tmpl": "../templates",
		"moment": "../assets/components/moment/moment",
		"underscore": "../assets/components/underscore/underscore",
		"backbone": "../assets/components/backbone/backbone-min",
		"text": "../assets/components/text/text"
	},
	shim: {
        'underscore': {
          exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone',
			
        }
    }
});

requirejs(['jquery', 'models/fields/FieldModel', 'models/fields/SelectFieldModel'], 
	
	function($, FieldModel, SelectFieldModel) {
		//the jquery.alpha.js and jquery.beta.js plugins have been loaded.
		});
	}
);

