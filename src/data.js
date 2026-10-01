import {
  Monitor, FileText, Fingerprint, Video, ShieldCheck, Cloud, Mail, Server, Lock,
  Calculator, Palette, Briefcase, ShoppingCart, Workflow, Smartphone, Gauge, Search, RefreshCw,
} from 'lucide-react';

export const SITE = {
  name: 'Bluecoree',
  tagline: 'Complete IT Solutions for Growing Businesses',
  phone: '+91 70039 04693',
  phoneRaw: '+917003904693',
  whatsapp: '917003904693',
  email: 'bluecoreetechnologies@gmail.com',
  address: 'Mondal Para Road, Jagaddal Goteberia, Kolkata – 700151',
  hours: 'Mon – Sat: 9:30 AM – 7:00 PM',
  social: {
    facebook: '#',
    instagram: '#',
    linkedin: '#',
    whatsapp: 'https://wa.me/917003904693',
  },
};

/* EmailJS (client-side delivery) — https://dashboard.emailjs.com */
export const EMAILJS = {
  publicKey: 'JE0oBoGxpZLctd3y7',
  serviceId: 'service_mx3kuan',
  templateId: 'template_36m3lc8',
};

export const CATEGORIES = {
  it: { label: 'IT Infrastructure & Security', short: 'Infrastructure' },
  cloud: { label: 'Cloud & Business Software', short: 'Cloud' },
  web: { label: 'Web & App Development', short: 'Build' },
};

