
/**
 * Components dependencies
 */

var debug = require('debug')('TFP:config');

/**
 * Configuration object
 */

var config = {};

/**
 * Main configuration (Global var)
 */

var host = main_config.hostname;

/**
 * Set routes client-side
 *
 * @api private
 */

module.exports = function(){
  var env = 'localhost' == host ? 'dev' : 'prod';

  debug('Env: `%s`', env);

  config.env = env;
  config.async_path = 'dev' == env ? '/wpwork' : '';

  return config;
};
