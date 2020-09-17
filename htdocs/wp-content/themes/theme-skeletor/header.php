<!doctype html>
<html <?php language_attributes(); ?>>
  <head>
    <!--
    "Not all mobile browsers handle orientation changes in the same way.
    For example, Mobile Safari often just zooms the page when changing
    from portrait to landscape, instead of laying out the page as it
    would if originally loaded in landscape. If web developers want their
    scale settings to remain consistent when switching orientations on the
    iPhone, they must add a maximum-scale value to prevent this zooming,
    which has the sometimes-unwanted side effect of preventing users from zooming in."
    https://developer.mozilla.org/en-US/docs/Mozilla/Mobile/Viewport_meta_tag#Viewport_width_and_screen_width

    Users can enable zoom in browser settings if they want.
    -->
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <?php wp_head(); ?>
  </head>
  <?php
  global $is_anon;
  $is_anon = !is_user_logged_in();
  ?>
  <body <?php body_class([
    !$is_anon ? 'user-logged-in' : 'user-not-logged-in',
  ]);?> itemscope itemtype="http://schema.org/WebPage">

  <a class="skip-link screen-reader-text" href="#content">
    <?=pll__('Skip to content')?>
  </a>

  <header id="navigation">
    <div class="container">
      <div class="site-branding" itemprop="logo">
        <a class="plain-link" href="<?=get_home_url()?>" title="logo">
          <?= \rnb\media\inline_svg('/build/img/logo.svg'); ?>
        </a>
      </div>
      <nav id="primary-navigation" class="primary-navigation" role="navigation" itemscope
      itemtype="http://schema.org/SiteNavigationElement">
        <?php wp_nav_menu([
          'theme_location' => 'primary',
        ]); ?>
      </nav>
      <button id="menu-toggle" aria-controls="primary-menu" aria-expanded="false">
        <span class="hamburger_wrapper">
          <span class="hamburger"></span>
        </span>
      </button>
    </div>
  </header>

  <main id="content">

