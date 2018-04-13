<?php

foreach (glob(dirname(__FILE__) . "/includes/*") as $filename) {
  require_once($filename);
}

\rnb\template\load_glob(dirname(__FILE__) . '/templates/*');