export const SERVICES = [
  { cat: 'it', slug: 'computer-laptop-printer-sales-service', icon: Monitor, title: 'Computer, Laptop & Printer Sales & Service',
    desc: 'Genuine hardware supply with expert repair, upgrades and part replacement — for a single desk or a full office.',
    points: ['Desktop, laptop & workstation supply', 'Printer sales, repair & consumables', 'OS installation, RAM & SSD upgrades', 'On-site & workshop diagnostics'],
    tags: ['Hardware', 'Repair', 'Upgrades'] },
  { cat: 'it', slug: 'amc-computer-laptop-printer', icon: FileText, title: 'AMC of Computer, Laptop & Printer',
    desc: 'Annual Maintenance Contracts with scheduled preventive visits and priority breakdown response.',
    points: ['Comprehensive & non-comprehensive plans', 'Periodic preventive maintenance', 'Priority on-site engineer visits', 'Asset register & service reporting'],
    tags: ['AMC', 'Preventive', 'On-site'] },
  { cat: 'it', slug: 'biometric-attendance', icon: Fingerprint, title: 'Biometric Attendance',
    desc: 'Accurate fingerprint and face-recognition attendance with clean payroll-ready reporting.',
    points: ['Device supply & installation', 'Fingerprint, face & RFID access', 'Attendance software configuration', 'Payroll export & multi-branch sync'],
    tags: ['Biometrics', 'Access', 'Payroll'] },
  { cat: 'it', slug: 'cctv-camera-sales-support', icon: Video, title: 'CCTV Camera Sales & Support',
    desc: 'End-to-end surveillance — site survey, cabling, installation and remote mobile viewing.',
    points: ['HD / IP camera & NVR-DVR supply', 'Professional cabling & installation', 'Mobile & remote live viewing', 'Storage planning & AMC support'],
    tags: ['CCTV', 'IP Cameras', 'NVR'] },
  { cat: 'it', slug: 'network-firewall-configuration-support', icon: ShieldCheck, title: 'Network & Firewall Configuration and Support',
    desc: 'Structured, secure networks — designed, deployed and monitored so your team is never offline.',
    points: ['LAN / Wi-Fi design & structured cabling', 'Firewall, VPN & content filtering', 'Router, switch & access-point setup', 'Ongoing monitoring & support'],
    tags: ['LAN / Wi-Fi', 'Firewall', 'VPN'] },

  { cat: 'cloud', slug: 'microsoft-office-365', icon: Cloud, title: 'Microsoft Office 365',
    desc: 'Licensing, migration and administration of Microsoft 365 so your team collaborates from anywhere.',
    points: ['Licence procurement & user setup', 'Mailbox & data migration', 'Teams, SharePoint & OneDrive rollout', 'Security policies & backup'],
    tags: ['Microsoft 365', 'Migration', 'Teams'] },
  { cat: 'cloud', slug: 'domain-mail-id', icon: Mail, title: 'Domain Mail ID',
    desc: 'Professional email on your own domain — name@yourcompany.com — configured across every device.',
    points: ['Domain registration & DNS setup', 'Business mailbox creation', 'SPF, DKIM & DMARC anti-spam records', 'Mobile & Outlook configuration'],
    tags: ['Business Mail', 'DNS', 'SPF / DKIM'] },
  { cat: 'cloud', slug: 'website-hosting', icon: Server, title: 'Website Hosting',
    desc: 'Fast, monitored hosting with daily backups and uptime alerts you never have to think about.',
    points: ['Shared, VPS & cloud hosting plans', 'Automated daily backups', 'Uptime monitoring & alerts', 'Domain and DNS management'],
    tags: ['Hosting', 'Backups', 'Uptime'] },
  { cat: 'cloud', slug: 'ssl-setup', icon: Lock, title: 'SSL Setup',
    desc: 'HTTPS enabled correctly across your whole site, with certificates that renew before they expire.',
    points: ['SSL certificate purchase & install', 'HTTP to HTTPS redirection', 'Mixed-content fixes', 'Auto-renewal configuration'],
    tags: ['SSL', 'HTTPS', 'Renewal'] },
  { cat: 'cloud', slug: 'accounting-software', icon: Calculator, title: 'Accounting Software',
    desc: 'Supply, installation and support of business accounting software — billing, GST and inventory in order.',
    points: ['Software supply & licence renewal', 'Installation & company setup', 'GST billing & inventory configuration', 'Data backup, migration & training'],
    tags: ['Billing', 'GST', 'Inventory'] },

  { cat: 'web', slug: 'website-development-design', icon: Palette, title: 'Website Development & Design',
    desc: 'Modern, responsive websites designed around your brand and built to convert visitors into enquiries.',
    points: ['Custom UI/UX design', 'Mobile-first responsive build', 'CMS so you can edit content yourself', 'Landing pages & microsites'],
    tags: ['UI / UX', 'Responsive', 'CMS'] },
  { cat: 'web', slug: 'business-website-development', icon: Briefcase, title: 'Business Website Development',
    desc: 'Corporate websites that present your company credibly — clear services, credentials and contact paths.',
    points: ['Company profile & service pages', 'Enquiry forms & WhatsApp integration', 'Google Maps & business listing setup', 'Multi-language ready structure'],
    tags: ['Corporate', 'Lead Forms', 'Maps'] },
  { cat: 'web', slug: 'ecommerce-website-development', icon: ShoppingCart, title: 'E-commerce Website Development',
    desc: 'Online stores with secure checkout, live inventory and payment gateways ready to take orders.',
    points: ['Product catalogue & inventory', 'Payment gateway integration', 'Shipping, tax & coupon rules', 'Order & customer dashboards'],
    tags: ['E-commerce', 'Payments', 'Catalogue'] },
  { cat: 'web', slug: 'custom-web-applications', icon: Workflow, title: 'Custom Web Applications',
    desc: 'Software built to your workflow — CRMs, ERPs, portals and dashboards that replace scattered spreadsheets.',
    points: ['CRM, ERP & inventory systems', 'Role-based admin dashboards', 'API & third-party integrations', 'Scalable, secure architecture'],
    tags: ['CRM / ERP', 'Dashboards', 'APIs'] },
  { cat: 'web', slug: 'mobile-app-development', icon: Smartphone, title: 'Mobile App (Android & iOS) Development',
    desc: 'Native and cross-platform apps — from concept and design through to store publishing.',
    points: ['Android & iOS development', 'Cross-platform (Flutter / React Native)', 'Play Store & App Store publishing', 'Push notifications & analytics'],
    tags: ['Android', 'iOS', 'Flutter'] },
  { cat: 'web', slug: 'website-speed-optimization', icon: Gauge, title: 'Website Speed Optimization',
    desc: 'Faster load times and better Core Web Vitals — because slow pages lose customers.',
    points: ['Core Web Vitals improvement', 'Image compression & lazy loading', 'Caching, minification & CDN setup', 'Database & query tuning'],
    tags: ['Core Web Vitals', 'Caching', 'CDN'] },
  { cat: 'web', slug: 'seo-friendly-website-structure', icon: Search, title: 'SEO-Friendly Website Structure',
    desc: 'A search-ready foundation so Google understands your pages and customers find you first.',
    points: ['Clean URLs & heading hierarchy', 'Meta tags & schema markup', 'XML sitemap & robots.txt', 'Search Console setup & indexing'],
    tags: ['SEO', 'Schema', 'Sitemap'] },
  { cat: 'web', slug: 'website-maintenance', icon: RefreshCw, title: 'Website Maintenance',
    desc: 'Monthly care plans that keep your site updated, backed up, secure and always online.',
    points: ['Core, theme & plugin updates', 'Security patching & malware scans', 'Content updates & bug fixes', 'Regular backups & uptime checks'],
    tags: ['Updates', 'Security', 'Backups'] },
];

export const servicesByCat = (cat = 'all') => (cat === 'all' ? SERVICES : SERVICES.filter((s) => s.cat === cat));
export const findService = (slug) => SERVICES.find((s) => s.slug === slug);

