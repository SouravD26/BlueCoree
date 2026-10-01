import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useSpring, useMotionValue } from 'framer-motion';
import { ArrowUp, Menu, X } from 'lucide-react';
import { SITE, CATEGORIES, servicesByCat } from '../data';
import { Btn, ease } from './ui';

const NAV = [
  ['/', 'Home'],
  ['/services', 'Services'],
  ['/about', 'About'],
  ['/faq', 'FAQ'],
  ['/contact', 'Contact'],
];

/* Brand icons (lucide no longer ships them) */
const Ico = {
  facebook: <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v8h4v-8h3l1-4h-4V8z" fill="currentColor" />,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" /></>,
  linkedin: <path d="M4 9h4v12H4zM6 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM10 9h4v1.7c.6-1 1.9-2 4-2 4 0 4 2.7 4 6V21h-4v-5.5c0-1.4 0-3.2-2-3.2s-2 1.5-2 3V21h-4z" fill="currentColor" />,
  whatsapp: <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l2 1c.3.1.5.2.5.3.1.2.1.7-.1 1.3z" fill="currentColor" />,
};
export const BrandIcon = ({ name }) => <svg viewBox="0 0 24 24" aria-hidden="true">{Ico[name]}</svg>;

function Background() {
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 80, damping: 20 });
  const sy = useSpring(y, { stiffness: 80, damping: 20 });
  useEffect(() => {
    const on = (e) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener('pointermove', on);
    return () => window.removeEventListener('pointermove', on);
  }, [x, y]);
  const float = (dx, dy, d) => ({ animate: { x: [0, dx, 0], y: [0, dy, 0] }, transition: { duration: d, repeat: Infinity, ease: 'easeInOut' } });
  return (
    <>
      <div className="bg-fx" aria-hidden="true">
        <div className="bg-grid" />
        <motion.div className="orb orb-1" {...float(120, 80, 18)} />
        <motion.div className="orb orb-2" {...float(-100, 120, 22)} />
        <motion.div className="orb orb-3" {...float(80, -100, 26)} />
        <div className="noise" />
      </div>
      <motion.div className="cursor-glow" style={{ left: sx, top: sy }} aria-hidden="true" />
    </>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; }, [open]);

  const isActive = (to) => (to === '/' ? pathname === '/' : pathname.startsWith(to));

  return (
    <>
      <motion.header className={`header${scrolled ? ' scrolled' : ''}`} initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease }}>
        <div className="wrap">
          <div className="nav">
            <Link to="/" className="logo">
              <img src={`${import.meta.env.BASE_URL}logo-mark.png`} alt="" width="40" height="40" />
              <span><b>Blue</b>Coree</span>
            </Link>
            <nav className="menu">
              {NAV.map(([to, label]) => (
                <NavLink key={to} to={to} className={`lnk${isActive(to) ? ' active' : ''}`} end={to === '/'}>
                  {isActive(to) && <motion.span layoutId="nav-pill" className="pill-bg" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
                  {label}
                </NavLink>
              ))}
              <span style={{ marginLeft: '0.5rem' }}><Btn to="/contact" className="btn-sm">Get in touch</Btn></span>
            </nav>
            <button className="burger" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {NAV.map(([to, label], i) => (
              <motion.div key={to} initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i + 0.1, ease }}>
                <Link to={to} className={isActive(to) ? 'active' : ''}>{label}</Link>
              </motion.div>
            ))}
            <motion.a href={`tel:${SITE.phoneRaw}`} style={{ fontSize: '1rem', color: 'var(--cyan)', marginTop: '2rem' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              {SITE.phone}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="f-grid">
          <div className="about">
            <Link to="/" className="logo">
              <img src={`${import.meta.env.BASE_URL}logo-mark.png`} alt="" width="40" height="40" />
              <span><b>Blue</b>Coree</span>
            </Link>
            <p>One partner for the machines, the network, the cloud accounts and the software your business runs on.</p>
            <div className="socials">
              {Object.entries(SITE.social).map(([k, href]) => (
                <a key={k} href={href} aria-label={k} target="_blank" rel="noopener noreferrer"><BrandIcon name={k} /></a>
              ))}
            </div>
          </div>
          {Object.entries(CATEGORIES).map(([key, c]) => (
            <div key={key}>
              <h4>{c.short}</h4>
              <ul>
                {servicesByCat(key).slice(0, 6).map((s) => (
                  <li key={s.slug}><Link to={`/services/${s.slug}`}>{s.title}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="f-grid" style={{ marginTop: '3rem' }}>
          <div>
            <h4>Company</h4>
            <ul>{NAV.slice(1).map(([to, l]) => <li key={to}><Link to={to}>{l}</Link></li>)}</ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href={`tel:${SITE.phoneRaw}`}>{SITE.phone}</a></li>
              <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            </ul>
          </div>
          <div>
            <h4>Office</h4>
            <ul><li>{SITE.address}</li><li>{SITE.hours}</li></ul>
          </div>
          <div>
            <h4>Start a project</h4>
            <ul><li><Link to="/contact" style={{ color: 'var(--cyan)' }}>Get a free audit →</Link></li></ul>
          </div>
        </div>

        <motion.div className="f-word" aria-hidden="true" initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.2, ease }}>
          BLUECOREE
        </motion.div>

        <div className="f-bottom">
          <span>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
          <span>Complete IT solutions · Web &amp; app development</span>
        </div>
      </div>
    </footer>
  );
}

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [showTop, setShowTop] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  useEffect(() => {
    const on = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <>
      <motion.div className="progress" style={{ scaleX }} />
      <Background />
      <Header />
      {children}
      <Footer />

      <motion.a className="fab fab-wa" href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2, type: 'spring' }} whileHover={{ scale: 1.1 }}>
        <BrandIcon name="whatsapp" />
      </motion.a>
      <AnimatePresence>
        {showTop && (
          <motion.button className="fab fab-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
