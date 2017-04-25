<?php get_header(); ?>

<div class="container" id="archive-wrap">
  <?php \rnb\template\get('templates/archive-header.php'); ?>
  <?php while (have_posts()) { the_post(); ?>
    <?php \rnb\template\get('templates/simple-post.php'); ?>
  <?php } ?>
</div>

<?php get_footer(); ?>
