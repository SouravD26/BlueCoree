<?php
require_once __DIR__ . '/config.php';

http_response_code(404);

$page_title = 'Page Not Found — ' . SITE['name'];
$page_desc  = 'The page you were looking for does not exist.';
$ph_title   = 'Page Not Found';
$ph_sub     = 'The page you were looking for has moved or never existed. Try one of these instead.';
$ph_crumb   = '404';

require __DIR__ . '/includes/header.php';
require __DIR__ . '/includes/page-hero.php';
?>

<section class="section center">
  <div class="wrap">
    <div class="hero-btns" style="justify-content:center;margin-top:0">
      <a href="<?= url('index.php') ?>" class="btn btn-primary"><i class="fa-solid fa-house"></i> Back to Home</a>
      <a href="<?= url('services.php') ?>" class="btn btn-line">Browse Services</a>
      <a href="<?= url('contact.php') ?>" class="btn btn-line">Contact Us</a>
    </div>
  </div>
</section>

<?php require __DIR__ . '/includes/footer.php'; ?>
