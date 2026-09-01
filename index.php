<?php
require_once __DIR__ . '/config.php';

$page_title = SITE['name'] . ' — IT Infrastructure, Cloud & Web Development';
$hero       = true;

require __DIR__ . '/includes/header.php';
?>

<!-- ================= HERO ================= -->
<section class="hero">
  <div class="wrap hero-grid">
    <span class="pill reveal">
      <b><span class="ping"></span> Available</b> Taking projects for <?= date('F Y') ?>
    </span>

    <h1 class="reveal">
      We keep it running<br>
      <span class="thin">and we</span> <span class="accent">build what's next.</span>
    </h1>

    <div class="hero-sub">
      <p class="reveal"><?= e(SITE['name']) ?> is an IT services company with a development
        studio attached. Computers, networks, CCTV and cloud accounts on one side — websites,
        e-commerce and mobile apps on the other. One partner, one invoice, one number to call.</p>
      <div class="hero-btns reveal">
        <a href="<?= url('services.php') ?>" class="btn btn-light">See our services <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
        <a href="<?= url('contact.php') ?>" class="btn btn-ghost-d">Get in touch</a>
      </div>
    </div>

    <div class="hero-cards rise">
      <div class="hcard">
        <i class="fa-solid fa-server"></i>
        <h4>Infrastructure</h4>
        <p>Hardware, AMC, CCTV, biometrics, networks and firewalls — supplied, installed and supported.</p>
      </div>
      <div class="hcard">
        <i class="fa-solid fa-cloud"></i>
        <h4>Cloud &amp; Software</h4>
        <p>Microsoft 365, business email, hosting, SSL and accounting software, correctly configured.</p>
      </div>
      <div class="hcard">
        <i class="fa-solid fa-code"></i>
        <h4>Build</h4>
        <p>Websites, online stores, custom web applications and Android &amp; iOS apps.</p>
      </div>
    </div>
  </div>
</section>

<?php require __DIR__ . '/includes/marquee.php'; ?>

<!-- ================= SERVICES ================= -->
<section class="section" id="services">
  <div class="wrap">
    <div class="sec-head reveal">
      <div>
        <span class="label">What we do</span>
        <h2>Eighteen services. One accountable team.</h2>
      </div>
      <p class="lead">Filter by practice — or browse everything. Each service links to
        exactly what is included and how it is delivered.</p>
    </div>

    <div class="chips reveal">
      <button class="chip active" data-filter="all">All <span><?= count(SERVICES) ?></span></button>
      <?php foreach (CATEGORIES as $key => $label): ?>
        <button class="chip" data-filter="<?= e($key) ?>">
          <?= e($label) ?> <span><?= count(services_by_cat($key)) ?></span>
        </button>
      <?php endforeach; ?>
    </div>

    <div class="svc-rows" id="svcRows">
      <?php foreach (SERVICES as $i => $s) {
          include __DIR__ . '/includes/service-row.php';
      } ?>
    </div>
  </div>
</section>

<!-- ================= STATS ================= -->
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

<!-- ================= WHY US ================= -->
<section class="section">
  <div class="wrap split">
    <div class="reveal">
      <span class="label">Why us</span>
      <h2>Most IT problems are really vendor problems.</h2>
      <p class="lead">When the printer, the network and the website belong to three different
        companies, every fault turns into a negotiation. We hold all three, so there is
        nobody left to blame — including us.</p>
      <div class="hero-btns" style="margin-top:2rem">
        <a href="<?= url('about.php') ?>" class="btn btn-line">About the company <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
      </div>
    </div>

    <ul class="feature-list reveal">
      <li><span class="fnum">01</span><div><b>One point of contact</b><span>Supply, install, configure and support handled by the same team that quoted it.</span></div></li>
      <li><span class="fnum">02</span><div><b>Response times in writing</b><span>Priority remote support, same-day on-site visits for AMC clients — committed, not implied.</span></div></li>
      <li><span class="fnum">03</span><div><b>Genuine hardware and licences</b><span>Authentic equipment and licensed software. No grey-market shortcuts that fail an audit.</span></div></li>
      <li><span class="fnum">04</span><div><b>Itemised, honest quotes</b><span>You see every line before approving. If you do not need it, we say so.</span></div></li>
      <li><span class="fnum">05</span><div><b>You keep the keys</b><span>Domains, licences and repositories stay in your name. Documentation and training on handover.</span></div></li>
    </ul>
  </div>
</section>

<!-- ================= PROCESS ================= -->
<section class="section bg-alt">
  <div class="wrap">
    <div class="sec-head reveal">
      <div>
        <span class="label">How we work</span>
        <h2>Audit, plan, build, launch, scale.</h2>
      </div>
      <p class="lead">The same five steps whether we are wiring an office or shipping an app.</p>
    </div>
    <div class="timeline rise">
      <?php foreach (PROCESS as $i => [$title, $text]): ?>
        <div class="tl-step">
          <span class="tl-n"><?= str_pad((string) ($i + 1), 2, '0', STR_PAD_LEFT) ?></span>
          <h3><?= e($title) ?></h3>
          <p><?= e($text) ?></p>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- ================= TESTIMONIALS ================= -->
<section class="section">
  <div class="wrap">
    <div class="sec-head reveal">
      <div>
        <span class="label">Clients</span>
        <h2>What they say afterwards.</h2>
      </div>
    </div>

    <div class="tst reveal" id="tst">
      <div class="tst-viewport">
        <div class="tst-track" id="tstTrack">
          <?php foreach (TESTIMONIALS as $t): ?>
            <div class="tst-item">
              <blockquote class="tst-quote">&ldquo;<?= e($t['quote']) ?>&rdquo;</blockquote>
              <div class="tst-by">
                <span class="tst-av"><?= e(mb_substr($t['name'], 0, 1)) ?></span>
                <div>
                  <b><?= e($t['name']) ?></b>
                  <small><?= e($t['company']) ?></small>
                </div>
              </div>
            </div>
          <?php endforeach; ?>
        </div>
      </div>
      <div class="tst-nav">
        <button class="tst-btn" id="tstPrev" aria-label="Previous testimonial"><i class="fa-solid fa-arrow-left"></i></button>
        <button class="tst-btn" id="tstNext" aria-label="Next testimonial"><i class="fa-solid fa-arrow-right"></i></button>
        <span class="tst-count" id="tstCount">01 / <?= str_pad((string) count(TESTIMONIALS), 2, '0', STR_PAD_LEFT) ?></span>
      </div>
    </div>
  </div>
</section>

<?php
require __DIR__ . '/includes/cta.php';
require __DIR__ . '/includes/footer.php';
