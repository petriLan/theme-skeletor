<?php

define('SENDGRID_API_KEY', $_ENV["SENDGRID_API_KEY"]);

foreach (glob(dirname(__FILE__) . "/includes/*") as $filename) {
  require_once($filename);
}

\rnb\template\load_glob(dirname(__FILE__) . '/templates/*');
