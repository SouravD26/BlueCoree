import { useEffect, useState } from 'react';
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { CheckCircle2, MapPin, Phone, Mail, Clock, Plus, Send } from 'lucide-react';
import { SITE, EMAILJS, SERVICES, CATEGORIES, PRINCIPLES, FAQS, servicesByCat, findService } from '../data';
import { serviceImg, Reveal, Btn, SecHead, ServiceCard, ServiceGrid, PageHero, CTA, stagger, item, ease } from '../components/ui';
import { Stats, FeatureList } from './Home';

const useTitle = (t) => useEffect(() => { document.title = `${t} — ${SITE.name}`; }, [t]);

/* ---------------- Services ---------------- */
export function Services() {
  useTitle('Services');
  const [params, setParams] = useSearchParams();
  const filter = CATEGORIES[params.get('cat')] ? params.get('cat') : 'all';
  const tabs = [['all', 'All', SERVICES.length], ...Object.entries(CATEGORIES).map(([k, c]) => [k, c.label, servicesByCat(k).length])];
  return (
    <>
      <PageHero crumb="Services" title={<>Everything your business <span className="grad">runs on.</span></>}
        sub="Eighteen services across three practices — infrastructure, cloud and software. Pick one, or hand us the lot." />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="chips">
            {tabs.map(([k, l, n]) => (
              <button key={k} className={`chip${filter === k ? ' active' : ''}`} onClick={() => setParams(k === 'all' ? {} : { cat: k }, { replace: true })}>
                {filter === k && <motion.span layoutId="chip-bg2" className="chip-bg" />}
                {l}<span>{n}</span>
              </button>
            ))}
          </Reveal>
          <ServiceGrid list={servicesByCat(filter)} key={filter} />
        </div>
      </section>
      <CTA />
    </>
  );
}

/* ---------------- Service detail ---------------- */
export function ServiceDetail() {
  const { slug } = useParams();
  const s = findService(slug);
  useTitle(s ? s.title : 'Service');
  if (!s) return <Navigate to="/services" replace />;
  const Icon = s.icon;
  const related = servicesByCat(s.cat).filter((r) => r.slug !== s.slug).slice(0, 3);
  return (
    <>
      <PageHero crumb={CATEGORIES[s.cat].label} title={s.title} sub={s.desc} />
      <section className="section tight" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <motion.div className="detail-img" initial={{ opacity: 0, y: 60, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1.1, delay: 0.35, ease }}>
            <motion.img src={serviceImg(s.slug)} alt={s.title} initial={{ scale: 1.25 }} animate={{ scale: 1 }} transition={{ duration: 1.8, ease }} />
          </motion.div>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap detail-grid">
          <div>
            <Reveal>
              <span className="label">What is included</span>
              <h2>Delivered end to end.</h2>
            </Reveal>
            <motion.ul className="checks" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
              {s.points.map((p) => <motion.li key={p} variants={item}><CheckCircle2 />{p}</motion.li>)}
            </motion.ul>
            <Reveal className="tags" style={{ marginTop: '2rem' }}>{s.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</Reveal>
          </div>
          <Reveal className="glass side" delay={0.2}>
            <div className="svc-ico"><Icon /></div>
            <h3>Need {s.title.toLowerCase()}?</h3>
            <p>Send the requirement — you get an itemised quote, usually within one business day.</p>
            <div className="btns">
              <Btn to={`/contact?service=${s.slug}`}>Request a quote</Btn>
              <Btn href={`tel:${SITE.phoneRaw}`} variant="ghost" icon={false}>Call {SITE.phone}</Btn>
            </div>
          </Reveal>
        </div>
      </section>
      {related.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <SecHead label="Related" title={<>More in <span className="grad">{CATEGORIES[s.cat].short}.</span></>} />
            <motion.div className="svc-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
              {related.map((r) => <ServiceCard key={r.slug} s={r} index={SERVICES.indexOf(r)} />)}
            </motion.div>
          </div>
        </section>
      )}
      <CTA />
    </>
  );
}

