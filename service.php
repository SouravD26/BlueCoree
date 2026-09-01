<?php
require_once __DIR__ . '/config.php';

$slug    = isset($_GET['s']) ? (string) $_GET['s'] : '';
$service = find_service($slug);

if ($service === null) {
    http_response_code(404);
    $page_title = 'Service not found — ' . SITE['name'];
    $ph_title   = 'Service not found';
    $ph_sub     = 'That page does not exist. Browse everything we offer instead.';
    $ph_crumb   = '404';
    require __DIR__ . '/includes/header.php';
    require __DIR__ . '/includes/page-hero.php';
    ?>
    <section class="section">
      <div class="wrap">
        <a href="<?= url('services.php') ?>" class="btn btn-primary">All services <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
      </div>
    </section>
    <?php
    require __DIR__ . '/includes/footer.php';
    exit;
}

$index = array_search($service['slug'], array_column(SERVICES, 'slug'), true);
$tags  = service_tags($service['slug']);

$page_title = $service['title'] . ' — ' . SITE['name'];
$page_desc  = $service['desc'];
$ph_title   = $service['title'];
$ph_sub     = $service['desc'];
$ph_crumb   = CATEGORIES[$service['cat']];

$related = array_values(array_filter(
    services_by_cat($service['cat']),
    static fn (array $s): bool => $s['slug'] !== $service['slug']
));

require __DIR__ . '/includes/header.php';
require __DIR__ . '/includes/page-hero.php';
?>

<section class="section">
  <div class="wrap detail">
    <div class="reveal">
      <span class="label"><?= str_pad((string) ((int) $index + 1), 2, '0', STR_PAD_LEFT) ?> · <?= e(CATEGORIES[$service['cat']]) ?></span>

      <?php if ($tags): ?>
        <div class="svc-tags" style="margin-bottom:2rem">
          <?php foreach ($tags as $tag): ?><span class="tag"><?= e($tag) ?></span><?php endforeach; ?>
        </div>
      <?php endif; ?>

      <h2>What's included</h2>
      <p class="lead"><?= e($service['desc']) ?> Every engagement starts with an assessment
        of your current setup, so what we quote is what you actually need.</p>

      <ul class="check" style="margin-top:2rem">
        <?php foreach ($service['points'] as $point): ?>
          <li><i class="fa-solid fa-check"></i> <span><?= e($point) ?></span></li>
        <?php endforeach; ?>
      </ul>

      <h3>How we deliver it</h3>
      <ol class="steps-list">
        <?php foreach (PROCESS as [$title, $text]): ?>
          <li><b><?= e($title) ?></b> — <?= e($text) ?></li>
        <?php endforeach; ?>
      </ol>
    </div>

    <aside class="aside reveal">
      <div class="side-card dark">
        <h4>Request a quote</h4>
        <p>Pricing for <b><?= e($service['title']) ?></b>, scoped to your requirement.</p>
        <a href="<?= url('contact.php?service=' . urlencode($service['slug'])) ?>" class="btn btn-light">
          Enquire now <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
        <a href="tel:<?= e(SITE['phone_raw']) ?>" class="btn btn-ghost-d">
          <?= e(SITE['phone']) ?> <i class="fa-solid fa-phone"></i>
        </a>
      </div>

      <?php if ($related): ?>
        <div class="side-card">
          <h4>Related services</h4>
          <ul class="side-links">
            <?php foreach ($related as $r): ?>
              <li>
                <a href="<?= url('service.php?s=' . urlencode($r['slug'])) ?>">
                  <span><?= e($r['title']) ?></span>
                  <i class="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
              </li>
            <?php endforeach; ?>
          </ul>
        </div>
      <?php endif; ?>
    </aside>
  </div>
</section>

<?php
require __DIR__ . '/includes/cta.php';
require __DIR__ . '/includes/footer.php';
