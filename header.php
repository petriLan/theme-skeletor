<!doctype html>
<html>
  <head>
    <?php wp_head(); ?>
  </head>
  <?php
  global $isAnon;
  $isAnon = !is_user_logged_in();
  ?>
  <body <?php body_class([
    !$isAnon ? 'user-logged-in' : 'user-not-logged-in'
  ]);?>>

  <a class="skip-link screen-reader-text" href="#content">
    <?=pll__('Skip to content')?>
  </a>

  <header id="navigation">
    <div class="container">
      <?php wp_nav_menu([
        'theme_location' => 'primary'
      ]); ?>
    </div>
  </header>

  <main id="content">

