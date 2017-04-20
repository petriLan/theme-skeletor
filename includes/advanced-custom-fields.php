<?php
if(function_exists("acf_add_options_page")) {
  $parent = acf_add_options_page([
    'page_title' => 'Sivuston asetukset',
    'menu_slug' => 'acf-opts'
  ]);

  if (function_exists('pll_register_string')) {
    acf_add_options_sub_page(array(
      'page_title' => 'Finnish',
      'menu_title' => 'Finnish',
      'parent_slug' => $parent['menu_slug'],
      'menu_slug' => 'acf-options'
    ));

    acf_add_options_sub_page(array(
      'page_title' => 'English',
      'menu_title' => 'English',
      'parent_slug' => $parent['menu_slug'],
    ));
  }
}
