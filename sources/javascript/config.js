
/**
 * Components dependencies
 */

var debug = require('debug')('TFP:config');

/**
 * Configuration object
 */

var config = {
  "dev": {
    "hostname": "localhost",
    "subpath": "/wpwork"
  },

  "prod": {
    "subpath": ""
  }
};

var host = main_config.hostname;

/**
 * Set routes client-side
 *
 * @api private
 */

module.exports = function(){
  // Get environment depending of current hostname
  var env = main_config.hostname == config.dev.hostname ? 'dev' : 'prod';

  debug('Environment detected: `%s`', env);

  var conf = config[env];
  conf.env = env;

  // for prod hostname is gotten from main configurarion global var (head.php)
  conf.hostname = main_config.hostname;
  debug('hostname under `%s`: `%s`', conf.env, conf.hostname);

  return conf;
};
