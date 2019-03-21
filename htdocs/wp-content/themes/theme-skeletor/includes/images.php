<?php

/* Generate better quality pictures */
function regenerate_thumbnail_quality() {
  return 95;
}
add_filter( 'jpeg_quality', 'regenerate_thumbnail_quality');

/* Add lazy class to post images / content images for lazyloading */
function lazyload_add_img_class( $class ) {
  return $class . ' lazy';
}
add_filter( 'get_image_tag_class', 'lazyload_add_img_class' );
