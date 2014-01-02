
/**
 * Components dependencies
 */

var o = require('jquery');
var routing = require('./routing');
var debug = require('debug')('TFP');

/**
 * Expose `core`
 */

module.exports = TFP;

/**
 * Twentyfourteen plus component
 * @param {String} name description
 */

function TFP(){
  if (!(this instanceof TFP)) return new TFP();
  debug('Twentyfourteen plus is starting ...');

  // init
  this.init();

  // Init client-side routing
  routing();
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
  this.els.body.removeAttr('data-config');
};
