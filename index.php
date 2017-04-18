<?php
get_header();
while (have_posts()) { the_post();
  the_title();
} ?><input type="text"><?php
get_footer();
