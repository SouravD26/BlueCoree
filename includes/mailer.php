<?php
/**
 * Enquiry delivery: appends to a log file and, when enabled, sends mail().
 * Returns true when the enquiry was stored or sent successfully.
 */

declare(strict_types=1);

function store_enquiry(array $data): bool
{
    $logFile = MAIL_SETTINGS['log'];
    $dir     = dirname($logFile);

    if (!is_dir($dir)) {
        @mkdir($dir, 0775, true);
    }

    $line = sprintf(
        "[%s] name=%s | phone=%s | email=%s | company=%s | service=%s | ip=%s\n    message: %s\n\n",
        date('Y-m-d H:i:s'),
        $data['name'],
        $data['phone'],
        $data['email'],
        $data['company'] !== '' ? $data['company'] : '-',
        $data['service'] !== '' ? $data['service'] : '-',
        $_SERVER['REMOTE_ADDR'] ?? '-',
        str_replace(["\r", "\n"], ' ', $data['message'] !== '' ? $data['message'] : '-')
    );

    return @file_put_contents($logFile, $line, FILE_APPEND | LOCK_EX) !== false;
}

function send_enquiry_mail(array $data): bool
{
    if (!MAIL_SETTINGS['enabled']) {
        return false;
    }

    /* Strip anything that could inject extra mail headers. */
    $safeName  = preg_replace('/[\r\n]+/', ' ', $data['name']);
    $safeEmail = filter_var($data['email'], FILTER_VALIDATE_EMAIL) ? $data['email'] : MAIL_SETTINGS['to'];

    $body = "New enquiry from the " . SITE['name'] . " website\n"
          . str_repeat('-', 46) . "\n"
          . "Name    : {$data['name']}\n"
          . "Phone   : {$data['phone']}\n"
          . "Email   : {$data['email']}\n"
          . "Company : " . ($data['company'] !== '' ? $data['company'] : '-') . "\n"
          . "Service : " . ($data['service'] !== '' ? $data['service'] : '-') . "\n"
          . "IP      : " . ($_SERVER['REMOTE_ADDR'] ?? '-') . "\n"
          . "Time    : " . date('d M Y, h:i A') . "\n\n"
          . "Message :\n{$data['message']}\n";

    $headers = [
        'From: ' . SITE['name'] . ' Website <' . MAIL_SETTINGS['to'] . '>',
        'Reply-To: ' . $safeName . ' <' . $safeEmail . '>',
        'Content-Type: text/plain; charset=UTF-8',
        'X-Mailer: PHP/' . PHP_VERSION,
    ];

    return @mail(
        MAIL_SETTINGS['to'],
        MAIL_SETTINGS['subject'],
        $body,
        implode("\r\n", $headers)
    );
}

/**
 * Validate submitted fields. Returns [cleanData, errors].
 */
function validate_enquiry(array $post): array
{
    $data = [
        'name'    => trim((string) ($post['name'] ?? '')),
        'phone'   => trim((string) ($post['phone'] ?? '')),
        'email'   => trim((string) ($post['email'] ?? '')),
        'company' => trim((string) ($post['company'] ?? '')),
        'service' => trim((string) ($post['service'] ?? '')),
        'message' => trim((string) ($post['message'] ?? '')),
    ];

    $errors = [];

    if ($data['name'] === '') {
        $errors['name'] = 'Please enter your name.';
    } elseif (mb_strlen($data['name']) > 80) {
        $errors['name'] = 'Name is too long.';
    }

    if ($data['phone'] === '') {
        $errors['phone'] = 'Please enter your phone number.';
    } elseif (!preg_match('/^[0-9+\-\s()]{8,20}$/', $data['phone'])) {
        $errors['phone'] = 'Please enter a valid phone number.';
    }

    if ($data['email'] === '') {
        $errors['email'] = 'Please enter your email address.';
    } elseif (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Please enter a valid email address.';
    }

    if (mb_strlen($data['company']) > 100) {
        $errors['company'] = 'Company name is too long.';
    }

    if (mb_strlen($data['message']) > 2000) {
        $errors['message'] = 'Please keep your message under 2000 characters.';
    }

    /* Only accept a service value we actually offer. */
    if ($data['service'] !== '') {
        $titles = array_column(SERVICES, 'title');
        if (!in_array($data['service'], $titles, true)) {
            $errors['service'] = 'Please choose a service from the list.';
        }
    }

    return [$data, $errors];
}
