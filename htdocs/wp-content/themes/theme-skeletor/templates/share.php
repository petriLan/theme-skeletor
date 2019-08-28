<?php
/**
 * Template for single item.
 *
 * @param array props
 *
 * Default include <?php \rnb\template\output('some', []); ?>
 *
 */

function share($props = []) { ?>
  <?php
  $page_id = get_the_id();
  $home_url = get_home_url();
  $link = get_the_permalink();
  ?>
  <div class="share-links">
    <ul>
      <li class="fb"><a href="https://www.facebook.com/sharer/sharer.php?u=#<?= $link; ?>" title="facebook-link" aria-label="facebook"><i class="fab fa-facebook-f"></i></a></li>
      <li class="twitter"><a href="https://twitter.com/intent/tweet?url=<?= urlencode($link); ?>" title="twitter-link" aria-label="twitter"><i class="fab fa-twitter"></i></a></li>
      <li class="mail"><a href="mailto:<?php echo get_option('admin_email');?>?subject=<?php echo $home_url . ' - ' . get_the_title($page_id); ?>" title="mail-link" aria-label="email"><i class="fal fa-envelope"></i></a></li>
    </ul>
  </div>
<?php
}
