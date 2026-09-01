<?php
/** Compact dark hero for inner pages. Expects $ph_title, optional $ph_sub, $ph_crumb. */
if (!defined('BASE_URL')) {
    require_once __DIR__ . '/../config.php';
}
?>
<section class="page-hero">
  <div class="wrap">
    <nav class="crumb" aria-label="Breadcrumb">
      <a href="<?= url('index.php') ?>">Home</a>
      <i class="fa-solid fa-chevron-right"></i>
      <span><?= e($ph_crumb ?? $ph_title ?? '') ?></span>
    </nav>
    <h1><?= e($ph_title ?? '') ?></h1>
    <?php if (!empty($ph_sub)): ?><p><?= e($ph_sub) ?></p><?php endif; ?>
  </div>
</section>
