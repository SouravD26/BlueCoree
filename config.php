<?php
/**
 * Bluecoree — Global configuration, site data and helpers.
 * Every page includes this file first.
 */

declare(strict_types=1);

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

date_default_timezone_set('Asia/Kolkata');

/* ---------------------------------------------------------------
 | Site settings — edit these values with your real details
 --------------------------------------------------------------- */
const SITE = [
    'name'      => 'Bluecoree',
    'tagline'   => 'Complete IT Solutions for Growing Businesses',
    'phone'     => '+91 70039 04693',
    'phone_raw' => '+917003904693',
    'whatsapp'  => '917003904693',
    'email'     => 'bluecoreetechnologies@gmail.com',
    'address'   => 'Mondal Para Road, Jagaddal Goteberia, Kolkata – 700151',
    'hours'     => 'Mon – Sat: 9:30 AM – 7:00 PM',
    'social'    => [
        'facebook'  => '#',
        'instagram' => '#',
        'linkedin'  => '#',
        'whatsapp'  => 'https://wa.me/917003904693',
    ],
];

/* Where enquiries go. Set 'mail' => true once your server can send mail. */
const MAIL_SETTINGS = [
    'enabled' => false,                        // EmailJS delivers the mail; PHP still logs to data/enquiries.log
    'to'      => 'bluecoreetechnologies@gmail.com',
    'subject' => 'New Website Enquiry — Bluecoree',
    'log'     => __DIR__ . '/data/enquiries.log',
];

/* EmailJS (client-side delivery). Fill these from https://dashboard.emailjs.com
   Account → API Keys (public key), Email Services (service ID), Email Templates (template ID).
   Leave any value empty to disable EmailJS and fall back to PHP mail()/log only. */
const EMAILJS = [
    'public_key'  => 'JE0oBoGxpZLctd3y7',
    'service_id'  => 'service_mx3kuan',
    'template_id' => 'template_36m3lc8',
];

