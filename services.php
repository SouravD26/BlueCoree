<?php
require_once __DIR__ . '/config.php';

$cat = $_GET['cat'] ?? 'all';
if ($cat !== 'all' && !array_key_exists($cat, CATEGORIES)) {
    $cat = 'all';
}
$list = services_by_cat($cat);

$page_title = ($cat === 'all' ? 'Services' : CATEGORIES[$cat]) . ' — ' . SITE['name'];
$page_desc  = 'Bluecoree services: ' . implode(', ', array_column($list, 'title')) . '.';

$ph_title = $cat === 'all' ? 'Services' : CATEGORIES[$cat];
$ph_sub   = 'Infrastructure, cloud and software, and everything we build on the web. '
          . count($list) . ' services, delivered and supported by one team.';
$ph_crumb = 'Services';

require __DIR__ . '/includes/header.php';
require __DIR__ . '/includes/page-hero.php';
?>

<section class="section">
  <div class="wrap">
    <div class="chips reveal">
      <a class="chip<?= $cat === 'all' ? ' active' : '' ?>" href="<?= url('services.php') ?>">
        All <span><?= count(SERVICES) ?></span>
      </a>
      <?php foreach (CATEGORIES as $key => $label): ?>
        <a class="chip<?= $cat === $key ? ' active' : '' ?>" href="<?= url('services.php?cat=' . urlencode($key)) ?>">
          <?= e($label) ?> <span><?= count(services_by_cat($key)) ?></span>
        </a>
      <?php endforeach; ?>
    </div>

    <div class="svc-rows">
      <?php foreach ($list as $i => $s) {
          include __DIR__ . '/includes/service-row.php';
      } ?>
    </div>
  </div>
</section>

<?php require __DIR__ . '/includes/marquee.php'; ?>

<section class="section">
  <div class="wrap">
    <div class="sec-head reveal">
      <div>
        <span class="label">How we work</span>
        <h2>Every service follows the same five steps.</h2>
      </div>
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

<?php
$cta_title = 'Not sure which of these you need?';
$cta_text  = 'Describe the situation in a sentence. We will tell you what actually solves it — and what you can skip.';
require __DIR__ . '/includes/cta.php';
require __DIR__ . '/includes/footer.php';
