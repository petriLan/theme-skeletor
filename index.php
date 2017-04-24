<?php
get_header();
while (have_posts()) { the_post();
  the_title();
} ?>
<br>
<br>
<br>
<br>
<br>
<br>
<button class="button">Hello!</button><br>
<button class="button button--hollow">Hello 2!</button>

<button class="button bg--dusty-orange">Hello!</button><br>
<button class="button button--hollow bg--dusty-orange">Hello 2!</button>
<br>
<br>
<br>
<br>
  <input type="text"><?php
get_footer();
