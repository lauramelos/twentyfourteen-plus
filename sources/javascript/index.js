
/**
 * Components dependencies
 */

var page = require('page');
var o = require('jquery');

/**
 * Expose `core`
 */

module.exports = TFP;


/**
 * Twentyfourteen plus component
 */

function TFP(){
  console.log('EPA !!');
  if (!(this instanceof TFP)) return new TFP();

  // init
  this.init();

  // page
  this.router();
};

/**
 * Init stuff
 *
 * @api private
 */

TFP.prototype.init = function(){
  // get DOM elements reference
  this.els = {
    body: o('body')
  };

  // configure object
  this.config = this.els.body.data('config');
};


/**
 * Declare routes client-side
 *
 * @api private
 */

TFP.prototype.router = function(){
  var root = 'localhost' == this.config.hostname ? '/wpwork' : '';

  // structure base, category and tag routes
  for (var k in this.config.permalink){
    var v = this.config.permalink[k];
    var r = v.replace(/%([a-z0-9-]*)%/g, ':$1');
    r = root + ('/' == r[0] ? r : '/' + r);

    if ('category' == k || 'tag' == k) {
      r += '/:' + k;
    }

    page(r, function(ctx, next){
    });
  }

  // add archive route
  page(root + '/:year/:month', function(ctx, next){
  });

  // default
  page(root + '/:postname', function(ctx, next){
  });

  page();
};
