<?php
add_action('init', function() {
  add_post_type_support('page', 'excerpt');

  /*register_post_type('sample_cpt', array(
    'labels' => array(
      'name' => pll__('Sample'),
      'singular_name' => pll__('Sample singular')
    ),
    //'description' => __('description'),
    'public' => true,
    'rewrite' => array('slug' => 'sample', 'with_front' => false),
    'has_archive' => true,
    'exclude_from_search' => false,
    'publicly_queryable' => null,
    'show_ui' => true,
    'show_in_nav_menus' => null,
    'hierarchical' => false,
    'supports' => array(
      'title',
      'editor',
      //'comments',
      'revisions',
      //'trackbacks',
      'author',
      'excerpt',
      'page-attributes',
      'thumbnail',
      //'custom-fields'
    ),
    'taxonomies' => array(
      //'post_tag',
      //'category',
      'event_category'
    ),
    'capability_type' => 'post',
    'capabilities' => array(
      // for fine grained control include valid capabilities here
      // if left empty 'capability_type' will define editing capability requirements
    ),
  ));*/
});
