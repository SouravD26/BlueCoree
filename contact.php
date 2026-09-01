<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/includes/mailer.php';

$errors = [];
$old    = ['name' => '', 'phone' => '', 'email' => '', 'company' => '', 'service' => '', 'message' => ''];

/* Pre-select a service when arriving from a service page: contact.php?service=slug */
if (isset($_GET['service'])) {
    $preselect = find_service((string) $_GET['service']);
    if ($preselect !== null) {
        $old['service'] = $preselect['title'];
    }
}

/* ---------------- Handle submission (POST → validate → redirect) ---------------- */
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if (!csrf_valid($_POST['csrf_token'] ?? null)) {
        $errors['form'] = 'Your session expired. Please submit the form again.';
        [$old] = validate_enquiry($_POST);
    } elseif (trim((string) ($_POST['website'] ?? '')) !== '') {
        /* Honeypot filled — silently treat as success so bots learn nothing. */
        flash_set('success', 'Thank you! Your enquiry has been received.');
        header('Location: ' . url('contact.php?sent=1'));
        exit;
    } else {
        [$data, $errors] = validate_enquiry($_POST);
        $old = $data;

        if (!$errors) {
            $stored = store_enquiry($data);
            $mailed = send_enquiry_mail($data);

            if ($stored || $mailed) {
                unset($_SESSION['csrf_token']); // one token per submission
                flash_set(
                    'success',
                    'Thank you, ' . $data['name'] . '! Your enquiry has been received — we will contact you within one business day.'
                );
                header('Location: ' . url('contact.php?sent=1'));
                exit;
            }

            $errors['form'] = 'Sorry, we could not record your enquiry. Please call us on ' . SITE['phone'] . '.';
        }
    }
}

$flash = flash_take();

$page_title = 'Contact — ' . SITE['name'];
$page_desc  = 'Get in touch with Bluecoree for IT support, AMC, CCTV, networking, Microsoft 365, hosting, websites and mobile apps.';
$ph_title   = 'Tell us what you need.';
$ph_sub     = 'Send the requirement across and our team replies within one business day. Urgent breakdown? Call instead — it is faster.';
$ph_crumb   = 'Contact';

require __DIR__ . '/includes/header.php';
require __DIR__ . '/includes/page-hero.php';
?>

