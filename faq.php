<?php
require_once __DIR__ . '/config.php';

$page_title = 'Frequently Asked Questions — ' . SITE['name'];
$page_desc  = 'Answers about AMC coverage, service areas, project timelines, hardware supply, hosting and SSL from Bluecoree.';
$ph_title   = 'Frequently asked questions';
$ph_sub     = 'Coverage, timelines, pricing and what happens after handover — answered plainly.';
$ph_crumb   = 'FAQ';

$faqs = [
    [
        'What does an AMC cover?',
        'Our AMC covers scheduled preventive maintenance, unlimited breakdown support, OS and driver troubleshooting, and priority engineer visits for your computers, laptops and printers. Comprehensive plans additionally include spare parts.',
    ],
    [
        'Can you support offices outside our city?',
        'Yes. Remote support, cloud services, hosting and all development work are delivered anywhere. On-site visits are scheduled based on location — tell us where you are and we will confirm coverage.',
    ],
    [
        'How long does a website or app take?',
        'A business website typically takes 2–3 weeks, an e-commerce store 4–6 weeks, and a mobile app 6–12 weeks depending on features. You get a firm timeline with your quote before work begins.',
    ],
    [
        'Do you supply hardware and licences, or only service them?',
        'Both. We supply genuine computers, laptops, printers, CCTV systems and biometric devices, along with authentic Microsoft 365 and accounting software licences — then install, configure and support them.',
    ],
    [
        'Is hosting and SSL included with website development?',
        'We provide hosting, domain, business email and SSL as an optional bundle. If you already have a provider, we deploy to it and configure SSL there instead.',
    ],
    [
        'Can you take over a website someone else built?',
        'Yes. We audit the existing site, fix what is broken, secure it, and put it on a maintenance plan. Speed optimization and SEO structure work are commonly part of that handover.',
    ],
    [
        'How is pricing decided?',
        'Hardware and licences are quoted at supply cost plus service. AMC is priced per device per year. Development is quoted per project against a written scope. Everything is itemised before you approve.',
    ],
    [
        'What happens if something breaks after the project ends?',
        'Development work carries a support window after handover for any defects. Beyond that, our maintenance and AMC plans cover ongoing fixes, updates and monitoring.',
    ],
];

require __DIR__ . '/includes/header.php';
require __DIR__ . '/includes/page-hero.php';
?>

<section class="section">
  <div class="wrap split">
    <div class="reveal">
      <span class="label">Answers</span>
      <h2>The things clients ask us most.</h2>
      <p class="lead">Still unanswered? Send the question across — a real engineer replies,
        usually within a few hours.</p>
      <div class="hero-btns" style="margin-top:2rem">
        <a href="<?= url('contact.php') ?>" class="btn btn-primary">Ask a question <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
      </div>
    </div>

    <div class="faq reveal">
      <?php foreach ($faqs as $i => [$q, $a]): ?>
        <div class="q">
          <button type="button" aria-expanded="false" aria-controls="faq-<?= $i ?>">
            <span><?= e($q) ?></span>
            <span class="q-ico"><i class="fa-solid fa-plus"></i></span>
          </button>
          <div class="a" id="faq-<?= $i ?>"><p><?= e($a) ?></p></div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<?php
$cta_title = 'Still have a question?';
$cta_text  = 'Ask it directly. No call centre, no ticket queue — you get an engineer.';
require __DIR__ . '/includes/cta.php';
require __DIR__ . '/includes/footer.php';
