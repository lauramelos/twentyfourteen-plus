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
 * Register partial_tpl query var
 */

function register_partial_tpl_query_var( $qvars ) {
  $qvars[] = 'partial_tpl';
  return $qvars;
}

/**
 * Switch between complete or partial template.
 * Also store the template name into the global vars container
 */

function template_switcher($tpl) {
  $base = basename($tpl);
  $dir = dirname($tpl);
  $tpl_name = substr($base, 0, -4);

  // check partial template in the query string
  $partial = get_query_var('partial_tpl');
  if (!empty($partial)) {
    $tpl_name = $partial;
    $tpl = $dir . '/' . $partial . '.php';

    // check if template exists
    if (!file_exists($tpl)) {
      $tpl = get_template_directory() . '/' . $partial . '.php';
    }
  } elseif (isAjax()) {
    // ajax request ?
    $tpl = $dir . '/partials/' . $base;
  }

  // set tpl global var
  $GLOBALS['current_theme_template'] = $tpl_name;

  return $tpl;
}

// Adding hooks
add_filter('query_vars', 'register_partial_tpl_query_var' );
add_action( 'wp_enqueue_scripts', 'theme_scripts' );
add_filter( 'template_include', 'template_switcher', 1000 );

/**
 * Return the current theme template
 */

function get_current_theme_tpl(){
  return $GLOBALS['current_theme_template'];
}
?>