export const MARQUEE = [
  'Microsoft 365', 'Windows Server', 'Hikvision', 'CP Plus', 'Dell', 'HP', 'Lenovo',
  'Sophos', 'Fortinet', 'Cisco', 'TP-Link', 'eSSL', 'ZKTeco', 'Tally',
  'WordPress', 'Laravel', 'React Native', 'Flutter', 'cPanel', 'Cloudflare',
];

export const STATS = [
  { value: 450, suffix: '+', label: 'Projects delivered' },
  { value: 8, suffix: ' yrs', label: 'In business' },
  { value: 4, suffix: ' hrs', label: 'Avg. response time', prefix: '< ' },
  { value: 99, suffix: '%', label: 'Client retention' },
];

export const PROCESS = [
  ['Audit', 'We review your current hardware, network, cloud accounts and website, and find what is actually costing you time.'],
  ['Plan', 'A written scope with itemised pricing and a delivery timeline. Nothing starts before you approve it.'],
  ['Build', 'Supply, installation, configuration or development — scheduled around your working hours.'],
  ['Launch', 'Handover with documentation and training, so your team is not dependent on us for everyday tasks.'],
  ['Scale', 'Ongoing AMC, maintenance and monitoring as your office and your traffic grow.'],
];

export const WHY = [
  ['One point of contact', 'Supply, install, configure and support handled by the same team that quoted it.'],
  ['Response times in writing', 'Priority remote support, same-day on-site visits for AMC clients — committed, not implied.'],
  ['Genuine hardware and licences', 'Authentic equipment and licensed software. No grey-market shortcuts that fail an audit.'],
  ['Itemised, honest quotes', 'You see every line before approving. If you do not need it, we say so.'],
  ['You keep the keys', 'Domains, licences and repositories stay in your name. Documentation and training on handover.'],
];

export const PRINCIPLES = [
  ['Honesty first', 'If you do not need it, we say so. No inflated quotes, no upgrades you will never use.'],
  ['Genuine only', 'Authentic hardware and licensed software — never grey-market shortcuts that fail an audit.'],
  ['Show up fast', 'Response times we commit to in writing, and actually meet.'],
  ['Leave you capable', 'Documentation and training on handover, so your team is not helpless without us.'],
];

/* Replace with real client quotes */
export const TESTIMONIALS = [
  { quote: 'They took over 40 machines, a broken network and an old website. Six weeks later everything worked, and we finally had one number to call instead of four.', name: 'Operations Head', company: 'Manufacturing firm, 3 branches' },
  { quote: 'The AMC pays for itself. Downtime used to cost us a full day; now an engineer is on site the same morning, and most issues get fixed remotely before that.', name: 'Director', company: 'Logistics company' },
  { quote: 'Our e-commerce store went from an 8-second load to under two. Orders went up without spending a rupee more on ads.', name: 'Founder', company: 'Retail brand' },
  { quote: 'CCTV, biometric attendance and the firewall were all installed in one visit, by one team, on one invoice. That never happens.', name: 'Admin Manager', company: 'Education institute' },
];

export const FAQS = [
  ['What does an AMC cover?', 'Our AMC covers scheduled preventive maintenance, unlimited breakdown support, OS and driver troubleshooting, and priority engineer visits for your computers, laptops and printers. Comprehensive plans additionally include spare parts.'],
  ['Can you support offices outside our city?', 'Yes. Remote support, cloud services, hosting and all development work are delivered anywhere. On-site visits are scheduled based on location — tell us where you are and we will confirm coverage.'],
  ['How long does a website or app take?', 'A business website typically takes 2–3 weeks, an e-commerce store 4–6 weeks, and a mobile app 6–12 weeks depending on features. You get a firm timeline with your quote before work begins.'],
  ['Do you supply hardware and licences, or only service them?', 'Both. We supply genuine computers, laptops, printers, CCTV systems and biometric devices, along with authentic Microsoft 365 and accounting software licences — then install, configure and support them.'],
  ['Is hosting and SSL included with website development?', 'We provide hosting, domain, business email and SSL as an optional bundle. If you already have a provider, we deploy to it and configure SSL there instead.'],
  ['Can you take over a website someone else built?', 'Yes. We audit the existing site, fix what is broken, secure it, and put it on a maintenance plan. Speed optimization and SEO structure work are commonly part of that handover.'],
  ['How is pricing decided?', 'Hardware and licences are quoted at supply cost plus service. AMC is priced per device per year. Development is quoted per project against a written scope. Everything is itemised before you approve.'],
  ['What happens if something breaks after the project ends?', 'Development work carries a support window after handover for any defects. Beyond that, our maintenance and AMC plans cover ongoing fixes, updates and monitoring.'],
];
