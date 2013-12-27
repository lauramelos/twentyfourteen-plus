
/**
 * Components dependencies
 */

var page = require('page');
var o = require('jquery');
var req = require('superagent');
var debug = require('debug')('TFP');

/**
 * Expose `core`
 */

module.exports = TFP;


/**
 * Twentyfourteen plus component
 */

function TFP(){
  if (!(this instanceof TFP)) return new TFP();
  debug('Twentyfourteen plus is starting ...');

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
    body: o('body'),
    primary: o('#primary')
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

    if ('category' == k || 'tag' == k) {
      r += '/:' + k;
    }

    r = root + ('/' == r[0] ? r : '/' + r);

    debug ('add `%s` route', r);
  }

  var self = this;
  page('*', function(ctx, next){
    if (ctx.init) return next();
    req
    .get(ctx.path)
    .set('X-Requested-With', 'XMLHttpRequest')
    .end(function(res){
      if (res.ok) {
        self.els.primary.html(res.text);
      }
    });
  });

  // add archive route
  debug ('add archive route');
  page(root + '/:year/:month', function(ctx, next){
  });

  // default
  debug ('add default route');
  page(root + '/:postname', function(ctx, next){
  });

  page();
};
