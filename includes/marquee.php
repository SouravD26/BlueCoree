<?php
/** Infinite scrolling strip of platforms and brands we work with. */
if (!defined('BASE_URL')) {
    require_once __DIR__ . '/../config.php';
}
?>
<div class="marquee" aria-hidden="true">
  <div class="marquee-track">
    <?php for ($pass = 0; $pass < 2; $pass++): ?>
      <div class="marquee-item">
        <?php foreach (MARQUEE as $item): ?>
          <span><?= e($item) ?></span>
        <?php endforeach; ?>
      </div>
    <?php endfor; ?>
  </div>
</div>
