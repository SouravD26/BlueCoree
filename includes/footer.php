<?php
/** Shared footer, floating buttons and scripts. */
if (!defined('BASE_URL')) {
    require_once __DIR__ . '/../config.php';
}
?>
<footer class="footer">
  <div class="wrap">
    <div class="f-grid">
      <div>
        <a href="<?= url('index.php') ?>" class="logo">
          <span class="logo-mark"><img src="<?= asset('assets/icon.png') ?>" alt="BlueCoree"></span>
          BlueCoree
        </a>
        <p>One partner for the machines, the network, the cloud accounts and the software
          your business runs on.</p>
        <div class="socials">
          <a href="<?= e(SITE['social']['facebook']) ?>" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
          <a href="<?= e(SITE['social']['instagram']) ?>" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
          <a href="<?= e(SITE['social']['linkedin']) ?>" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
          <a href="<?= e(SITE['social']['whatsapp']) ?>" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
        </div>
      </div>

      <?php foreach (CATEGORIES as $key => $label): ?>
        <div>
          <h4><?= e($key === 'it' ? 'Infrastructure' : ($key === 'cloud' ? 'Cloud' : 'Build')) ?></h4>
          <ul>
            <?php foreach (array_slice(services_by_cat($key), 0, 6) as $s): ?>
              <li><a href="<?= url('service.php?s=' . urlencode($s['slug'])) ?>"><?= e($s['title']) ?></a></li>
            <?php endforeach; ?>
          </ul>
        </div>
      <?php endforeach; ?>
    </div>

    <div class="f-grid" style="margin-top:3rem">
      <div>
        <h4>Company</h4>
        <ul>
          <li><a href="<?= url('about.php') ?>">About</a></li>
          <li><a href="<?= url('services.php') ?>">All services</a></li>
          <li><a href="<?= url('faq.php') ?>">FAQ</a></li>
          <li><a href="<?= url('contact.php') ?>">Contact</a></li>
        </ul>
      </div>
      <div>
        <h4>Contact</h4>
        <ul>
          <li><a href="tel:<?= e(SITE['phone_raw']) ?>"><?= e(SITE['phone']) ?></a></li>
          <li><a href="mailto:<?= e(SITE['email']) ?>"><?= e(SITE['email']) ?></a></li>
        </ul>
      </div>
      <div>
        <h4>Office</h4>
        <ul>
          <li><?= e(SITE['address']) ?></li>
          <li><?= e(SITE['hours']) ?></li>
        </ul>
      </div>
      <div>
        <h4>Start a project</h4>
        <ul>
          <li><a class="tlink" href="<?= url('contact.php') ?>">Get a free audit <i class="fa-solid fa-arrow-up-right-from-square"></i></a></li>
        </ul>
      </div>
    </div>

    <div class="f-word" aria-hidden="true">BLUECOREE</div>

    <div class="f-bottom">
      <span>&copy; <?= date('Y') ?> <?= e(SITE['name']) ?>. All rights reserved.</span>
      <span>Complete IT solutions · Web &amp; app development</span>
    </div>
  </div>
</footer>

<a class="wa" href="https://wa.me/<?= e(SITE['whatsapp']) ?>" target="_blank" rel="noopener" aria-label="Chat on WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
<button class="to-top" id="toTop" aria-label="Back to top"><i class="fa-solid fa-arrow-up"></i></button>

<script src="<?= asset('js/main.js') ?>"></script>
</body>
</html>
