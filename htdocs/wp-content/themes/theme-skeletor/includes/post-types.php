<?php
add_action('init', function() {
  add_post_type_support('page', 'excerpt');

  /*register_post_type('event', [
    'labels' => [
      'name' => pll__('Events'),
      'singular_name' => pll__('Event'),
    ],
    //'description' => __('description'),
    'public' => true,
    'rewrite' => [
      'slug' => 'event',
      'with_front' => false,
    ],
    'has_archive' => true,
    'exclude_from_search' => false,
    'publicly_queryable' => null,
    'show_ui' => true,
    'show_in_nav_menus' => null,
    'hierarchical' => false,
    'supports' => [
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
    ],
    'taxonomies' => [
      //'post_tag',
      //'category',
      // 'event_category'
    ],
    'capability_type' => 'post',
  ]);*/

});
