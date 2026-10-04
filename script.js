/* =============================================================================
   Supertonic! — script.js (v3)
   data · members(accordion+roles) · alumni('26) · gallery(carousel) · showcase
   · nav · menu · notes · GSAP motion (word reveals) · contact · misc
   ========================================================================== */
(() => {
  'use strict';
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]));

  // scsupertonic@gmail.com is also shown on the page; the two scu.edu addresses stay hidden
  const CONTACT_EMAILS = ['scsupertonic@gmail.com', 'gspangler@scu.edu', 'aranade2@scu.edu'];

  /* --------------------------------------------------- Current members ----- */
  const MEMBERS = [
    { name: 'Jessica Jacoby',   part: 'Soprano', year: "'27", photo: 'assets/members/jessica.jpg',
      bio: "Phoenix, AZ · Economics & Music. She studied classical voice in Vienna — performing in chamber ensembles and interning at the Vienna State Opera — and also sings with Chamber Singers and cantors at Mission Santa Clara." },
    { name: "Lia O'Donovan",    part: 'Soprano', role: 'Music Director', year: "'29", photo: 'assets/members/lia.jpg',
      bio: "Palo Alto, CA · Music & Communications. The group's Music Director — eleven years with the iSing girls' choir and a lifelong theatre kid, thrilled that one Tonics hangout became a full karaoke Hamilton." },
    { name: 'Grace Anderson',   part: 'Soprano', role: 'Rehearsal Director', year: "'27", photo: 'assets/members/grace.jpg',
      bio: "Hartland, WI · Mechanical Engineering, Aerospace minor. A Rehearsal Director who's been singing since age three; off-stage she's in boxing and improv, and co-founded SCU's Line Dancing Club." },
    { name: 'Hermione Summers', part: 'Soprano', year: "'28", photo: 'assets/members/hermione.jpg',
      bio: "Psychology, Studio Art minor. A lifelong musical-theatre performer (Gavroche in Les Mis, Little Red in Into the Woods) who loves horseback riding and friendship bracelets." },
    { name: 'Chanel Allegakoen',part: 'Alto', role: 'Vice President', year: "'28", photo: 'assets/members/chanel.jpg',
      bio: "San Jose, CA · Marketing, Business Analytics minor. The group's Vice President & Social Chair — music keeps her connected to her late grandmother, a celebrated singer in Malaysia." },
    { name: 'Georgia Spangler', part: 'Alto', role: 'President', year: "'27", photo: 'assets/members/georgia.jpg',
      bio: "Boston, MA · Mathematics. The group's President, now in her third year of Supertonic; a member of the Association for Women in Mathematics and Kappa Kappa Gamma, and a TA. Always down for bagels and coffee." },
    { name: 'Milan Shetty',     part: 'Tenor', year: "'28", photo: 'assets/members/milan.jpg',
      bio: "Sammamish, WA · Accounting. Grew up singing and playing multiple instruments; loves the outdoors, rock climbing, and bodies of water big and small." },
    { name: 'Sebastian Misner', part: 'Tenor · Beatbox', role: 'Rehearsal Director', year: "'29", photo: 'assets/members/sebastian.jpg',
      bio: "Bellevue, WA · Industrial Design (intended). The group's beatboxer and a Rehearsal Director — a DJ and staffer at KSCU who's acted in One Acts and student films. Ask him about sunset beach hangouts." },
    { name: 'Ajinkya Ranade',   part: 'Bass', year: "'29", photo: 'assets/members/ajinkya.jpg',
      bio: "Cupertino, CA · Computer Science. The group's bass and a percussionist across everything from djembe to cajón — 12+ years on tabla, with performances from LA to Mumbai." },
  ];

  /* --------------------------------------------------------- Alumni '26 ----- */
  const ALUMNI = [
    { name: 'Cassi Bull',       part: 'Soprano · President', year: "'26", photo: 'assets/alumni/cassi.jpg',
      bio: "Kirkland, WA · Child Studies & Psychology. A 10+ year pianist — off to a Fulbright in Taiwan, then a Speech-Language Pathology master's at Northeastern." },
    { name: 'Isabella Bhamre',  part: 'Alto · Treasurer', year: "'26", photo: 'assets/alumni/isabella.jpg',
      bio: "Denver, CO · Communication (film emphasis), Marketing minor. Roles in A Chorus Line, Little Women & Legally Blonde — now chasing a career in film." },
    { name: 'Dzidzo Lassey',    part: 'Alto', year: "'26", photo: 'assets/alumni/dzidzo.jpg',
      bio: "Columbia, MD · Accounting, Studio Arts minor. Joined senior year and lit up every room — heading into Accounting Advisory in San Francisco." },
    { name: 'Colin Friedel',    part: 'Bass', year: "'26", photo: 'assets/alumni/colin.jpg',
      bio: "San Ramon, CA · Computer Science & Engineering. Picked up guitar in 2020 and never put it down; found his SCU family in the group." },
    { name: 'Josh Goodloe',     part: 'Tenor', year: "'26", photo: 'assets/alumni/josh.jpg',
      bio: "Los Angeles, CA · Leavey School of Business. Gospel-choir roots and award-winning theatrical roles (Princess Bride, Midsummer) — four years a Tonic." },
    { name: 'Erik Pompermayer', part: 'Bass', year: "'26", photo: 'assets/alumni/erik.jpg',
      bio: "Seattle, WA · Management Information Systems. Club boxer and Miller Center fellow; next stop, Naval Officer Candidate School and Navy Flight School." },
  ];

  const GALLERY = Array.from({ length: 27 }, (_, i) =>
    `assets/gallery/photo-${String(i + 1).padStart(2, '0')}.jpg`);

  /* ----------------------------------------------- Render: members panels -- */
  function renderMembers() {
    const wrap = document.getElementById('members-accordion');
    if (!wrap) return;
    wrap.innerHTML = MEMBERS.map((m) => {
      const badge = m.role ? `<span class="panel__badge">${esc(m.role)}</span>` : '';
      return `
      <article class="panel reveal" role="listitem" tabindex="0"
               aria-label="${esc(m.name)}, ${esc(m.part)}${m.role ? ', ' + esc(m.role) : ''}"
               style="background-image:url('${m.photo}')">
        <div class="panel__scrim"></div>
        <div class="panel__label">
          <span class="panel__name">${esc(m.name)}</span>
          <span class="panel__part">${esc(m.part)}</span>
        </div>
        <div class="panel__content">
          ${badge}
          <h3>${esc(m.name)} <em>${esc(m.year)}</em></h3>
          <p class="panel__role">${esc(m.part)}</p>
          <p class="panel__bio">${esc(m.bio)}</p>
        </div>
      </article>`;
    }).join('');

    wrap.querySelectorAll('.panel').forEach((p) => {
      p.addEventListener('click', () => {
        const open = p.classList.contains('is-open');
        wrap.querySelectorAll('.panel').forEach((x) => x.classList.remove('is-open'));
        if (!open) p.classList.add('is-open');
      });
    });
  }

  /* ------------------------------------------------- Render: alumni grid --- */
  function renderAlumni() {
    const grid = document.getElementById('alumni-grid');
    if (!grid) return;
    grid.innerHTML = ALUMNI.map((m) => `
      <article class="alum reveal" tabindex="0" aria-label="${esc(m.name)}, ${esc(m.part)}, class of 2026">
        <span class="alum__ribbon">'26</span>
        <img src="${m.photo}" alt="${esc(m.name)} — ${esc(m.part)}" loading="lazy" />
        <div class="alum__scrim"></div>
        <div class="alum__body">
          <div class="alum__name">${esc(m.name)} <em>${esc(m.year)}</em></div>
          <div class="alum__part">${esc(m.part)}</div>
          <p class="alum__bio">${esc(m.bio)}</p>
        </div>
      </article>`).join('');
  }

  /* --------------------------------------------- Render + drive carousel --- */
  function initCarousel() {
    const track = document.getElementById('carousel-track');
    const dotsWrap = document.getElementById('carousel-dots');
    const prev = document.getElementById('car-prev');
    const next = document.getElementById('car-next');
    if (!track) return;

    track.innerHTML = GALLERY.map((src, i) => `
      <figure class="slide"><img src="${src}" alt="Supertonic! moment ${i + 1}" loading="lazy" /></figure>`).join('');
    dotsWrap.innerHTML = GALLERY.map((_, i) =>
      `<button class="dot${i === 0 ? ' is-active' : ''}" data-i="${i}" aria-label="Go to photo ${i + 1}"></button>`).join('');

    const step = () => { const s = track.querySelector('.slide'); return s ? s.offsetWidth + 18 : track.clientWidth; };
    const go = (dir) => {
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 6;
      if (dir > 0 && atEnd) track.scrollTo({ left: 0, behavior: 'smooth' });
      else track.scrollBy({ left: dir * step(), behavior: 'smooth' });
    };
    prev.addEventListener('click', () => go(-1));
    next.addEventListener('click', () => go(1));

    const dots = [...dotsWrap.children];
    dots.forEach((d) => d.addEventListener('click', () => track.scrollTo({ left: d.dataset.i * step(), behavior: 'smooth' })));
    let raf;
    track.addEventListener('scroll', () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const i = Math.round(track.scrollLeft / step());
        dots.forEach((d, j) => d.classList.toggle('is-active', j === i));
      });
    }, { passive: true });

    // pointer drag (desktop)
    let down = false, sx = 0, sl = 0;
    track.addEventListener('pointerdown', (e) => { down = true; sx = e.clientX; sl = track.scrollLeft; track.classList.add('is-dragging'); track.setPointerCapture(e.pointerId); });
    track.addEventListener('pointermove', (e) => { if (down) track.scrollLeft = sl - (e.clientX - sx); });
    const end = () => { down = false; track.classList.remove('is-dragging'); };
    track.addEventListener('pointerup', end);
    track.addEventListener('pointercancel', end);

    // autoplay (pause on hover / tab hidden)
    let timer = null;
    const play = () => { if (!prefersReduced && !timer) timer = setInterval(() => go(1), 4500); };
    const stop = () => { clearInterval(timer); timer = null; };
    const car = document.getElementById('carousel');
    car.addEventListener('pointerenter', stop);
    car.addEventListener('pointerleave', play);
    document.addEventListener('visibilitychange', () => (document.hidden ? stop() : play()));
    car.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') go(-1); if (e.key === 'ArrowRight') go(1); });
    play();
  }

  /* -------------------------------------------------------------- NAV ------ */
  function initNav() {
    const nav = document.getElementById('nav');
    const onScroll = () => nav.classList.toggle('nav--scrolled', window.scrollY > 40);
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
  }
  function initMobileMenu() {
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');
    if (!toggle || !links) return;
    const close = () => { document.body.classList.remove('nav-open'); toggle.setAttribute('aria-expanded', 'false'); };
    toggle.addEventListener('click', () => {
      const open = document.body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    links.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
  }

  /* ------------------------------------------------- MUSICAL NOTES CANVAS -- */
  function initNotes() {
    const canvas = document.getElementById('notes-canvas');
    if (!canvas || prefersReduced) return;
    const ctx = canvas.getContext('2d');
    const glyphs = ['♪', '♫', '♩', '♬'];
    let w, h, notes, raf;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => { w = canvas.width = innerWidth * DPR; h = canvas.height = innerHeight * DPR; canvas.style.width = innerWidth + 'px'; canvas.style.height = innerHeight + 'px'; };
    const make = (fromBottom = true) => ({
      x: Math.random() * w, y: fromBottom ? h + Math.random() * h * 0.4 : Math.random() * h,
      size: (14 + Math.random() * 26) * DPR, speed: (0.18 + Math.random() * 0.6) * DPR,
      drift: (Math.random() - 0.5) * 0.4 * DPR, sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.005 + Math.random() * 0.01, alpha: 0.06 + Math.random() * 0.16,
      glyph: glyphs[(Math.random() * glyphs.length) | 0], teal: Math.random() < 0.35,
    });
    const spawn = () => { const c = Math.round((innerWidth * innerHeight) / 72000); notes = Array.from({ length: Math.max(12, Math.min(c, 40)) }, () => make()); };
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const n of notes) {
        n.y -= n.speed; n.sway += n.swaySpeed; n.x += n.drift + Math.sin(n.sway) * 0.3 * DPR;
        if (n.y < -n.size) Object.assign(n, make(false), { y: h + n.size });
        ctx.globalAlpha = n.alpha; ctx.fillStyle = n.teal ? '#2ad7c6' : '#1a1a1d';
        ctx.font = `${n.size}px serif`; ctx.fillText(n.glyph, n.x, n.y);
      }
      ctx.globalAlpha = 1; raf = requestAnimationFrame(tick);
    };
    resize(); spawn(); tick();
    let t; window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(() => { resize(); spawn(); }, 200); });
    document.addEventListener('visibilitychange', () => { if (document.hidden) cancelAnimationFrame(raf); else tick(); });
  }

  /* ------------------------------------------------- Split headings -> words */
  function splitWords(el) {
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map((w) => `<span class="word">${esc(w)}</span>`).join(' ');
    return el.querySelectorAll('.word');
  }

  /* ------------------------------------------------- SCROLL ANIMATIONS ----- */
  function initAnimations() {
    const show = (sel) => document.querySelectorAll(sel).forEach((el) => { el.style.opacity = 1; el.style.transform = 'none'; });
    if (prefersReduced || typeof window.gsap === 'undefined') {
      show('.reveal'); show('.pop');
      runCounts(true);
      return;
    }
    const { gsap } = window; gsap.registerPlugin(window.ScrollTrigger);

    // Hero: quick pops
    gsap.from('.hero__title', { yPercent: 28, opacity: 0, duration: 0.6, ease: 'power3.out', delay: 0.05 });
    gsap.to('.hero__intro .reveal', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1, delay: 0.15 });
    gsap.to('.hero__photo', { yPercent: 12, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

    // FAST word reveals on every .split heading
    gsap.utils.toArray('.split').forEach((el) => {
      const words = splitWords(el);
      gsap.from(words, { yPercent: 115, opacity: 0, duration: 0.5, ease: 'power3.out', stagger: 0.035,
        scrollTrigger: { trigger: el, start: 'top 90%' } });
    });

    // generic reveals
    gsap.utils.toArray('.reveal').forEach((el) => {
      if (el.closest('.hero__intro')) return;
      if (el.classList.contains('panel') || el.classList.contains('alum')) return;
      gsap.to(el, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
    });

    // pop-in images/cards (about photos, showcase) — fast + staggered
    gsap.utils.toArray('.pop').forEach((el) => {
      gsap.fromTo(el, { opacity: 0, y: 24, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 94%' } });
    });

    // carousel slides: slide-in stagger
    gsap.from('.slide', { xPercent: 8, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.05,
      scrollTrigger: { trigger: '#carousel', start: 'top 86%' } });

    // vibe video parallax
    gsap.to('.vibe__video', { yPercent: 10, ease: 'none', scrollTrigger: { trigger: '.vibe', start: 'top bottom', end: 'bottom top', scrub: true } });

    // members panels + alumni pop
    gsap.set('.panel', { scale: 0.94 });
    gsap.to('.panel', { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out', stagger: 0.06, scrollTrigger: { trigger: '#members-accordion', start: 'top 84%' } });
    gsap.set('.alum', { scale: 0.94 });
    gsap.to('.alum', { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out', stagger: 0.07, scrollTrigger: { trigger: '#alumni-grid', start: 'top 86%' } });

    runCounts(false, gsap);
  }

  function runCounts(instant, gsap) {
    document.querySelectorAll('.stat__num[data-count]').forEach((el) => {
      const target = +el.dataset.count;
      if (instant || !gsap) { el.textContent = target; return; }
      const o = { v: 0 };
      gsap.to(o, { v: target, duration: 1.6, ease: 'power2.out',
        onUpdate: () => { el.textContent = Math.round(o.v); },
        scrollTrigger: { trigger: el, start: 'top 92%' } });
    });
  }

  /* -------------------------------------------------------------- FORM ----- */
  function initForm() {
    const form = document.getElementById('contact-form');
    const note = document.getElementById('form-note');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const d = Object.fromEntries(new FormData(form).entries());
      const subject = encodeURIComponent(`[Supertonic! · ${d.type}] from ${d.name}`);
      const body = encodeURIComponent(`${d.message}\n\n— ${d.name} (${d.email})`);
      window.location.href = `mailto:${CONTACT_EMAILS.join(',')}?subject=${subject}&body=${body}`;
      note.textContent = 'Opening your email app… or just DM us @scsupertonic!';
      form.reset();
    });
  }

  /* -------------------------------------------------------------- BOOT ----- */
  document.addEventListener('DOMContentLoaded', () => {
    renderMembers();
    renderAlumni();
    initCarousel();
    initNav();
    initMobileMenu();
    initNotes();
    initForm();
    const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
    initAnimations();
    document.body.classList.add('is-ready');
  });
})();
