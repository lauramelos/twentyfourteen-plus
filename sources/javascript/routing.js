
/**
 * Components dependencies
 */

var page = require('page');
var o = require('jquery');
var req = require('superagent');
var debug = require('debug')('TFP:routing');

/**
 * Set routes client-side
 *
 * @api private
 */

module.exports = function(){
  var body = o('body');

  page('*', function(ctx, next){
    if (ctx.init) return next();

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
    debug('detected id: `%s`', id);

    var container = body.find('#' + id);

    container
    .empty()
    .append(wrap.children());

    body.animate({ scrollTop: 0 }, 0);
  };
};
