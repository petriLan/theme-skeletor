<?php get_header(); ?>

<div class="container" id="index-wrap">
  <?php while (have_posts()) { the_post(); ?>
    <?php \rnb\template\output('single_item', [[
      'title' => get_the_title()
    ]]); ?>
  <?php } ?>
</div>

<?php get_footer(); ?>
