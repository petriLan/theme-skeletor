<?php get_header(); ?>

<div class="container" id="singular-wrap">
<?php while (have_posts()) { the_post(); ?>
  <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <header class="entry-header">
      <h1 class="entry-header__title">
        <?php the_title(); ?>
      </h1>

      <!-- add featured image -->
    </header>

    <div class="entry-content">
    <?php
      the_content();

      // If post has pagination (<!--nextpage-->). Otherwise no effect.
      wp_link_pages([
        'before' => '<div class="entry-pagination">',
        'after' => '</div>',
      ]);
    ?>
    </div>

    <footer class="entry-footer">
    <?php
      $tags = get_tags();
      if (!empty($tags)) { ?>
        <div class="entry-tags">
        <?php foreach ($tags as $tag) { ?>
          <a
            href="<?=get_term_link($tag, 'post_tag')?>"
            class="term-link entry-tags__tag"
          >
            <?=$tag->name?>
          </a>
        <?php } ?>
        </div>
      <?php }
      if (is_single()) { ?>
        <div class="entry-author">
          <span><?=pll__('Author')?>: </span>
          <span class="entry-author__name">
            <?=get_the_author()?>
          </span>
        </div>
      <?php } ?>
    </footer>
  </article>
<?php } ?>
</div>

<?php get_footer(); ?>
