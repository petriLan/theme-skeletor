<?php
if (function_exists('pll_register_string')) {
  // Remember, it's the second parameter that you use for pll_e
  $strings = [
    // 'context_string', 'Use this value in pll__',
    'Skip to content button' => 'Skip to content',
    'Log in' => 'Log in',
    'Log out' => 'Log out',
    'Read more' => 'Read more',
    'Email' => 'Email',
    'Password' => 'Password',
    'Back' => 'Back',
    'Search' => 'Search',
    'Instruct user to enter search term' => 'Enter search term',
    'Inform user about no results from search' => 'No search results',
    'News' => 'News'
  ];

  foreach ($strings as $ctx => $value) {
    pll_register_string($ctx, $value);
  }
}

else {
  // If Polylang isn't installed, feat not. You can still use these pll_* functions
  // without having to worry about breaking anything.
  function pll__($string) {
    return $string;
  }

  function pll_e() {
    echo $string;
  }

  function pll_get_term($term) {
    return $term;
  }
}
