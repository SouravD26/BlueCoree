<?php
require_once __DIR__ . '/config.php';

$page_title = 'About — ' . SITE['name'];
$page_desc  = 'Bluecoree is an IT services company with a development studio attached — infrastructure, cloud and software under one roof.';
$ph_title   = 'One partner, from the wall socket to the app store.';
$ph_sub     = 'We supply and service the machines, secure the premises, run the cloud accounts, and build the software on top.';
$ph_crumb   = 'About';

require __DIR__ . '/includes/header.php';
require __DIR__ . '/includes/page-hero.php';
?>

<section class="section">
  <div class="wrap split">
    <div class="reveal">
      <span class="label">Who we are</span>
      <h2>IT support that cannot pass the blame.</h2>
    </div>
    <div class="reveal">
      <p class="lead">Most businesses juggle a hardware vendor, a network contractor, a
        hosting provider and a web agency — and spend their own time refereeing between them.
        Every fault becomes somebody else's fault.</p>
      <p><?= e(SITE['name']) ?> exists to collapse that into one relationship. The same company
        supplies your computers, wires your network, installs the cameras, configures Microsoft
        365 and builds your website. When something breaks, there is exactly one number to
        call — and nobody to point at.</p>
      <p>That works for a five-person office and for a multi-branch operation. What changes is
        the scale of the plan, not the standard of the work.</p>
      <div class="hero-btns" style="margin-top:2rem">
        <a href="<?= url('services.php') ?>" class="btn btn-primary">See all services <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
        <a href="<?= url('contact.php') ?>" class="btn btn-line">Talk to us</a>
      </div>
    </div>
  </div>
</section>

<section class="section tight stats">
  <div class="wrap">
    <div class="stats-grid rise">
      <?php foreach (STATS as $stat): ?>
        <div class="stat">
          <b><?= e($stat['prefix'] ?? '') ?><span data-count="<?= (int) $stat['value'] ?>">0</span><?= e($stat['suffix']) ?></b>
          <small><?= e($stat['label']) ?></small>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="sec-head reveal">
      <div>
        <span class="label">Principles</span>
        <h2>Four things we do not bend on.</h2>
      </div>
    </div>
    <ul class="feature-list reveal">
      <li><span class="fnum">01</span><div><b>Honesty first</b><span>If you do not need it, we say so. No inflated quotes, no upgrades you will never use.</span></div></li>
      <li><span class="fnum">02</span><div><b>Genuine only</b><span>Authentic hardware and licensed software — never grey-market shortcuts that fail an audit.</span></div></li>
      <li><span class="fnum">03</span><div><b>Show up fast</b><span>Response times we commit to in writing, and actually meet.</span></div></li>
      <li><span class="fnum">04</span><div><b>Leave you capable</b><span>Documentation and training on handover, so your team is not helpless without us.</span></div></li>
    </ul>
  </div>
</section>

<section class="section bg-alt">
  <div class="wrap">
    <div class="sec-head reveal">
      <div>
        <span class="label">Capabilities</span>
        <h2>Three practices, one company.</h2>
      </div>
      <p class="lead">Each practice stands on its own — most clients end up using all three.</p>
    </div>

    <div class="svc-grid rise">
      <?php foreach (CATEGORIES as $key => $label): $items = services_by_cat($key); ?>
        <article class="svc-card">
          <span class="svc-num"><?= e(strtoupper($key)) ?></span>
          <h3><?= e($label) ?></h3>
          <p><?= count($items) ?> services in this practice.</p>
          <div class="svc-tags">
            <?php foreach ($items as $item): ?>
              <span class="tag"><?= e($item['title']) ?></span>
            <?php endforeach; ?>
          </div>
          <a class="tlink" href="<?= url('services.php?cat=' . urlencode($key)) ?>">
            View practice <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </article>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<?php
$cta_title = 'Want a second opinion on your current setup?';
$cta_text  = 'We will audit what you have, tell you what is fine, and only quote for what is not.';
require __DIR__ . '/includes/cta.php';
require __DIR__ . '/includes/footer.php';
