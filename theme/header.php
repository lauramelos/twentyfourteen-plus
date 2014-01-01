<?php
/**
* The Header for our theme
 *
 * Everything header stuff
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen_Plus
 * @since Twenty Fourteen 1.0
 */
?>

  <?php // header image ?>
    <?php if ( get_header_image() ) : ?>
    <div id="site-header">
      <a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
        <img src="<?php header_image(); ?>" width="<?php echo get_custom_header()->width; ?>" height="<?php echo get_custom_header()->height; ?>" alt="">
      </a>
    </div>
    <?php endif; ?>

  <?php // SECTION - header ?>
  <header id="masthead" class="site-header" role="banner">
    <div class="header-main">
      <h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>

      <div class="search-toggle">
        <a href="#search-container" class="screen-reader-text"><?php _e( 'Search', 'twentyfourteen' ); ?></a>
      </div>

      <nav id="primary-navigation" class="site-navigation primary-navigation" role="navigation">
        <h1 class="menu-toggle"><?php _e( 'Primary Menu', 'twentyfourteen' ); ?></h1>
        <a class="screen-reader-text skip-link" href="#content"><?php _e( 'Skip to content', 'twentyfourteen' ); ?></a>
        <?php wp_nav_menu( array( 'theme_location' => 'primary', 'menu_class' => 'nav-menu' ) ); ?>
      </nav>
    </div>

    <div id="search-container" class="search-box-wrapper hide">
      <div class="search-box">
        <?php get_search_form(); ?>
      </div>
    </div>
  </header><!-- #masthead -->
