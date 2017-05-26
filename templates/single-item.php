<?php
/**
 * Template for single item.
 *
 * @param array $data
 */
function single_item($data = []) { ?>
  <article>
    <h3><?=$data['title'] ?? 'Default title'?></h3>
    <?=\rnb\template\readmore()?>
  </article><?php
}
