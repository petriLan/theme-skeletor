<?php get_header(); ?>

<div class="container" id="search-wrap">
  <form class="search-form">
    <div class="search-form__single">
      <input type="search" name="s">
      <button type="submit" class="button">
        <span class="screen-reader-text">
          <?=pll__('Search')?>
        </span>
        <i class="fa fa-search"></i>
      </button>
    </div>
  </form>

  <?php while (have_posts()) { the_post(); ?>
    <?php \rnb\template\get('templates/simple-post.php'); ?>
  <?php } if (!have_posts()) { ?>
    <?=pll__('No search results')?>.
  <?php } ?>
</div>

<?php get_footer(); ?>
