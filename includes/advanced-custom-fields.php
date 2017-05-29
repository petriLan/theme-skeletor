<?php
if (function_exists("acf_add_options_page")) {
  $parent = acf_add_options_page([
    'page_title' => 'Sivuston asetukset',
    'menu_slug' => 'acf-opts',
  ]);

  if (function_exists('pll_register_string')) {
    $names = pll_languages_list([
      'fields' => 'name',
    ]);


    foreach ($names as $name) {
      $fields = [
        'page_title' => $name,
        'menu_title' => $name,
        'parent_slug' => $parent['menu_slug'],
      ];

      if ($name === 'Suomi') {
        $fields['menu_slug'] = 'acf-options';
      }

      acf_add_options_sub_page($fields);
    }
  }
}
