import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useInView, useMotionValue, useSpring, animate } from 'framer-motion';
import { ArrowUpRight, ArrowRight, ChevronDown } from 'lucide-react';
import { CATEGORIES, SERVICES } from '../data';

export const serviceImg = (slug) => `${import.meta.env.BASE_URL}services/${slug}.jpg`;

export const ease = [0.22, 1, 0.36, 1];

/** Fade + rise into view once. */
export function Reveal({ children, delay = 0, y = 40, className, as = 'div', ...rest }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay, ease }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Stagger container + item variants. */
export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
export const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

/** Counts up from 0 when scrolled into view. */
export function Counter({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, value, { duration: 2, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, value]);
  return <span ref={ref}>{n}</span>;
}

/** Element that leans slightly towards the cursor. */
export function Magnetic({ children, strength = 0.3 }) {
  const ref = useRef(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  };
  const leave = () => { x.set(0); y.set(0); };
  return (
    <motion.div ref={ref} style={{ x, y, display: 'inline-block' }} onMouseMove={move} onMouseLeave={leave}>
      {children}
    </motion.div>
  );
}

export function Btn({ to, href, variant = 'primary', icon = true, children, className = '', ...rest }) {
  const cls = `btn btn-${variant} ${className}`;
  const inner = <>{children}{icon && <ArrowUpRight />}</>;
  return (
    <Magnetic strength={0.2}>
      {to ? <Link to={to} className={cls} {...rest}>{inner}</Link> : <a href={href} className={cls} {...rest}>{inner}</a>}
    </Magnetic>
  );
}

export function SecHead({ label, title, lead }) {
  return (
    <Reveal className="sec-head">
      <div>
        <span className="label">{label}</span>
        <h2>{title}</h2>
      </div>
      {lead && <p className="lead">{lead}</p>}
    </Reveal>
  );
}

/** Service card with cursor-tracking spotlight and 3D tilt. */
export function ServiceCard({ s, index }) {
  const ref = useRef(null);
  const rx = useSpring(0, { stiffness: 150, damping: 15 });
  const ry = useSpring(0, { stiffness: 150, damping: 15 });
  const Icon = s.icon;
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ref.current.style.setProperty('--mx', `${px * 100}%`);
    ref.current.style.setProperty('--my', `${py * 100}%`);
    ry.set((px - 0.5) * 8);
    rx.set((0.5 - py) * 8);
  };
  const leave = () => { rx.set(0); ry.set(0); };
  return (
    <motion.div layout variants={item} initial="hidden" animate="show" exit={{ opacity: 0, scale: 0.9 }} style={{ perspective: 1000 }}>
      <motion.article ref={ref} className="svc-card" style={{ rotateX: rx, rotateY: ry }} onMouseMove={move} onMouseLeave={leave}>
        <Link to={`/services/${s.slug}`} className="svc-img" tabIndex={-1} aria-hidden="true">
          <img src={serviceImg(s.slug)} alt="" loading="lazy" width="900" height="600" />
          <span className="svc-num">{String(index + 1).padStart(2, '0')} / {CATEGORIES[s.cat].short}</span>
        </Link>
        <div className="svc-body">
          <div className="svc-ico"><Icon /></div>
          <h3>{s.title}</h3>
          <p>{s.desc}</p>
          <div className="tags">{s.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
          <Link className="tlink" to={`/services/${s.slug}`}>Explore service <ArrowRight /></Link>
        </div>
      </motion.article>
    </motion.div>
  );
}

/** Service grid: shows 6 first, then 3 more per "Load more". Re-key it to reset. */
export function ServiceGrid({ list, first = 6, step = 3 }) {
  const [count, setCount] = useState(first);
  const shown = list.slice(0, count);
  const left = list.length - shown.length;
  return (
    <>
      <motion.div className="svc-grid" layout variants={stagger} initial="hidden" animate="show">
        <AnimatePresence mode="popLayout">
          {shown.map((s) => <ServiceCard key={s.slug} s={s} index={SERVICES.indexOf(s)} />)}
        </AnimatePresence>
      </motion.div>
      <AnimatePresence>
        {left > 0 && (
          <motion.div className="load-more" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}>
            <motion.button type="button" className="btn btn-ghost" onClick={() => setCount((c) => c + step)} whileHover={{ y: -3 }} whileTap={{ scale: 0.96 }}>
              Load more <span className="lm-count">{left} more</span> <ChevronDown />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function PageHero({ crumb, title, sub }) {
  return (
    <section className="page-hero">
      <div className="wrap">
        <motion.div className="crumb" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Link to="/">Home</Link> / <span style={{ color: 'var(--cyan)' }}>{crumb}</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 1, delay: 0.1, ease }}>
          {title}
        </motion.h1>
        {sub && (
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3, ease }}>
            {sub}
          </motion.p>
        )}
      </div>
    </section>
  );
}

export function CTA({ title = 'Ready for one partner instead of four vendors?', text = 'Tell us what you are running today. We will audit it for free and show you exactly what we would change.' }) {
  return (
    <section className="section tight">
      <div className="wrap">
        <Reveal className="cta">
          <motion.div className="cta-beam" animate={{ x: ['-40vw', '40vw'] }} transition={{ duration: 6, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }} />
          <span className="label">Start a project</span>
          <h2>{title}</h2>
          <p>{text}</p>
          <div className="btns">
            <Btn to="/contact">Get a free audit</Btn>
            <Btn to="/services" variant="ghost" icon={false}>Browse services</Btn>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
