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
        $output = '<a href="' . $item->url . '" title="'. $item->title . '"><i class="fab fa-facebook"></i></a>';
        break;

      case 'twitter':
        $output = '<a href="' . $item->url . '" title="'. $item->title . '"><i class="fab fa-twitter"></i></a>';
        break;

      case 'youtube':
        $output = '<a href="' . $item->url . '" title="'. $item->title . '"><i class="fab fa-youtube"></i></a>';
        break;

      case 'pinterest':
        $output = '<a href="' . $item->url . '" title="'. $item->title . '"><i class="fab fa-pinterest"></i></a>';
        break;

      default:
        $output = $output = '<a href="' . $item->url . '" title="'. $item->title . '"><i class="fas fa-'. strtolower($item->title) .'"></i></a>'; /* Placeholder */
        break;
    }
  }
  return $output;
}
