<?php
/**
 * The main template file
 *
 * Main template
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen_Plus
 * @since Twenty Fourteen Plus 1.0
 */

get_template_part('head', 'head');
?>

<body <?php body_class(); ?>>
  <div id="page" class="hfeed site">
    <?php get_header(); ?>

    <div id="main" class="site-main">
      <div id="main-content" class="main-content">
        <?php if ( is_front_page() && twentyfourteen_has_featured_posts() ) : ?>
          <div id="featured-content" class="featured-content">
          </div><!-- #featured-content .featured-content -->
          <?php endif; ?>

        <div id="primary" class="content-area">
          <?php get_template_part('./partials/' . get_current_theme_tpl()) ?>
        </div><!-- #primary -->

        <?php if (is_active_sidebar( 'sidebar-2' ) ) : ?>
          <div id="content-sidebar" class="content-sidebar widget-area" role="complementary">
          </div><!-- #content-sidebar -->
        <?php endif; ?>

      </div><!-- #main-content -->

      <div id="secondary"></div>

    </div><!-- #main -->

    <footer id="colophon" class="site-footer" role="contentinfo"></footer>
	  <?php wp_footer(); ?>
  </div><!-- #page -->
</body>
