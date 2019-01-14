<?php

define('SENDGRID_API_KEY', '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');

foreach (glob(dirname(__FILE__) . "/includes/*") as $filename) {
  require_once($filename);
}

\rnb\template\load_glob(dirname(__FILE__) . '/templates/*');
