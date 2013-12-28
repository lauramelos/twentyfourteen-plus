
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
  this.els.body.removeAttr('data-config');
};

/**
 * Declare routes client-side
 *
 * @api private
 */

TFP.prototype.router = function(){
  var self = this;
  page('*', function(ctx, next){
    if (ctx.init) return next();

    req
    .get(ctx.path)
    .set('X-Requested-With', 'XMLHttpRequest')
    .end(function(res){
      if (res.ok) {
        self.markup(res.text);
      }
    });
  });

  page();
};

/**
 * Print async markup response
 * 
 * @param {String} html
 * @param {String|jQuery} el
 *
 * @api private
 */

TFP.prototype.markup = function(html, el){
  el = el ? o(el) : this.els.primary;
  el.html(html);

  var y = el.position().top;
  this.els.body.animate({
    scrollTop: y
  }, 0);
};
