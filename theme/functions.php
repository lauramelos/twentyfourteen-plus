<?php
/**
 * Loading custom scripts files
 */

function theme_scripts() {
  wp_enqueue_script( 'theme-core', get_stylesheet_directory_uri() . '/core.js' );
}

/**
 * Detect if it is an ajax request
 */

function isAjax(){
  if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) &&
  strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    return true;
  } else {
    return false;
  }
}

/**
 * Render an specific section using the given template
 * through an ajax request
 *
 * _GET var {string} tpl template name
 * _GET var {stron} role 
 */

function load_section() {
  global $wpdb;
  $tpl = $_GET['tpl'];
  $role = $_GET['role'];
  get_template_part($tpl, $role);
  die();
}

/**
 * Switch between complete or partial template.
 * Also store the template name into the global vars container
 */

function template_switcher($tpl) {
  $base = basename($tpl);
  $dir = dirname($tpl);

  // set template name as global var
  $GLOBALS['current_theme_template'] = substr($base, 0, -4);

  if (isAjax()) {
    return $dir . '/partials/' . $base;
  }

  return $tpl;
}

// Adding hooks
add_action( 'wp_enqueue_scripts', 'theme_scripts' );
add_action( 'wp_ajax_load_section', 'load_section');
add_filter( 'template_include', 'template_switcher', 1000 );


/**
 * Return the current theme template
 */

function get_current_theme_tpl(){
  return $GLOBALS['current_theme_template'];
?>
