<?php
add_action( 'after_setup_theme', 'register_custom_nav_menus' );

function register_custom_nav_menus() {
  register_nav_menus(array(
    'primary' => 'Primary navigation menu',
    'mobile' => 'Mobile navigation menu',
    'some' => 'Social media menu'

  ));
}

/*
*
* Walker for the Some menu
*
*/
add_filter( 'walker_nav_menu_start_el', 'some_icons_output', 10, 4);

function some_icons_output( $output, $item, $depth, $args ) {

  // Rework the some menu markup with fontawesome icons
  if('some' == $args->theme_location) {

    switch (strtolower($item->title)) {
      case 'facebook':
      case 'fb':
        $output = '<a href="' . $item->url . '" title="'. $item->title . '" target="_blank" rel="noreferrer">'.\rnb\media\inline_svg('/build/img/facebook.svg').'</a>';
        break;

      case 'twitter':
        $output = '<a href="' . $item->url . '" title="'. $item->title . '" target="_blank" rel="noreferrer">'.\rnb\media\inline_svg('/build/img/twitter.svg').'</a>';
        break;

      case 'youtube':
        $output = '<a href="' . $item->url . '" title="'. $item->title . '" target="_blank" rel="noreferrer">'.\rnb\media\inline_svg('/build/img/youtube.svg').'</a>';
        break;

      case 'instagram':
        $output = '<a href="' . $item->url . '" title="'. $item->title . '" target="_blank" rel="noreferrer">'.\rnb\media\inline_svg('/build/img/instagram.svg').'</a>';
        break;
    }
  }
  return $output;
}
