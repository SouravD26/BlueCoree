<?php
/** Reusable dark CTA band. */
if (!defined('BASE_URL')) {
    require_once __DIR__ . '/../config.php';
}
?>
<section class="section">
  <div class="wrap">
    <div class="cta reveal">
      <span class="label on-dark">Have an idea?</span>
      <h2><?= e($cta_title ?? 'Tell us what is broken. We will tell you what it takes to fix it.') ?></h2>
      <p><?= e($cta_text ?? 'Free assessment of your current setup — hardware, network, cloud or website. No obligation, no sales script.') ?></p>
      <div class="hero-btns">
        <a href="<?= url('contact.php') ?>" class="btn btn-light">Get a free audit <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
        <a href="tel:<?= e(SITE['phone_raw']) ?>" class="btn btn-ghost-d"><i class="fa-solid fa-phone"></i> <?= e(SITE['phone']) ?></a>
      </div>
    </div>
  </div>
</section>
