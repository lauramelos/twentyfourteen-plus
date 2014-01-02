
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
 * Set routes client-side
 *
 * @api private
 */

module.exports = function(){
  var body = o('body');

  page('*', function(ctx, next){
    if (ctx.init) return load_sections();

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
      return debug('WARNING: `%s` element doesn\'t detected', selector);
    } else {
      debug('detected : `%s` element', selector);
    }

    container
    .empty()
    .append(wrap.children());

    body.animate({ scrollTop: 0 }, 0);
  };

  function load_sections(){
    for (var k in sections) {
      var data = sections[k];
      //
      // check if the placeholder element exists
      if (o(data.selector).length) {

        data.action = 'load_section';

        debug('loading `%s` section', k);

        req
        .get(conf.subpath + '/wp-admin/admin-ajax.php')
        .query(data)
        .set('X-Requested-With', 'XMLHttpRequest')
        .end(function(res){
          print(res.text);
        });
      } else {
        debug('WARNING: element `%s` has not been found', data.selector);
      }
    }
  }
};
