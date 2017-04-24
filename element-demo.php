<?php
/**
 * Template Name: Element demo
 */

get_header(); ?>
<div class="element-demo">
  <div class="container">
    <h1>Lorem ipsum dolor sit amet</h1>
    <h2>Lorem ipsum dolor sit amet</h2>
    <h3>Lorem ipsum dolor sit amet</h3>
    <h4>Lorem ipsum dolor sit amet</h4>
    <h5>Lorem ipsum dolor sit amet</h5>
    <h6>Lorem ipsum dolor sit amet</h6>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non tortor
      blandit, iaculis odio vitae, mollis urna. Mauris venenatis auctor interdum.
      Vivamus ut felis ut leo bibendum porttitor id ac purus.</p>
  </div>

  <form class="container">
    <div class="fc-row">
      <div class="fc-1-2">
        <label>
          <strong>Name</strong>
          <input type="text">
        </label>
      </div>
      <div class="fc-1-2">
        <label>
          <strong>Email</strong>
          <input type="email">
        </label>
      </div>
    </div>
  </form>

  <div class="buttons">
    <div class="button-group">
      <div class="container">
        <button class="button">Regular</button>
        <button class="button button--hollow">Hollow</button>
      </div>
    </div>

    <div class="button-group dark">
      <div class="container">
        <button class="button bg--white color--black">
          Regular, color
        </button>
        <button class="button button--hollow bg--white color--white">
          Hollow, color
        </button>
      </div>
    </div>

    <div class="button-group">
      <div class="container">
        <a class="button" href="https://wikipedia.org/wiki/Cat">Link</a>
        <a class="button button--hollow" href="https://wikipedia.org/wiki/Dog">
          Link, hollow
        </a>
      </div>
    </div>
  </div>
</div>
<?php get_footer(); ?>
