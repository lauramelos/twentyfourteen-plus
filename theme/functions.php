<?php

/**
 * Loading custom scripts files
 */

function theme_scripts() {
  wp_enqueue_script( 'theme-core', get_stylesheet_directory_uri() . '/core.js' );
  wp_enqueue_script( 'theme-main', get_stylesheet_directory_uri() . '/main.js' );
}

add_action( 'wp_enqueue_scripts', 'theme_scripts' );
?>