/* ---------------- About ---------------- */
export function About() {
  useTitle('About');
  return (
    <>
      <PageHero crumb="About" title={<>One partner, from the wall socket <span className="grad">to the app store.</span></>}
        sub="We supply and service the machines, secure the premises, run the cloud accounts, and build the software on top." />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap split">
          <Reveal>
            <span className="label">Who we are</span>
            <h2>IT support that <span className="grad">cannot pass the blame.</span></h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="lead" style={{ color: 'var(--text)' }}>Most businesses juggle a hardware vendor, a network contractor, a hosting
              provider and a web agency — and spend their own time refereeing between them. Every fault becomes somebody else's fault.</p>
            <p style={{ marginTop: '1.2rem' }}>{SITE.name} exists to collapse that into one relationship. The same company supplies your computers,
              wires your network, installs the cameras, configures Microsoft 365 and builds your website. When something breaks, there is
              exactly one number to call — and nobody to point at.</p>
            <p style={{ marginTop: '1.2rem' }}>That works for a five-person office and for a multi-branch operation. What changes is the scale of
              the plan, not the standard of the work.</p>
            <div className="btns" style={{ marginTop: '2rem' }}>
              <Btn to="/services">See all services</Btn>
              <Btn to="/contact" variant="ghost" icon={false}>Talk to us</Btn>
            </div>
          </Reveal>
        </div>
      </section>
      <Stats />
      <section className="section">
        <div className="wrap split">
          <Reveal>
            <span className="label">Principles</span>
            <h2>Four things we <span className="grad">do not bend on.</span></h2>
          </Reveal>
          <FeatureList items={PRINCIPLES} />
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <SecHead label="Capabilities" title={<>Three practices, <span className="grad">one company.</span></>}
            lead="Each practice stands on its own — most clients end up using all three." />
          <motion.div className="svc-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {Object.entries(CATEGORIES).map(([key, c]) => (
              <motion.article key={key} className="svc-card" style={{ padding: "2rem" }} variants={item} whileHover={{ y: -8 }}>
                <span className="svc-num">{key.toUpperCase()}</span>
                <h3 style={{ fontSize: '1.5rem' }}>{c.label}</h3>
                <p style={{ flex: 'none' }}>{servicesByCat(key).length} services in this practice.</p>
                <div className="tags">{servicesByCat(key).map((s) => <span className="tag" key={s.slug}>{s.title}</span>)}</div>
                <Link className="tlink" to={`/services?cat=${key}`}>View practice →</Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
      <CTA title="Want a second opinion on your current setup?" text="We will audit what you have, tell you what is fine, and only quote for what is not." />
    </>
  );
}

