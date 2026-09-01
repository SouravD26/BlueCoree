<?php
/**
 * Shared head + fixed header.
 * Pages may set: $page_title, $page_desc, $hero (bool — dark hero behind header).
 */
if (!defined('BASE_URL')) {
    require_once __DIR__ . '/../config.php';
}

$page_title = $page_title ?? SITE['name'] . ' — ' . SITE['tagline'];
$page_desc  = $page_desc  ?? 'Bluecoree is an IT services and development studio: hardware sales, service and AMC, CCTV, biometric attendance, networking and firewalls, Microsoft 365, hosting, and website, e-commerce and mobile app development.';
/* Dark backdrop behind the fixed header: the home hero, or any inner page-hero. */
$hero       = !empty($hero) || !empty($ph_title);
$over_hero  = $hero ? ' over-hero' : '';
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><?= e($page_title) ?></title>
<meta name="description" content="<?= e($page_desc) ?>">
<meta name="author" content="<?= e(SITE['name']) ?>">
<meta name="theme-color" content="#00175B">
<meta property="og:title" content="<?= e($page_title) ?>">
<meta property="og:description" content="<?= e($page_desc) ?>">
<meta property="og:type" content="website">
<link rel="icon" href="<?= asset('assets/favicon.ico') ?>" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="<?= asset('assets/favicon-32x32.png') ?>">
<link rel="icon" type="image/png" sizes="16x16" href="<?= asset('assets/favicon-16x16.png') ?>">
<link rel="apple-touch-icon" href="<?= asset('assets/apple-touch-icon.png') ?>">
<link rel="manifest" href="<?= asset('site.webmanifest') ?>">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Inter+Tight:wght@300;400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
<link rel="stylesheet" href="<?= asset('css/style.css') ?>">
</head>
<body>

<header class="header<?= $over_hero ?>" id="header" data-overhero="<?= $over_hero ? '1' : '0' ?>">
  <div class="wrap nav">
    <a href="<?= url('index.php') ?>" class="logo">
      <span class="logo-mark"><img src="<?= asset('assets/icon.png') ?>" alt="Bluecoree"></span>
      BlueCoree
    </a>

    <nav class="menu" id="menu">
      <a href="<?= url('index.php') ?>" class="<?= trim(nav_active('index.php')) ?>">Home</a>
      <a href="<?= url('services.php') ?>" class="<?= trim(nav_active('services.php')) ?>">Services</a>
      <a href="<?= url('about.php') ?>" class="<?= trim(nav_active('about.php')) ?>">About</a>
      <a href="<?= url('faq.php') ?>" class="<?= trim(nav_active('faq.php')) ?>">FAQ</a>
      <a href="<?= url('contact.php') ?>" class="<?= trim(nav_active('contact.php')) ?>">Contact</a>
      <a href="<?= url('contact.php') ?>" class="btn btn-primary btn-sm nav-cta">
        Get in touch <i class="fa-solid fa-arrow-up-right-from-square"></i>
      </a>
    </nav>

    <button class="burger" id="burger" aria-label="Toggle menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>
