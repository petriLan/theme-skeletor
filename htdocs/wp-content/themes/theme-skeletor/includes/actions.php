<?php
add_action('after_setup_theme', function() {
  add_theme_support('title-tag');
  add_theme_support('custom-logo');
  add_theme_support('post-thumbnails');
  add_theme_support('html5', array(
    'search-form',
    // 'comment-form', // disabled because WP adds a "novalidate" attr on the form that is unfilterable.
    'comment-list',
    'gallery',
    'caption',
  ));

  $GLOBALS['content_width'] = 700; // Set to whatever your *content* width is.

  add_theme_support('soil-clean-up');
  add_theme_support('soil-disable-trackbacks');
  add_theme_support('soil-nav-walker');
  //add_theme_support('soil-nice-search');
  //add_theme_support('soil-relative-urls'); // While relative urls sound nicer, they don't work in practice.

  // We're versioning our assets manually.
  add_theme_support('soil-disable-asset-versioning');

  register_nav_menus(array(
    'primary' => 'Primary navigation menu',
    'mobile' => 'Mobile navigation menu',
  ));

  if (!current_user_can('edit_posts')) {
    show_admin_bar(false);
  }
});

add_action('admin_init', function() {
  // Sane media settings
  update_option('image_default_align', 'none');
  update_option('image_default_link_type', 'none');
  update_option('image_default_size', 'full');
});
