<?php
function rnb_setup_gutenberg() {
  $theme_var = json_decode( file_get_contents(__DIR__ . "/../app/shared-variables.json") );
  $theme_color_palet = [];
  foreach($theme_var->colors as $key => $value) {
    if (substr($value, 0, 1) === '#') {
      $theme_color_palet[] = [
        'name' => __( ucfirst($key), 'rnb' ),
        'slug' => $key,
        'color' => $value,
      ];
    }
  }
  
  $theme_color_palet[] = [
    'name' => __('hollow', 'rnb'),
    'slug' => 'hollow',
    'color' => 'transparent',
  ];
  
  add_theme_support( 'editor-color-palette', $theme_color_palet );
  add_theme_support( 'disable-custom-colors' );
  add_theme_support( 'align-wide' );
}

add_action( 'after_setup_theme', 'rnb_setup_gutenberg' );

add_theme_support( 'editor-font-sizes', array(
	array(
		'name'      => __( 'Regular', 'rnb' ),
		'shortName' => __( 'M', 'rnb' ),
		'size'      => 16,
		'slug'      => 'regular',
	),
	array(
		'name'      => __( 'Ingressi', 'rnb' ),
		'shortName' => __( 'I', 'rnb' ),
		'size'      => 24,
		'slug'      => 'ingressi'
	),
	array(
		'name'      => __( 'Small', 'rnb' ),
		'shortName' => __( 'S', 'rnb' ),
		'size'      => 13,
		'slug'      => 'small'
	),
	array(
		'name'      => __( 'Large', 'rnb' ),
		'shortName' => __( 'L', 'rnb' ),
		'size'      => 20,
		'slug'      => 'large'
	),
	array(
		'name'      => __( 'Huge', 'rnb' ),
		'shortName' => __( 'XL', 'rnb' ),
		'size'      => 24,
		'slug'      => 'xtra_larger'
	)
) );
?>