<?php
/**
 * Remove that pesky "Category: " prefix from archive titles.
 * Borrowed from https://wordpress.stackexchange.com/a/203884/78685
 */

namespace rnb\themes {
  function add_tag_to_title($title) {
    $dev = 'D';
    $production = 'P';

    if (\rnb\core\is_prod() && is_user_logged_in()) {
      return "[$production] $title";
    } else if (\rnb\core\is_dev()) {
      return "[$dev] $title";
    }

    // If both fail, fallback into this.

    $domains = [
      '.dev' => $dev,
      '.local' => $dev,
      'localhost' => $dev,
      '.seravo' => $production,
      '.wp-palvelu' => $production,
      get_site_url() => $production
    ];

    foreach ($domains as $domain => $tag) {
      if (strpos(\rnb\core\current_url(), $domain) > -1) {
        if ($tag === $production) {
          if (!is_user_logged_in()) {
            return $title;
          }
        }
        return "[$tag] $title";
      }
    }

    return $title;
  }

  add_filter('the_seo_framework_pro_add_title', '\rnb\themes\add_tag_to_title');
  add_filter('admin_title', '\rnb\themes\add_tag_to_title');
  add_filter('wp_title', '\rnb\themes\add_tag_to_title');
}

namespace {
  add_filter('get_the_archive_title', function ($title) {
    if (is_category()) {
      $title = single_cat_title('', false);
    } elseif (is_tag()) {
      $title = single_tag_title('', false);
    } elseif (is_author()) {
      $title = '<span class="vcard">' . get_the_author() . '</span>';
    } elseif (is_year()) {
      $title = get_the_date(_x('Y', 'yearly archives date format'));
    } elseif (is_month()) {
      $title = get_the_date(_x('F Y', 'monthly archives date format'));
    } elseif (is_day()) {
      $title = get_the_date(_x('F j, Y', 'daily archives date format'));
    } elseif (is_tax('post_format')) {
      if (is_tax('post_format', 'post-format-aside')) {
        $title = _x('Asides', 'post format archive title');
      } elseif (is_tax('post_format', 'post-format-gallery')) {
        $title = _x('Galleries', 'post format archive title');
      } elseif (is_tax('post_format', 'post-format-image')) {
        $title = _x('Images', 'post format archive title');
      } elseif (is_tax('post_format', 'post-format-video')) {
        $title = _x('Videos', 'post format archive title');
      } elseif (is_tax('post_format', 'post-format-quote')) {
        $title = _x('Quotes', 'post format archive title');
      } elseif (is_tax('post_format', 'post-format-link')) {
        $title = _x('Links', 'post format archive title');
      } elseif (is_tax('post_format', 'post-format-status')) {
        $title = _x('Statuses', 'post format archive title');
      } elseif (is_tax('post_format', 'post-format-audio')) {
        $title = _x('Audio', 'post format archive title');
      } elseif (is_tax('post_format', 'post-format-chat')) {
        $title = _x('Chats', 'post format archive title');
      }
    } elseif (is_post_type_archive()) {
      $title = post_type_archive_title('', false);
    } elseif (is_tax()) {
      $title = single_term_title('', false);
    } else {
      $title = pll__('News');
    }
    return $title;
  });
}
