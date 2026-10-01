import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import HeroNetwork from '../components/HeroNetwork';
import { SERVICES, CATEGORIES, MARQUEE, STATS, PROCESS, WHY, TESTIMONIALS, servicesByCat } from '../data';
import { Reveal, Counter, Btn, SecHead, ServiceGrid, CTA, ease, stagger, item } from '../components/ui';

const WORDS = ['infrastructure', 'networks', 'servers', 'security', 'cloud'];

function Hero() {
  const [w, setW] = useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const t = setInterval(() => setW((i) => (i + 1) % WORDS.length), 2400);
    return () => clearInterval(t);
  }, []);

  const lines = [
    <>We power your</>,
    <span className="rotator">
      <AnimatePresence mode="wait">
        <motion.span key={WORDS[w]} className="grad" style={{ display: 'inline-block' }}
          initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '-100%', opacity: 0 }} transition={{ duration: 0.5, ease }}>
          {WORDS[w]}.
        </motion.span>
      </AnimatePresence>
    </span>,
  ];

  return (
    <section className="hero" ref={ref}>
      <motion.div className="wrap hero-grid" style={{ y, opacity: fade }}>
        <div>
          <h1>
            {lines.map((l, i) => (
              <span className="line" key={i}>
                <motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.4 + i * 0.12, ease }}>{l}</motion.span>
              </span>
            ))}
          </h1>
          <motion.p className="hero-sub" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.9, ease }}>
            Bluecoree is an IT services company with a development studio attached. Computers, networks,
            CCTV and cloud on one side — websites, e-commerce and mobile apps on the other.
            <b style={{ color: 'var(--text)', fontWeight: 500 }}> One partner, one invoice, one number to call.</b>
          </motion.p>
          <motion.div className="btns" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.9, ease }}>
            <Btn to="/services">Explore services</Btn>
            <Btn to="/contact" variant="ghost" icon={false}>Get a free audit</Btn>
          </motion.div>
        </div>

        <HeroNetwork />
      </motion.div>
      <div className="hero-scroll">SCROLL<i /></div>
    </section>
  );
}

export function Marquee() {
  const list = [...MARQUEE, ...MARQUEE];
  return (
    <div className="marquee" aria-label="Technologies we work with">
      <div className="marquee-track">{list.map((m, i) => <span key={i}>{m}</span>)}</div>
    </div>
  );
}

function Services() {
  const [filter, setFilter] = useState('all');
  const list = servicesByCat(filter);
  const tabs = [['all', 'All', SERVICES.length], ...Object.entries(CATEGORIES).map(([k, c]) => [k, c.label, servicesByCat(k).length])];
  return (
    <section className="section" id="services">
      <div className="wrap">
        <SecHead label="What we do" title={<>Eighteen services. <span className="grad">One accountable team.</span></>}
          lead="Filter by practice — or browse everything. Each service links to exactly what is included and how it is delivered." />
        <Reveal className="chips">
          {tabs.map(([k, l, n]) => (
            <button key={k} className={`chip${filter === k ? ' active' : ''}`} onClick={() => setFilter(k)}>
              {filter === k && <motion.span layoutId="chip-bg" className="chip-bg" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
              {l}<span>{n}</span>
            </button>
          ))}
        </Reveal>
        <ServiceGrid list={list} key={filter} />
      </div>
    </section>
  );
}

export function Stats() {
  return (
    <section className="section tight">
      <div className="wrap">
        <motion.div className="glass stats-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
          {STATS.map((s) => (
            <motion.div className="stat" key={s.label} variants={item}>
              <b>{s.prefix}<span className="grad"><Counter value={s.value} /></span>{s.suffix}</b>
              <small>{s.label}</small>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function FeatureList({ items }) {
  return (
    <motion.ul className="features" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
      {items.map(([t, d], i) => (
        <motion.li className="feature" key={t} variants={item}>
          <span className="fnum">{String(i + 1).padStart(2, '0')}</span>
          <div><b>{t}</b><span>{d}</span></div>
        </motion.li>
      ))}
    </motion.ul>
  );
}

function Why() {
  return (
    <section className="section">
      <div className="wrap split">
        <Reveal className="sticky-col">
          <span className="label">Why us</span>
          <h2>Most IT problems are really <span className="grad">vendor problems.</span></h2>
          <p className="lead" style={{ margin: '1.5rem 0 2rem' }}>When the printer, the network and the website belong to three different
            companies, every fault turns into a negotiation. We hold all three, so there is nobody left to blame — including us.</p>
          <Btn to="/about" variant="ghost">About the company</Btn>
        </Reveal>
        <FeatureList items={WHY} />
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="section">
      <div className="wrap">
        <SecHead label="How we work" title={<>Audit, plan, build, <span className="grad">launch, scale.</span></>}
          lead="The same five steps whether we are wiring an office or shipping an app." />
        <motion.div className="timeline" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-100px' }}>
          <div className="tl-line">
            <motion.i variants={{ hidden: { scale: 0 }, show: { scale: 1, transition: { duration: 1.8, ease } } }} />
          </div>
          {PROCESS.map(([t, d], i) => (
            <motion.div className="tl-step" key={t} variants={item}>
              <span className="tl-n">{String(i + 1).padStart(2, '0')}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [i, setI] = useState(0);
  const n = TESTIMONIALS.length;
  const go = (d) => setI((v) => (v + d + n) % n);
  useEffect(() => {
    const t = setTimeout(() => go(1), 7000);
    return () => clearTimeout(t);
  }, [i]); // eslint-disable-line react-hooks/exhaustive-deps
  const t = TESTIMONIALS[i];
  return (
    <section className="section">
      <div className="wrap">
        <SecHead label="Clients" title={<>What they say <span className="grad">afterwards.</span></>} />
        <Reveal className="glass tst">
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, x: 60, filter: 'blur(8px)' }} animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -60, filter: 'blur(8px)' }} transition={{ duration: 0.6, ease }}>
              <blockquote className="tst-quote">“{t.quote}”</blockquote>
              <div className="tst-by">
                <span className="tst-av">{t.name[0]}</span>
                <div><b>{t.name}</b><small>{t.company}</small></div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="tst-nav">
            <button className="icon-btn" onClick={() => go(-1)} aria-label="Previous testimonial"><ArrowLeft /></button>
            <button className="icon-btn" onClick={() => go(1)} aria-label="Next testimonial"><ArrowRight /></button>
            <div className="dots">
              {TESTIMONIALS.map((_, k) => <button key={k} className={k === i ? 'on' : ''} onClick={() => setI(k)} aria-label={`Testimonial ${k + 1}`} />)}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  useEffect(() => { document.title = 'Bluecoree — IT Infrastructure, Cloud & Web Development'; }, []);
  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <Stats />
      <Why />
      <Process />
      <Testimonials />
      <CTA />
    </>
  );
}
