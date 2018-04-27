<?php
/**
 * Template for single item.
 *
 * @param array props
 */
function single_item($props = []) { ?>
  <article>
    <h3><?=$data['title'] ?? 'Default title'?></h3>
    <?=\rnb\template\readmore()?>
  </article><?php
}