<section class="section">
  <div class="wrap contact-grid">
    <div class="reveal">
      <span class="label">Reach us</span>
      <h2>Direct lines.</h2>
      <ul class="info">
        <li>
          <span class="ic"><i class="fa-solid fa-location-dot"></i></span>
          <div><b>Office</b><span><?= e(SITE['address']) ?></span></div>
        </li>
        <li>
          <span class="ic"><i class="fa-solid fa-phone"></i></span>
          <div><b>Phone</b><a href="tel:<?= e(SITE['phone_raw']) ?>"><?= e(SITE['phone']) ?></a></div>
        </li>
        <li>
          <span class="ic"><i class="fa-solid fa-envelope"></i></span>
          <div><b>Email</b><a href="mailto:<?= e(SITE['email']) ?>"><?= e(SITE['email']) ?></a></div>
        </li>
        <li>
          <span class="ic"><i class="fa-solid fa-clock"></i></span>
          <div><b>Hours</b><span><?= e(SITE['hours']) ?></span></div>
        </li>
      </ul>
      <div class="socials">
        <a href="<?= e(SITE['social']['facebook']) ?>" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
        <a href="<?= e(SITE['social']['instagram']) ?>" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
        <a href="<?= e(SITE['social']['linkedin']) ?>" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
        <a href="<?= e(SITE['social']['whatsapp']) ?>" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
      </div>
    </div>

    <form class="form reveal" id="quoteForm" method="post" action="<?= url('contact.php') ?>" novalidate>
      <input type="hidden" name="csrf_token" value="<?= e(csrf_token()) ?>">
      <div class="hp" aria-hidden="true">
        <label for="website">Website</label>
        <input type="text" id="website" name="website" tabindex="-1" autocomplete="off">
      </div>

      <?php if ($flash): ?>
        <div class="form-msg show <?= e($flash['type']) ?>"><?= e($flash['message']) ?></div>
      <?php endif; ?>
      <?php if (!empty($errors['form'])): ?>
        <div class="form-msg show error"><?= e($errors['form']) ?></div>
      <?php endif; ?>

      <div class="f-row">
        <div class="field">
          <label for="name">Full name *</label>
          <input id="name" name="name" type="text" placeholder="Your name" value="<?= e($old['name']) ?>" required>
          <?php if (!empty($errors['name'])): ?><small class="err"><?= e($errors['name']) ?></small><?php endif; ?>
        </div>
        <div class="field">
          <label for="phone">Phone *</label>
          <input id="phone" name="phone" type="tel" placeholder="<?= e(SITE['phone']) ?>" value="<?= e($old['phone']) ?>" required>
          <?php if (!empty($errors['phone'])): ?><small class="err"><?= e($errors['phone']) ?></small><?php endif; ?>
        </div>
      </div>

      <div class="f-row">
        <div class="field">
          <label for="email">Email *</label>
          <input id="email" name="email" type="email" placeholder="you@company.com" value="<?= e($old['email']) ?>" required>
          <?php if (!empty($errors['email'])): ?><small class="err"><?= e($errors['email']) ?></small><?php endif; ?>
        </div>
        <div class="field">
          <label for="company">Company</label>
          <input id="company" name="company" type="text" placeholder="Company name" value="<?= e($old['company']) ?>">
        </div>
      </div>

      <div class="field">
        <label for="service">Service required</label>
        <select id="service" name="service">
          <option value="">Select a service</option>
          <?php foreach (CATEGORIES as $key => $label): ?>
            <optgroup label="<?= e($label) ?>">
              <?php foreach (services_by_cat($key) as $s): ?>
                <option value="<?= e($s['title']) ?>"<?= $old['service'] === $s['title'] ? ' selected' : '' ?>><?= e($s['title']) ?></option>
              <?php endforeach; ?>
            </optgroup>
          <?php endforeach; ?>
        </select>
        <?php if (!empty($errors['service'])): ?><small class="err"><?= e($errors['service']) ?></small><?php endif; ?>
      </div>

      <div class="field">
        <label for="message">Your requirement</label>
        <textarea id="message" name="message" placeholder="Tell us briefly what you need..."><?= e($old['message']) ?></textarea>
        <?php if (!empty($errors['message'])): ?><small class="err"><?= e($errors['message']) ?></small><?php endif; ?>
      </div>

      <button type="submit" class="btn btn-primary">Send enquiry <i class="fa-solid fa-arrow-up-right-from-square"></i></button>
      <p class="form-note">We respect your privacy — your details are never shared.</p>
      <div class="form-msg" id="formMsg"></div>
    </form>
  </div>
</section>

<section class="section" style="padding-top:0">
  <div class="wrap">
    <div class="map-box reveal">
      <iframe
        title="Bluecoree office location"
        src="https://www.google.com/maps?q=22.4267604,88.396454+(BlueCoree+Technologies)&z=18&hl=en&output=embed"
        width="100%" height="420" style="border:0" allowfullscreen loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  </div>
</section>

<?php if (EMAILJS['public_key'] && EMAILJS['service_id'] && EMAILJS['template_id']): ?>
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
<script>
  window.BC_EMAILJS = {
    publicKey:  <?= json_encode(EMAILJS['public_key']) ?>,
    serviceId:  <?= json_encode(EMAILJS['service_id']) ?>,
    templateId: <?= json_encode(EMAILJS['template_id']) ?>,
    toEmail:    <?= json_encode(MAIL_SETTINGS['to']) ?>
  };
  if (window.emailjs) emailjs.init({ publicKey: window.BC_EMAILJS.publicKey });
</script>
<?php endif; ?>

<?php require __DIR__ . '/includes/footer.php'; ?>
