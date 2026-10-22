(() => {
  'use strict';
  const config = window.ARGENTEA_CONFIG || {};
  document.documentElement.classList.add('js');
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#navigation');
  menuButton.hidden = false;
  const closeMenu = (restoreFocus = false) => {
    navigation.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    if (restoreFocus) menuButton.focus();
  };
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('is-open', open);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
  navigation.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link) return;
    const mobileOpen = menuButton.getAttribute('aria-expanded') === 'true';
    closeMenu();
    if (mobileOpen) {
      const target = document.querySelector(link.hash);
      if (target) { target.tabIndex = -1; target.focus({ preventScroll: true }); }
    }
  });
  matchMedia('(min-width: 900px)').addEventListener('change', () => closeMenu());
  const validUrl = value => {
    if (!value || typeof value !== 'string') return null;
    try { const url = new URL(value, location.href); return ['http:', 'https:'].includes(url.protocol) ? url.href : null; }
    catch { return null; }
  };
  for (const element of document.querySelectorAll('[data-brand], [data-program]')) {
    const key = element.dataset.brand || element.dataset.program;
    const url = validUrl(config.logos?.[key]);
    if (!url) continue;
    const existing = element.querySelector('img');
    if (existing && existing.src === url) continue;
    const image = new Image(); image.src = url;
    image.alt = element.dataset.brand ? 'Argéntea' : key === 'pci' ? 'PCI — Programa de Capacitación para Instituciones' : 'ECO — Escuela de Liderazgo y Ciudadanía';
    image.width = 400; image.height = 120;
    element.replaceChildren(image);
  }
  const ecoUrl = validUrl(config.ecoUrl);
  if (ecoUrl) { const link = document.querySelector('#eco-cta'); link.href = ecoUrl; delete link.dataset.interest; }
  const privacyUrl = validUrl(config.privacyUrl);
  if (privacyUrl) { const link = document.querySelector('#privacy-link'); link.href = privacyUrl; link.hidden = false; }
  const form = document.querySelector('#contact-form');
  const status = document.querySelector('#form-status');
  const submit = form.querySelector('[type=submit]');
  for (const link of document.querySelectorAll('[data-interest]')) {
    link.addEventListener('click', () => {
      form.elements.interest.value = link.dataset.interest;
      validate(form.elements.interest);
      form.elements.name.focus({ preventScroll: true });
    });
  }
  const messages = { name: 'Ingresá tu nombre y apellido.', email: 'Ingresá un email válido.', interest: 'Seleccioná qué te interesa.' };
  function validate(field) {
    const invalid = !field.value.trim() || !field.validity.valid;
    field.setAttribute('aria-invalid', String(invalid));
    document.querySelector(`#${field.id}-error`).textContent = invalid ? messages[field.name] : '';
    return !invalid;
  }
  const fields = ['name', 'email', 'interest'].map(name => form.elements[name]);
  for (const field of fields) {
    field.addEventListener('blur', () => { if (field.value || field.hasAttribute('aria-invalid')) validate(field); });
    field.addEventListener('input', () => { if (field.getAttribute('aria-invalid') === 'true') validate(field); });
  }
  form.noValidate = true;
  form.addEventListener('submit', event => {
    const invalid = fields.filter(field => !validate(field));
    if (invalid.length) {
      event.preventDefault();
      status.textContent = 'Revisá los campos indicados.';
      invalid[0].focus();
      return;
    }
    status.textContent = 'Abriendo la verificación de seguridad…';
  });

  const strip = document.querySelector('#community-strip');
  if (strip) {
    const gallery = strip.closest('.community-gallery');
    const controls = gallery.querySelector('.community-gallery-buttons');
    const previous = controls.querySelector('[data-gallery="prev"]');
    const next = controls.querySelector('[data-gallery="next"]');
    const progress = gallery.querySelector('.community-progress span');
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const step = () => strip.children[0].getBoundingClientRect().width + parseFloat(getComputedStyle(strip).gap);
    const update = () => {
      const max = strip.scrollWidth - strip.clientWidth;
      previous.disabled = strip.scrollLeft <= 1;
      next.disabled = strip.scrollLeft >= max - 1;
      const visible = Math.min(1, strip.clientWidth / strip.scrollWidth);
      progress.style.width = `${visible * 100}%`;
      progress.style.marginLeft = `${max > 0 ? (strip.scrollLeft / max) * (1 - visible) * 100 : 0}%`;
    };
    const go = direction => strip.scrollBy({left: direction * step(), behavior: motion.matches ? 'instant' : 'smooth'});
    previous.addEventListener('click', () => go(-1));
    next.addEventListener('click', () => go(1));
    strip.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {event.preventDefault();go(event.key === 'ArrowLeft' ? -1 : 1);}
      if (event.key === 'Home' || event.key === 'End') {event.preventDefault();strip.scrollTo({left:event.key === 'Home' ? 0 : strip.scrollWidth,behavior:motion.matches ? 'instant' : 'smooth'});}
    });
    let drag = null;
    strip.addEventListener('pointerdown', event => {
      if (event.pointerType !== 'mouse' || event.button !== 0) return;
      drag = {x:event.clientX, left:strip.scrollLeft};
      strip.setPointerCapture(event.pointerId);strip.classList.add('is-dragging');
    });
    strip.addEventListener('pointermove', event => {if(drag)strip.scrollLeft=drag.left-(event.clientX-drag.x);});
    const endDrag = () => {
      if (!drag) return;
      drag=null;strip.classList.remove('is-dragging');
      strip.scrollTo({left:Math.round(strip.scrollLeft/step())*step(),behavior:motion.matches ? 'instant' : 'smooth'});
    };
    strip.addEventListener('pointerup', endDrag);strip.addEventListener('pointercancel', endDrag);strip.addEventListener('lostpointercapture', endDrag);
    strip.addEventListener('scroll', update, {passive:true});
    new ResizeObserver(update).observe(strip);
    controls.hidden=false;update();
  }
})();
