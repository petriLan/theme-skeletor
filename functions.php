<?php

foreach (glob(dirname(__FILE__) . "/includes/*") as $filename) {
  require_once($filename);
}
