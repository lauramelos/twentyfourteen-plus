<?php
/**
 * The Head
 *
 * Displays all of the <head> section
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen_Plus
 * @since Twenty Fourteen 1.0
 */
?><!DOCTYPE html>
<!--[if IE 7]>
<html class="ie ie7" <?php language_attributes(); ?>>
<![endif]-->
<!--[if IE 8]>
<html class="ie ie8" <?php language_attributes(); ?>>
<![endif]-->
<!--[if !(IE 7) | !(IE 8) ]><!-->
<html <?php language_attributes(); ?>>
<!--<![endif]-->
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta name="viewport" content="width=device-width">
  <title><?php wp_title( '|', true, 'right' ); ?></title>
  <link rel="profile" href="http://gmpg.org/xfn/11">
  <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
  <!--[if lt IE 9]>
  <script src="<?php echo get_template_directory_uri(); ?>/js/html5.js"></script>
  <![endif]-->
  <?php wp_head(); ?>

  <?php
    $config = array(
      'permalink' => array(
        'structure' => get_option( 'permalink_structure' ),
        'category' => get_option( 'category_base' ),
        'tag' => get_option( 'tag_base' )
      ),
      'current_template' => get_current_theme_tpl(),
      'hostname' => $_SERVER['SERVER_NAME']
    );

    $config = json_encode($config);
  ?>

  <script>
    var main_config = <?php echo $config; ?>;
    // Start core component
    jQuery(window).ready(require('twentyfourteenplus'));
  </script>
</head>
