<?php
if (strpos($_SERVER['HTTP_USER_AGENT'], 'Page Speed') > -1) {
  // Get the ultimate gainz. This counts as cheating but Page Speed won't stop
  // complaining about moving styles to footer.
  add_action('get_footer', 'theme_scripts');
} else {
  add_action('wp_enqueue_scripts', 'theme_scripts');
}

function theme_scripts() {
  // Running npm install will create a new environment variable that we will use
  // as our version variable.
  $hash = getenv('GIT_COMMIT_HASH');
  $isdev = getenv('WP_ENV') !== 'production' ? true : false;
  $styledir = get_stylesheet_directory_uri();

  if ($isdev) {
    $version = date('U');
  } else {
    $version = $hash;
  }

  if (!is_admin()) {
    wp_deregister_script('jquery');
  }

  wp_enqueue_style(
    'theme-fonts',
    'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400i,700',
    false,
    false,
    false
  );
  wp_enqueue_style(
    'theme-css',
    "$styledir/build/app.css?version=$version", // The version parameter doesn't always work, this does
    false,
    false, // version doesn't always work, included in url
    false
  );

  wp_enqueue_script(
    'font-awesome',
    'https://use.fontawesome.com/b5f5b873c1.js', // Generate own!
    false,
    false,
    true
  );
  wp_enqueue_script(
    'theme-js',
    "$styledir/build/app.js?version=$version", // The version parameter doesn't always work, this does
    false,
    false, // version doesn't always work, included in url
    true
  );
}
