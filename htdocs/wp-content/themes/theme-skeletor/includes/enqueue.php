<?php

if (!defined('ABSPATH')) {
  exit();
}

/* Vagrant */
define('WPT_ENQUEUE_STRIP_PATH', '/data/wordpress/htdocs');

/* Docker */
//define('WPT_ENQUEUE_STRIP_PATH', '/var/www/html');

class RNB_Enqueue_Scripts {

  public function __construct () {
    $this->styledir = get_stylesheet_directory();

    $this->theme_var = get_transient('rnb_theme_var');
    if(!$this->theme_var) {
      $this->theme_var = json_decode( file_get_contents(__DIR__ . "/../app/shared-variables.json") );
      set_transient('rnb_theme_var', $this->theme_var, MONTH_IN_SECONDS);
    }

    self::rnb_enqueue_init();
  }

  private function rnb_enqueue_init () {
    if ( 'production' === getenv('WP_ENV') ) {
      add_action('wp_enqueue_scripts', [$this, 'theme_critical_scripts'], 1);
    }
    add_action('get_footer', [$this, 'theme_scripts'], 99);
    add_action('admin_enqueue_scripts', [$this, 'admin_scripts']);
    add_action( 'enqueue_block_editor_assets', [$this, 'block_editor_styles']); 
  }

  public function theme_critical_scripts () {
    $postId = get_the_ID();
    $postType = get_post_type();
    $isFront = is_front_page() || is_home();
    $default = null;
    $front = null;
    $criticalSet = false;

    // loop theme var critical types
    foreach($this->theme_var->critcalTypes as $key => $value) {
      if(isset($value->isDefault) && $value->isDefault) { // check if default critical
        $default = $value;
      }
      if(isset($value->isFront) && $value->isFront) { // check if front critical
        $front = $value;
      }

      // check if post id is set on critical
      if(is_array($value->ids) && in_array($postId, $value->ids)) {
        $file = $this->styledir . '/build' . $value->output;
        if(is_file($file)) {
          \rnb\core\enqueue($file);
          $criticalSet = true;
          break;
        }
      }

      // check if posttype set is set on critical
      if(!$isFront && is_array($value->postTypes) && in_array($postType, $value->postTypes)) {
        $file = $this->styledir . '/build' . $value->output;
        if(is_file($file)) {
          \rnb\core\enqueue($file);
          $criticalSet = true;
          break;
        }
      }
    }

    // if critical not set
    if(!$criticalSet) {
      if($isFront && $front !== null) {
        $file = $this->styledir . '/build' . $front->output;
        if(is_file($file)) {
          \rnb\core\enqueue($file);
          $criticalSet = true;
        }
      }
      elseif($default !== null) {
        $file = $this->styledir . '/build' . $default->output;
        if(is_file($file)) {
          \rnb\core\enqueue($file);
          $criticalSet = true;
        }
      }
    }
  }
  
  public function theme_scripts() {
    // if(!is_admin()) {
    //   wp_deregister_script('jquery');
    // }

    \rnb\core\enqueue($this->styledir . '/build/client.css');

    // \rnb\core\enqueue("https://use.fontawesome.com/[INSERT_HERE].js", [], true);
    \rnb\core\enqueue("https://cdn.polyfill.io/v2/polyfill.min.js?features=default,es6,fetch", [], true);
    \rnb\core\enqueue($this->styledir . '/build/client.js');

    // wp_localize_script('client-js', 'pll', pl_get_all_translations());
  }

  public function admin_scripts() {
    wp_enqueue_script('jquery');

    \rnb\core\enqueue($this->styledir . '/build/admin.css');
    \rnb\core\enqueue($this->styledir . '/build/admin.js');
  }

  public function block_editor_styles() {
    wp_enqueue_style( 'block-editor-styles', \rnb\core\enqueue($this->styledir . '/build/editor.css'), false, '1.0', 'all' );

    wp_enqueue_script(
      'rnb-editor',
      get_stylesheet_directory_uri() . '/build/editor.js',
      array( 'wp-blocks', 'wp-dom' ),
      filemtime( get_stylesheet_directory() . '/build/editor.js' ),
      true
    );
    $theme_color_palet = [];
    foreach($this->theme_var->colors as $value) {
      if (substr($value, 0, 1) === '#') {
        $theme_color_palet[] = $value;
      }
    }
    wp_localize_script( 'rnb-editor', 'colorPalette', json_encode($theme_color_palet) );
  }
}

new RNB_Enqueue_Scripts();