/* ---------------- FAQ ---------------- */
export function Faq() {
  useTitle('FAQ');
  const [open, setOpen] = useState(0);
  return (
    <>
      <PageHero crumb="FAQ" title={<>Frequently asked <span className="grad">questions.</span></>}
        sub="Coverage, timelines, pricing and what happens after handover — answered plainly." />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap split">
          <Reveal className="sticky-col">
            <span className="label">Answers</span>
            <h2>The things clients <span className="grad">ask us most.</span></h2>
            <p className="lead" style={{ margin: '1.5rem 0 2rem' }}>Still unanswered? Send the question across — a real engineer replies, usually within a few hours.</p>
            <Btn to="/contact">Ask a question</Btn>
          </Reveal>
          <motion.div className="faq" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {FAQS.map(([q, a], i) => (
              <motion.div key={q} className={`q${open === i ? ' open' : ''}`} variants={item}>
                <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
                  <span>{q}</span>
                  <motion.span className="q-ico" animate={{ rotate: open === i ? 45 : 0 }}><Plus /></motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div className="a" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease }}>
                      <p>{a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <CTA title="Still have a question?" text="Ask it directly. No call centre, no ticket queue — you get an engineer." />
    </>
  );
}

/* ---------------- Contact ---------------- */
const EMPTY = { name: '', phone: '', email: '', company: '', service: '', message: '', website: '' };

function validate(d) {
  const e = {};
  if (d.name.trim().length < 2) e.name = 'Please enter your name.';
  if (!/^[+\d][\d\s-]{6,}$/.test(d.phone.trim())) e.phone = 'Please enter a valid phone number.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim())) e.email = 'Please enter a valid email address.';
  return e;
}

export function Contact() {
  useTitle('Contact');
  const [params] = useSearchParams();
  const pre = findService(params.get('service') || '');
  const [data, setData] = useState({ ...EMPTY, service: pre ? pre.title : '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | failed

  const set = (k) => (e) => setData({ ...data, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (data.website) { setStatus('sent'); return; } // honeypot
    const errs = validate(data);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus('sending');
    try {
      await emailjs.send(EMAILJS.serviceId, EMAILJS.templateId, {
        to_email: SITE.email, name: data.name, phone: data.phone, email: data.email,
        company: data.company, service: data.service, message: data.message, page_url: window.location.href,
      }, { publicKey: EMAILJS.publicKey });
      setStatus('sent');
      setData(EMPTY);
    } catch {
      setStatus('failed');
    }
  };

  const info = [
    [MapPin, 'Office', SITE.address],
    [Phone, 'Phone', <a href={`tel:${SITE.phoneRaw}`}>{SITE.phone}</a>],
    [Mail, 'Email', <a href={`mailto:${SITE.email}`}>{SITE.email}</a>],
    [Clock, 'Hours', SITE.hours],
  ];

  const field = (k, label, props = {}) => (
    <div className="field">
      <label htmlFor={k}>{label}</label>
      <input id={k} value={data[k]} onChange={set(k)} {...props} />
      {errors[k] && <span className="err">{errors[k]}</span>}
    </div>
  );

  return (
    <>
      <PageHero crumb="Contact" title={<>Tell us what <span className="grad">you need.</span></>}
        sub="Send the requirement across and our team replies within one business day. Urgent breakdown? Call instead — it is faster." />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap contact-grid">
          <Reveal>
            <span className="label">Reach us</span>
            <h2>Direct lines.</h2>
            <motion.ul className="info" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
              {info.map(([I, b, v]) => (
                <motion.li key={b} variants={item}>
                  <span className="ic"><I /></span>
                  <div><b>{b}</b><span>{v}</span></div>
                </motion.li>
              ))}
            </motion.ul>
          </Reveal>

          <Reveal delay={0.15}>
            <form className="glass form" onSubmit={submit} noValidate>
              <AnimatePresence>
                {status === 'sent' && (
                  <motion.div className="alert ok" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    Thank you! Your enquiry has been received — we will contact you within one business day.
                  </motion.div>
                )}
                {status === 'failed' && (
                  <motion.div className="alert bad" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    Sorry, we could not send your enquiry. Please call us on {SITE.phone}.
                  </motion.div>
                )}
              </AnimatePresence>
              <input className="hp" tabIndex={-1} autoComplete="off" value={data.website} onChange={set('website')} aria-hidden="true" />
              <div className="form-row">
                {field('name', 'Full name *', { placeholder: 'Your name' })}
                {field('phone', 'Phone *', { type: 'tel', placeholder: SITE.phone })}
              </div>
              <div className="form-row">
                {field('email', 'Email *', { type: 'email', placeholder: 'you@company.com' })}
                {field('company', 'Company', { placeholder: 'Company name' })}
              </div>
              <div className="field">
                <label htmlFor="service">Service</label>
                <select id="service" value={data.service} onChange={set('service')}>
                  <option value="">Select a service</option>
                  {Object.entries(CATEGORIES).map(([k, c]) => (
                    <optgroup key={k} label={c.label}>
                      {servicesByCat(k).map((s) => <option key={s.slug} value={s.title}>{s.title}</option>)}
                    </optgroup>
                  ))}
                  <option value="Other">Other / not sure</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="message">Message</label>
                <textarea id="message" value={data.message} onChange={set('message')} placeholder="Tell us briefly what you need..." />
              </div>
              <motion.button type="submit" className="btn btn-primary" disabled={status === 'sending'} whileTap={{ scale: 0.97 }}>
                {status === 'sending' ? <><span className="spin" /> Sending…</> : <>Send enquiry <Send /></>}
              </motion.button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ---------------- 404 ---------------- */
export function NotFound() {
  useTitle('Page not found');
  return (
    <section className="nf">
      <div>
        <motion.h1 className="grad" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease }}>404</motion.h1>
        <p className="lead" style={{ margin: '0 auto 2rem' }}>This page went offline. Everything else is still running.</p>
        <Btn to="/">Back to home</Btn>
      </div>
    </section>
  );
}
