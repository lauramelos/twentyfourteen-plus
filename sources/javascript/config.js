
/**
 * Components dependencies
 */

var debug = require('debug')('TFP:config');

/**
 * Configuration object
 */

var config = {
  "dev": {
    "hostname": "localhost"
  },

  "prod": {
  }
};

var host = main_config.hostname;

/**
 * Set routes client-side
 *
 * @api private
 */

module.exports = function(){
  var env = main_config.hostname == config.dev.hostname ? 'dev' : 'prod';

  debug('Environment detected: `%s`', env);

  var conf = config[env];
  conf.env = env;
  conf.hostname = main_config.hostname;

  debug('hostname under `%s`: `%s`', conf.env, conf.hostname);

  conf.async_path = 'dev' == env ? '/wpwork' : '';

  return conf;
};
