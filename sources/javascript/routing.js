
/**
 * Components dependencies
 */

var page = require('page');
var o = require('jquery');
var req = require('superagent');
var conf = require('./config')();
var debug = require('debug')('TFP:routing');

/**
 * Load complete sections
 */

var sections = {
  "sidebar": {
    tpl: 'sidebar',
    role: 'sidebar',
    selector: '#secondary'
  },

  "header":  {
    tpl: 'header',
    role: 'header',
    selector: '#masthead'
  },

  "sidebar-content":  {
    tpl: 'sidebar-content',
    role: 'sidebar-content',
    selector: '#content-sidebar'
  },

  "featured-content":  {
    tpl: 'featured-content',
    role: 'featured-content',
    selector: '#featured-content'
  },

  "footer": {
    tpl: 'footer',
    role: 'footer',
    selector: '#colophon'
  }
};

/**
 * Current path
 */

var current_path;

/**
 * Set routes client-side
 *
 * @api private
 */

module.exports = function(){
  var body = o('body');

  page('*', function(ctx, next){
    current_path = ctx.path;
    if (ctx.init) return load_sections();

    debug('loading [%s]', ctx.path);

    req
    .get(ctx.path)
    .set('X-Requested-With', 'XMLHttpRequest')
    .end(function(res){
      if (res.ok) {
        print(res.text);
      }
    });
  });

  page();

  /**
   * Print markup response
   * 
   * @param {String} html
   *
   * @api private
   */

  function print(html){
    var wrap = o('<div>', { html: html }).children();
    var id = wrap.attr('id');

    var selector = '#' + id;
    var container = body.find(selector);

    if (!container.length) {
      return debug('WARNING: [%s] element doesn\'t detected', selector);
    } else {
      debug('detected [%s] element', selector);
    }

    container
    .empty()
    .append(wrap.children())
    .addClass('section-printed');

    body.animate({ scrollTop: 0 }, 0);
  };

  function load_sections(){
    for (var k in sections) {
      var data = sections[k];
      // check if the placeholder element exists
      var selector = o(data.selector);
      if (selector.length) {
        data.action = 'load_section';
        selector.addClass('load-section');
        request(k, data);
      } else {
        debug('WARNING: element [%s] has not been found', data.selector);
      }
    }
  }

  function request(k, data) {
    var path = current_path + '?partial_tpl=' + data.tpl;
    debug('loading [%s] path', path);
    req
    .get(path)
    .set('X-Requested-With', 'XMLHttpRequest')
    .end(function(res){
      if (res.ok) {
        print(res.text);
      } else {
        debug('Error loading [%s] section', k);
      }
    });
     
  }
};
