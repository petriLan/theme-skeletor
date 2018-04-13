<?php
// Put potentially dangerous stuff here.
// That means controversial stuff that doesn't go under any other files, or is
// subject to cause bugs.

/* add_filter('page_template', function() {
  // Allows child page to use parent page template.
  $page = get_queried_object();
  $parent_id = $page->post_parent;
  $templates = array();
  $template = get_post_meta($page->ID, "_wp_page_template", true);

  if (!empty($template) && $template !== "default") {
    return locate_template($template);
  }


  if ($parent_id === 0) {
    // Default hierarchy
    $templates[] = "page-{$page->post_name}.php";
    $templates[] = "page-{$page->ID}.php";
    $templates[] = "page.php";
  } else {
    $parent = get_post($parent_id);
    // Current first
    $templates[] = "page-{$page->post_name}.php";
    $templates[] = "page-{$page->ID}.php";

    // Parent second
    $templates[] = "page-{$parent->post_name}.php";
    $templates[] = "page-{$parent->ID}.php";
    $templates[] = "page.php";
  }

  return locate_template($templates);
}); */
