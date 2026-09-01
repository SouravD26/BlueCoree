<?php
/**
 * Service card (grid variant — used on About and related listings).
 * Expects: $s (SERVICES row), optional $i for numbering.
 */
if (empty($s)) {
    return;
}
$i    = $i ?? 0;
$tags = service_tags($s['slug']);
?>
<article class="svc-card reveal" data-cat="<?= e($s['cat']) ?>">
  <span class="svc-num"><?= str_pad((string) ($i + 1), 2, '0', STR_PAD_LEFT) ?></span>
  <h3><?= e($s['title']) ?></h3>
  <p><?= e($s['desc']) ?></p>
  <?php if ($tags): ?>
    <div class="svc-tags">
      <?php foreach ($tags as $tag): ?>
        <span class="tag"><?= e($tag) ?></span>
      <?php endforeach; ?>
    </div>
  <?php endif; ?>
  <a class="tlink" href="<?= url('service.php?s=' . urlencode($s['slug'])) ?>">
    Explore <i class="fa-solid fa-arrow-up-right-from-square"></i>
  </a>
</article>
