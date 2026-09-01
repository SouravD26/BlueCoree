/* =================================================================
   Bluecoree — Interactions
   Every block is isolated: if one throws, the rest still runs.
   ================================================================= */
(function () {
  'use strict';

  /* Mark that JS is alive. CSS only hides .reveal / .rise when this
     class is present, so a broken or blocked script can never leave
     the page blank. */
  var root = document.documentElement;
  root.classList.add('js');

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduce = false;
  try {
    reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (err) { /* older browsers */ }

  /* Run a block in isolation. */
  function safe(name, fn) {
    try { fn(); }
    catch (err) { if (window.console) console.error('[bluecoree] ' + name + ':', err); }
  }

  function pad(n) { return (n < 10 ? '0' : '') + n; }   /* no padStart dependency */

  /* ---------------- Reveal on scroll ---------------- */
  safe('reveal', function () {
    var items = $$('.reveal, .rise');
    if (!items.length) return;

    var showAll = function () {
      items.forEach(function (el) { el.classList.add('in'); });
    };

    if (reduce || !('IntersectionObserver' in window)) { showAll(); return; }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el) { io.observe(el); });

    /* Safety net: nothing stays invisible, whatever happens. */
    setTimeout(showAll, 2500);
  });

  /* ---------------- Header + back to top ---------------- */
  safe('header', function () {
    var header = $('#header');
    var toTop  = $('#toTop');

    function onScroll() {
      var y = window.pageYOffset || document.documentElement.scrollTop || 0;
      if (header) header.classList.toggle('scrolled', y > 30);
      if (toTop)  toTop.classList.toggle('show', y > 600);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (toTop) {
      toTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
      });
    }
  });

  /* ---------------- Mobile menu ---------------- */
  safe('menu', function () {
    var burger = $('#burger');
    var menu   = $('#menu');
    if (!burger || !menu) return;

    function setMenu(open) {
      menu.classList.toggle('open', open);
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    }
    burger.addEventListener('click', function () {
      setMenu(!menu.classList.contains('open'));
    });
    menu.addEventListener('click', function (ev) {
      var link = ev.target.closest ? ev.target.closest('a') : null;
      if (link) setMenu(false);
    });
    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape') setMenu(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 880) setMenu(false);
    });
  });

  /* ---------------- Service filter ---------------- */
  safe('filter', function () {
    var chips = $$('button.chip[data-filter]');
    var rows  = $$('#svcRows .svc-row');
    if (!chips.length || !rows.length) return;

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');

        var f = chip.getAttribute('data-filter');
        var n = 0;
        rows.forEach(function (row) {
          var show = f === 'all' || row.getAttribute('data-cat') === f;
          row.hidden = !show;
          if (show) {
            n++;
            var num = $('.svc-num', row);
            if (num) num.textContent = pad(n);
            row.classList.add('in');
          }
        });
      });
    });
  });

  /* ---------------- FAQ accordion ---------------- */
  safe('faq', function () {
    var qs = $$('.q');
    if (!qs.length) return;

    qs.forEach(function (item) {
      var btn = $('button', item);
      var ans = $('.a', item);
      if (!btn || !ans) return;

      btn.addEventListener('click', function () {
        var wasOpen = item.classList.contains('open');
        $$('.q.open').forEach(function (o) {
          o.classList.remove('open');
          var a = $('.a', o), b = $('button', o);
          if (a) a.style.maxHeight = null;
          if (b) b.setAttribute('aria-expanded', 'false');
        });
        if (!wasOpen) {
          item.classList.add('open');
          ans.style.maxHeight = ans.scrollHeight + 'px';
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    window.addEventListener('resize', function () {
      var open = $('.q.open .a');
      if (open) open.style.maxHeight = open.scrollHeight + 'px';
    });
  });

  /* ---------------- Counters ---------------- */
  safe('counters', function () {
    var counters = $$('[data-count]');
    if (!counters.length) return;

    function run(el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      if (isNaN(target)) return;
      if (reduce) { el.textContent = target; return; }

      var start = null, dur = 1600;
      function tick(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        el.textContent = Math.floor(target * (1 - Math.pow(1 - p, 3.2)));
        if (p < 1) { requestAnimationFrame(tick); } else { el.textContent = target; }
      }
      requestAnimationFrame(tick);
    }

    if (!('IntersectionObserver' in window)) {
      counters.forEach(function (c) { c.textContent = c.getAttribute('data-count'); });
      return;
    }
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { run(en.target); co.unobserve(en.target); }
      });
    }, { threshold: 0.35 });
    counters.forEach(function (c) { co.observe(c); });

    /* Safety net so figures never sit at 0. */
    setTimeout(function () {
      counters.forEach(function (c) {
        if (c.textContent === '0') c.textContent = c.getAttribute('data-count');
      });
    }, 4000);
  });

  /* ---------------- Testimonial carousel ---------------- */
  safe('testimonials', function () {
    var track = $('#tstTrack');
    if (!track) return;

    var items = $$('.tst-item', track);
    if (items.length < 1) return;

    var idx = 0, timer = null;
    var count = $('#tstCount');

    function go(i) {
      idx = (i + items.length) % items.length;
      track.style.transform = 'translateX(' + (-idx * 100) + '%)';
      if (count) count.textContent = pad(idx + 1) + ' / ' + pad(items.length);
    }
    function autoplay() {
      if (reduce || items.length < 2) return;
      clearInterval(timer);
      timer = setInterval(function () { go(idx + 1); }, 7000);
    }

    var prev = $('#tstPrev'), next = $('#tstNext');
    if (prev) prev.addEventListener('click', function () { go(idx - 1); autoplay(); });
    if (next) next.addEventListener('click', function () { go(idx + 1); autoplay(); });

    var x0 = null;
    track.addEventListener('touchstart', function (ev) {
      x0 = ev.touches[0].clientX;
    }, { passive: true });
    track.addEventListener('touchend', function (ev) {
      if (x0 === null) return;
      var dx = ev.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 45) { go(dx < 0 ? idx + 1 : idx - 1); autoplay(); }
      x0 = null;
    }, { passive: true });

    var box = $('#tst');
    if (box) {
      box.addEventListener('mouseenter', function () { clearInterval(timer); });
      box.addEventListener('mouseleave', autoplay);
    }

    go(0);
    autoplay();
  });

  /* ---------------- Contact form pre-check ----------------
     contact.php re-validates everything server-side. */
  safe('form', function () {
    var form = $('#quoteForm');
    var msg  = $('#formMsg');
    if (!form || !msg) return;
    var sent = false;

    form.addEventListener('submit', function (ev) {
      function val(n) {
        var el = form.elements[n];
        return el ? String(el.value).replace(/^\s+|\s+$/g, '') : '';
      }
      var name = val('name'), phone = val('phone'), email = val('email');

      function fail(text) {
        ev.preventDefault();
        msg.textContent = text;
        msg.className = 'form-msg show error';
        try { msg.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' }); }
        catch (e) { msg.scrollIntoView(); }
      }

      if (!name || !phone || !email) return fail('Please fill in your name, phone and email.');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return fail('Please enter a valid email address.');
      if (!/^[\d+\-\s()]{8,20}$/.test(phone)) return fail('Please enter a valid phone number.');

      var btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = 'Sending <i class="fa-solid fa-circle-notch fa-spin"></i>';
      }

      /* EmailJS delivery. Send client-side first, then let the form POST so the
         enquiry is still logged server-side and the success flash is shown. */
      var cfg = window.BC_EMAILJS;
      if (!sent && cfg && window.emailjs) {
        ev.preventDefault();
        emailjs.send(cfg.serviceId, cfg.templateId, {
          to_email: cfg.toEmail,
          name:     name,
          phone:    phone,
          email:    email,
          company:  val('company'),
          service:  val('service'),
          message:  val('message'),
          page_url: window.location.href
        })['catch'](function () { /* fall through — PHP still logs the enquiry */ })
          .then(function () { sent = true; form.submit(); });
      }
    });
  });

  /* ---------------- Auto-hide success flash ---------------- */
  safe('flash', function () {
    var flash = $('.form-msg.show.success');
    if (flash) setTimeout(function () { flash.classList.remove('show'); }, 9000);
  });
})();