/* Base URL path — '' if the site is at the domain root, '/bluecoree' under XAMPP. */
define('BASE_URL', rtrim(str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'] ?? '')), '/'));

/* ---------------------------------------------------------------
 | Service categories
 --------------------------------------------------------------- */
const CATEGORIES = [
    'it'    => 'IT Infrastructure & Security',
    'cloud' => 'Cloud & Business Software',
    'web'   => 'Web & App Development',
];

/* ---------------------------------------------------------------
 | Services — the single source of truth for cards, the services
 | page and the contact form dropdown.
 --------------------------------------------------------------- */
const SERVICES = [
    /* ---- IT Infrastructure & Security ---- */
    [
        'cat'   => 'it',
        'slug'  => 'computer-laptop-printer-sales-service',
        'icon'  => 'fa-solid fa-desktop',
        'title' => 'Computer, Laptop & Printer Sales & Service',
        'desc'  => 'Genuine hardware supply with expert repair, upgrades and part replacement — for a single desk or a full office.',
        'points' => [
            'Desktop, laptop & workstation supply',
            'Printer sales, repair & consumables',
            'OS installation, RAM & SSD upgrades',
            'On-site & workshop diagnostics',
        ],
    ],
    [
        'cat'   => 'it',
        'slug'  => 'amc-computer-laptop-printer',
        'icon'  => 'fa-solid fa-file-contract',
        'title' => 'AMC of Computer, Laptop & Printer',
        'desc'  => 'Annual Maintenance Contracts with scheduled preventive visits and priority breakdown response.',
        'points' => [
            'Comprehensive & non-comprehensive plans',
            'Periodic preventive maintenance',
            'Priority on-site engineer visits',
            'Asset register & service reporting',
        ],
    ],
    [
        'cat'   => 'it',
        'slug'  => 'biometric-attendance',
        'icon'  => 'fa-solid fa-fingerprint',
        'title' => 'Biometric Attendance',
        'desc'  => 'Accurate fingerprint and face-recognition attendance with clean payroll-ready reporting.',
        'points' => [
            'Device supply & installation',
            'Fingerprint, face & RFID access',
            'Attendance software configuration',
            'Payroll export & multi-branch sync',
        ],
    ],
    [
        'cat'   => 'it',
        'slug'  => 'cctv-camera-sales-support',
        'icon'  => 'fa-solid fa-video',
        'title' => 'CCTV Camera Sales & Support',
        'desc'  => 'End-to-end surveillance — site survey, cabling, installation and remote mobile viewing.',
        'points' => [
            'HD / IP camera & NVR-DVR supply',
            'Professional cabling & installation',
            'Mobile & remote live viewing',
            'Storage planning & AMC support',
        ],
    ],
    [
        'cat'   => 'it',
        'slug'  => 'network-firewall-configuration-support',
        'icon'  => 'fa-solid fa-shield-halved',
        'title' => 'Network & Firewall Configuration and Support',
        'desc'  => 'Structured, secure networks — designed, deployed and monitored so your team is never offline.',
        'points' => [
            'LAN / Wi-Fi design & structured cabling',
            'Firewall, VPN & content filtering',
            'Router, switch & access-point setup',
            'Ongoing monitoring & support',
        ],
    ],

    /* ---- Cloud & Business Software ---- */
    [
        'cat'   => 'cloud',
        'slug'  => 'microsoft-office-365',
        'icon'  => 'fa-brands fa-microsoft',
        'title' => 'Microsoft Office 365',
        'desc'  => 'Licensing, migration and administration of Microsoft 365 so your team collaborates from anywhere.',
        'points' => [
            'Licence procurement & user setup',
            'Mailbox & data migration',
            'Teams, SharePoint & OneDrive rollout',
            'Security policies & backup',
        ],
    ],
    [
        'cat'   => 'cloud',
        'slug'  => 'domain-mail-id',
        'icon'  => 'fa-solid fa-envelope-open-text',
        'title' => 'Domain Mail ID',
        'desc'  => 'Professional email on your own domain — name@yourcompany.com — configured across every device.',
        'points' => [
            'Domain registration & DNS setup',
            'Business mailbox creation',
            'SPF, DKIM & DMARC anti-spam records',
            'Mobile & Outlook configuration',
        ],
    ],
    [
        'cat'   => 'cloud',
        'slug'  => 'website-hosting',
        'icon'  => 'fa-solid fa-server',
        'title' => 'Website Hosting',
        'desc'  => 'Fast, monitored hosting with daily backups and uptime alerts you never have to think about.',
        'points' => [
            'Shared, VPS & cloud hosting plans',
            'Automated daily backups',
            'Uptime monitoring & alerts',
            'Domain and DNS management',
        ],
    ],
    [
        'cat'   => 'cloud',
        'slug'  => 'ssl-setup',
        'icon'  => 'fa-solid fa-lock',
        'title' => 'SSL Setup',
        'desc'  => 'HTTPS enabled correctly across your whole site, with certificates that renew before they expire.',
        'points' => [
            'SSL certificate purchase & install',
            'HTTP to HTTPS redirection',
            'Mixed-content fixes',
            'Auto-renewal configuration',
        ],
    ],
    [
        'cat'   => 'cloud',
        'slug'  => 'accounting-software',
        'icon'  => 'fa-solid fa-calculator',
        'title' => 'Accounting Software',
        'desc'  => 'Supply, installation and support of business accounting software — billing, GST and inventory in order.',
        'points' => [
            'Software supply & licence renewal',
            'Installation & company setup',
            'GST billing & inventory configuration',
            'Data backup, migration & training',
        ],
    ],

    /* ---- Web & App Development ---- */
    [
        'cat'   => 'web',
        'slug'  => 'website-development-design',
        'icon'  => 'fa-solid fa-palette',
        'title' => 'Website Development & Design',
        'desc'  => 'Modern, responsive websites designed around your brand and built to convert visitors into enquiries.',
        'points' => [
            'Custom UI/UX design',
            'Mobile-first responsive build',
            'CMS so you can edit content yourself',
            'Landing pages & microsites',
        ],
    ],
    [
        'cat'   => 'web',
        'slug'  => 'business-website-development',
        'icon'  => 'fa-solid fa-briefcase',
        'title' => 'Business Website Development',
        'desc'  => 'Corporate websites that present your company credibly — clear services, credentials and contact paths.',
        'points' => [
            'Company profile & service pages',
            'Enquiry forms & WhatsApp integration',
            'Google Maps & business listing setup',
            'Multi-language ready structure',
        ],
    ],
    [
        'cat'   => 'web',
        'slug'  => 'ecommerce-website-development',
        'icon'  => 'fa-solid fa-cart-shopping',
        'title' => 'E-commerce Website Development',
        'desc'  => 'Online stores with secure checkout, live inventory and payment gateways ready to take orders.',
        'points' => [
            'Product catalogue & inventory',
            'Payment gateway integration',
            'Shipping, tax & coupon rules',
            'Order & customer dashboards',
        ],
    ],
    [
        'cat'   => 'web',
        'slug'  => 'custom-web-applications',
        'icon'  => 'fa-solid fa-diagram-project',
        'title' => 'Custom Web Applications',
        'desc'  => 'Software built to your workflow — CRMs, ERPs, portals and dashboards that replace scattered spreadsheets.',
        'points' => [
            'CRM, ERP & inventory systems',
            'Role-based admin dashboards',
            'API & third-party integrations',
            'Scalable, secure architecture',
        ],
    ],
    [
        'cat'   => 'web',
        'slug'  => 'mobile-app-development',
        'icon'  => 'fa-solid fa-mobile-screen-button',
        'title' => 'Mobile App (Android & iOS) Development',
        'desc'  => 'Native and cross-platform apps — from concept and design through to store publishing.',
        'points' => [
            'Android & iOS development',
            'Cross-platform (Flutter / React Native)',
            'Play Store & App Store publishing',
            'Push notifications & analytics',
        ],
    ],
    [
        'cat'   => 'web',
        'slug'  => 'website-speed-optimization',
        'icon'  => 'fa-solid fa-gauge-high',
        'title' => 'Website Speed Optimization',
        'desc'  => 'Faster load times and better Core Web Vitals — because slow pages lose customers.',
        'points' => [
            'Core Web Vitals improvement',
            'Image compression & lazy loading',
            'Caching, minification & CDN setup',
            'Database & query tuning',
        ],
    ],
    [
        'cat'   => 'web',
        'slug'  => 'seo-friendly-website-structure',
        'icon'  => 'fa-solid fa-magnifying-glass-chart',
        'title' => 'SEO-Friendly Website Structure',
        'desc'  => 'A search-ready foundation so Google understands your pages and customers find you first.',
        'points' => [
            'Clean URLs & heading hierarchy',
            'Meta tags & schema markup',
            'XML sitemap & robots.txt',
            'Search Console setup & indexing',
        ],
    ],
    [
        'cat'   => 'web',
        'slug'  => 'website-maintenance',
        'icon'  => 'fa-solid fa-rotate',
        'title' => 'Website Maintenance',
        'desc'  => 'Monthly care plans that keep your site updated, backed up, secure and always online.',
        'points' => [
            'Core, theme & plugin updates',
            'Security patching & malware scans',
            'Content updates & bug fixes',
            'Regular backups & uptime checks',
        ],
    ],
];

/* ---------------------------------------------------------------
 | Helpers
 --------------------------------------------------------------- */

/** Escape output for HTML. */
function e(?string $value): string
{
    return htmlspecialchars((string) $value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

/** Build a URL relative to the site root. */
function url(string $path = ''): string
{
    return BASE_URL . '/' . ltrim($path, '/');
}

/** Versioned asset URL — appends the file's mtime so browsers never serve a stale copy. */
function asset(string $path): string
{
    $file = __DIR__ . '/' . ltrim($path, '/');
    $ver  = is_file($file) ? (string) filemtime($file) : (string) time();
    return url($path) . '?v=' . $ver;
}

/** Current script filename, e.g. "services.php". */
function current_page(): string
{
    return basename($_SERVER['SCRIPT_NAME'] ?? 'index.php');
}

/** 'active' when $page is the page being viewed. */
function nav_active(string $page): string
{
    return current_page() === $page ? ' active' : '';
}

/** Services filtered by category key, or all of them. */
function services_by_cat(string $cat = 'all'): array
{
    if ($cat === 'all') {
        return SERVICES;
    }
    return array_values(array_filter(
        SERVICES,
        static fn (array $s): bool => $s['cat'] === $cat
    ));
}

/** Look up one service by slug. */
function find_service(string $slug): ?array
{
    foreach (SERVICES as $service) {
        if ($service['slug'] === $slug) {
            return $service;
        }
    }
    return null;
}

/** Generate / fetch the session CSRF token. */
function csrf_token(): string
{
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

/** Constant-time CSRF check. */
function csrf_valid(?string $token): bool
{
    return !empty($_SESSION['csrf_token'])
        && is_string($token)
        && hash_equals($_SESSION['csrf_token'], $token);
}

/** Read and clear a one-shot flash message. */
function flash_take(): ?array
{
    if (empty($_SESSION['flash'])) {
        return null;
    }
    $flash = $_SESSION['flash'];
    unset($_SESSION['flash']);
    return $flash;
}

/** Store a one-shot flash message. */
function flash_set(string $type, string $message): void
{
    $_SESSION['flash'] = ['type' => $type, 'message' => $message];
}

/* ---------------------------------------------------------------
 | Short tags shown on service cards (keyed by slug)
 --------------------------------------------------------------- */
const SERVICE_TAGS = [
    'computer-laptop-printer-sales-service' => ['Hardware', 'Repair', 'Upgrades'],
    'amc-computer-laptop-printer'           => ['AMC', 'Preventive', 'On-site'],
    'biometric-attendance'                  => ['Biometrics', 'Access', 'Payroll'],
    'cctv-camera-sales-support'             => ['CCTV', 'IP Cameras', 'NVR'],
    'network-firewall-configuration-support'=> ['LAN / Wi-Fi', 'Firewall', 'VPN'],
    'microsoft-office-365'                  => ['Microsoft 365', 'Migration', 'Teams'],
    'domain-mail-id'                        => ['Business Mail', 'DNS', 'SPF / DKIM'],
    'website-hosting'                       => ['Hosting', 'Backups', 'Uptime'],
    'ssl-setup'                             => ['SSL', 'HTTPS', 'Renewal'],
    'accounting-software'                   => ['Billing', 'GST', 'Inventory'],
    'website-development-design'            => ['UI / UX', 'Responsive', 'CMS'],
    'business-website-development'          => ['Corporate', 'Lead Forms', 'Maps'],
    'ecommerce-website-development'         => ['E-commerce', 'Payments', 'Catalogue'],
    'custom-web-applications'               => ['CRM / ERP', 'Dashboards', 'APIs'],
    'mobile-app-development'                => ['Android', 'iOS', 'Flutter'],
    'website-speed-optimization'            => ['Core Web Vitals', 'Caching', 'CDN'],
    'seo-friendly-website-structure'        => ['SEO', 'Schema', 'Sitemap'],
    'website-maintenance'                   => ['Updates', 'Security', 'Backups'],
];

/** Tags for a service slug. */
function service_tags(string $slug): array
{
    return SERVICE_TAGS[$slug] ?? [];
}

/* ---------------------------------------------------------------
 | Marquee — what we work with
 --------------------------------------------------------------- */
const MARQUEE = [
    'Microsoft 365', 'Windows Server', 'Hikvision', 'CP Plus', 'Dell', 'HP', 'Lenovo',
    'Sophos', 'Fortinet', 'Cisco', 'TP-Link', 'eSSL', 'ZKTeco', 'Tally',
    'WordPress', 'Laravel', 'React Native', 'Flutter', 'cPanel', 'Cloudflare',
];

/* ---------------------------------------------------------------
 | Headline numbers
 --------------------------------------------------------------- */
const STATS = [
    ['value' => 450, 'suffix' => '+',   'label' => 'Projects delivered'],
    ['value' => 180, 'suffix' => '+',   'label' => 'Active AMC clients'],
    ['value' => 8,   'suffix' => ' yrs','label' => 'In business'],
    ['value' => 4,   'suffix' => ' hrs','label' => 'Avg. response time', 'prefix' => '< '],
    ['value' => 99,  'suffix' => '%',   'label' => 'Client retention'],
];

/* ---------------------------------------------------------------
 | Process timeline
 --------------------------------------------------------------- */
const PROCESS = [
    ['Audit',  'We review your current hardware, network, cloud accounts and website, and find what is actually costing you time.'],
    ['Plan',   'A written scope with itemised pricing and a delivery timeline. Nothing starts before you approve it.'],
    ['Build',  'Supply, installation, configuration or development — scheduled around your working hours.'],
    ['Launch', 'Handover with documentation and training, so your team is not dependent on us for everyday tasks.'],
    ['Scale',  'Ongoing AMC, maintenance and monitoring as your office and your traffic grow.'],
];

/* ---------------------------------------------------------------
 | Testimonials — replace with real client quotes
 --------------------------------------------------------------- */
const TESTIMONIALS = [
    [
        'quote'   => 'They took over 40 machines, a broken network and an old website. Six weeks later everything worked, and we finally had one number to call instead of four.',
        'name'    => 'Operations Head',
        'company' => 'Manufacturing firm, 3 branches',
    ],
    [
        'quote'   => 'The AMC pays for itself. Downtime used to cost us a full day; now an engineer is on site the same morning, and most issues get fixed remotely before that.',
        'name'    => 'Director',
        'company' => 'Logistics company',
    ],
    [
        'quote'   => 'Our e-commerce store went from an 8-second load to under two. Orders went up without spending a rupee more on ads.',
        'name'    => 'Founder',
        'company' => 'Retail brand',
    ],
    [
        'quote'   => 'CCTV, biometric attendance and the firewall were all installed in one visit, by one team, on one invoice. That never happens.',
        'name'    => 'Admin Manager',
        'company' => 'Education institute',
    ],
];
