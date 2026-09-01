<?php
/**
 * Numbered service row (editorial list style).
 * Expects: $s (SERVICES row), $i (zero-based index for numbering).
 */
if (empty($s)) {
    return;
}
$i    = $i ?? 0;
$tags = service_tags($s['slug']);
?>
<a class="svc-row reveal" data-cat="<?= e($s['cat']) ?>"
   href="<?= url('service.php?s=' . urlencode($s['slug'])) ?>">
  <span class="svc-num"><?= str_pad((string) ($i + 1), 2, '0', STR_PAD_LEFT) ?></span>
  <div>
    <h3><?= e($s['title']) ?></h3>
    <?php if ($tags): ?>
      <div class="svc-tags">
        <?php foreach ($tags as $tag): ?>
          <span class="tag"><?= e($tag) ?></span>
        <?php endforeach; ?>
      </div>
    <?php endif; ?>
  </div>
  <p class="svc-desc"><?= e($s['desc']) ?></p>
  <span class="svc-arrow"><i class="fa-solid fa-arrow-right"></i></span>
</a>
