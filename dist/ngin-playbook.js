/* NGIN Alliance Playbook — Custom Scripts */
/* Auto-built: 2026-03-18T18:44:24.421Z */

/* === init.js === */
/* ============================================
   NGIN Alliance Playbook — Initialization
   ============================================ */

(function () {
  'use strict';

  // Load Material Symbols font directly into head (more reliable than CSS @import)
  var MATERIAL_FONT_URL = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap';
  if (!document.querySelector('link[href*="Material+Symbols"]')) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = MATERIAL_FONT_URL;
    document.head.appendChild(link);
  }

  function isEditing() {
    return document.body.classList.contains('sqs-is-page-editing') ||
           document.body.classList.contains('sqs-edit-mode-active') ||
           document.documentElement.classList.contains('squarespace-damask');
  }

  function initNGIN(root) {
    if (isEditing()) return;

    // Smart button icons
    if (window.NGIN && window.NGIN.addButtonIcons) {
      window.NGIN.addButtonIcons(root);
    }

    // Inline link arrows
    if (window.NGIN && window.NGIN.addLinkArrows) {
      window.NGIN.addLinkArrows(root);
    }

    // Section label icons
    if (window.NGIN && window.NGIN.addLabelIcons) {
      window.NGIN.addLabelIcons(root);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    initNGIN(document);
  });

  // Expose for future module use
  window.NGIN = window.NGIN || {};
  window.NGIN.init = initNGIN;
  window.NGIN.isEditing = isEditing;
})();


/* === components.js === */
/* ============================================
   NGIN Alliance Playbook — Components
   ============================================ */

/* --- Smart Button Icons ---
   Reads button text and injects a matching
   Material Symbols icon AFTER the label.
   -------------------------------------------- */

(function () {
  'use strict';

  // All icons are placed AFTER the button text
  var ICON_RULES = [
    { pattern: /explore/i,           icon: 'explore' },
    { pattern: /get started/i,       icon: 'arrow_forward' },
    { pattern: /learn more/i,        icon: 'arrow_forward' },
    { pattern: /read more/i,         icon: 'arrow_forward' },
    { pattern: /view (all|more)/i,   icon: 'arrow_forward' },
    { pattern: /see (all|more)/i,    icon: 'arrow_forward' },
    { pattern: /continue/i,          icon: 'arrow_forward' },
    { pattern: /next/i,              icon: 'arrow_forward' },
    { pattern: /go to/i,             icon: 'arrow_forward' },
    { pattern: /visit/i,             icon: 'open_in_new' },
    { pattern: /browse/i,            icon: 'menu_book' },
    { pattern: /resource/i,          icon: 'library_books' },
    { pattern: /download/i,          icon: 'download' },
    { pattern: /pdf/i,               icon: 'picture_as_pdf' },
    { pattern: /print/i,             icon: 'print' },
    { pattern: /search/i,            icon: 'search' },
    { pattern: /filter/i,            icon: 'filter_list' },
    { pattern: /contact/i,           icon: 'mail' },
    { pattern: /email/i,             icon: 'mail' },
    { pattern: /call($|\s)/i,        icon: 'phone' },
    { pattern: /phone/i,             icon: 'phone' },
    { pattern: /sign up/i,           icon: 'person_add' },
    { pattern: /register/i,          icon: 'person_add' },
    { pattern: /subscribe/i,         icon: 'notifications' },
    { pattern: /join/i,              icon: 'group_add' },
    { pattern: /share/i,             icon: 'share' },
    { pattern: /save/i,              icon: 'bookmark' },
    { pattern: /bookmark/i,          icon: 'bookmark' },
    { pattern: /play/i,              icon: 'play_arrow' },
    { pattern: /watch/i,             icon: 'play_circle' },
    { pattern: /listen/i,            icon: 'headphones' },
    { pattern: /schedule/i,          icon: 'calendar_today' },
    { pattern: /book/i,              icon: 'calendar_today' },
    { pattern: /map/i,               icon: 'map' },
    { pattern: /location/i,          icon: 'location_on' },
    { pattern: /direction/i,         icon: 'directions' },
    { pattern: /home/i,              icon: 'home' },
    { pattern: /back/i,              icon: 'arrow_back' },
    { pattern: /submit/i,            icon: 'send' },
    { pattern: /send/i,              icon: 'send' },
    { pattern: /apply/i,             icon: 'edit_note' },
    { pattern: /donate/i,            icon: 'volunteer_activism' },
    { pattern: /support/i,           icon: 'favorite' },
    { pattern: /toolkit/i,           icon: 'handyman' },
    { pattern: /tool/i,              icon: 'build' },
    { pattern: /guide/i,             icon: 'menu_book' },
    { pattern: /playbook/i,          icon: 'auto_stories' },
    { pattern: /case stud/i,         icon: 'cases' },
    { pattern: /cit(y|ies)/i,        icon: 'location_city' },
    { pattern: /communit/i,          icon: 'groups' },
    { pattern: /partner/i,           icon: 'handshake' },
    { pattern: /alliance/i,          icon: 'hub' },
    { pattern: /framework/i,         icon: 'account_tree' },
    { pattern: /insight/i,           icon: 'lightbulb' },
    { pattern: /about/i,             icon: 'info' },
    { pattern: /faq/i,               icon: 'help' },
    { pattern: /help/i,              icon: 'help' },
    { pattern: /login|log in/i,      icon: 'login' },
    { pattern: /sign in/i,           icon: 'login' },
    { pattern: /upload/i,            icon: 'upload' },
    { pattern: /link/i,              icon: 'link' },
    { pattern: /chart/i,             icon: 'bar_chart' },
    { pattern: /data/i,              icon: 'analytics' },
    { pattern: /report/i,            icon: 'assessment' },
    { pattern: /event/i,             icon: 'event' },
    { pattern: /news/i,              icon: 'newspaper' },
    { pattern: /blog/i,              icon: 'article' },
    { pattern: /story|stories/i,     icon: 'auto_stories' },
    { pattern: /photo/i,             icon: 'photo_library' },
    { pattern: /gallery/i,           icon: 'collections' },
    { pattern: /video/i,             icon: 'videocam' },
    { pattern: /start/i,             icon: 'rocket_launch' },
  ];

  function getButtonText(btn) {
    var clone = btn.cloneNode(true);
    var icons = clone.querySelectorAll('.ngin-icon');
    for (var i = 0; i < icons.length; i++) {
      icons[i].remove();
    }
    return (clone.textContent || '').trim();
  }

  function matchIcon(text) {
    for (var i = 0; i < ICON_RULES.length; i++) {
      if (ICON_RULES[i].pattern.test(text)) {
        return ICON_RULES[i].icon;
      }
    }
    return null;
  }

  function injectIcon(btn) {
    if (btn.dataset.nginIcon === 'done') return;
    btn.dataset.nginIcon = 'done';

    var text = getButtonText(btn);
    if (!text) return;

    var icon = matchIcon(text);
    if (!icon) icon = 'arrow_forward'; // default fallback for unmatched buttons

    var span = document.createElement('span');
    span.className = 'ngin-icon';
    span.setAttribute('aria-hidden', 'true');
    span.textContent = icon;
    btn.appendChild(span);
  }

  function addButtonIcons(root) {
    // Standard Squarespace button blocks
    root.querySelectorAll('[data-sqsp-button]').forEach(injectIcon);

    // Auto-layout list-item buttons (e.g. "Start Where You Are" cards)
    root.querySelectorAll('.list-item-content__button').forEach(injectIcon);
  }

  /* --- Inline Link Arrows ---
     Adds north-east arrow to links inside paragraphs
     and text block content areas.
     ------------------------------------------------ */

  function addLinkArrows(root) {
    // Target links inside text block content and paragraph elements
    var selectors = [
      '[data-sqsp-text-block-content] a',
      '.sqs-block-content p a',
      '.sqs-block-html p a'
    ];

    var links = root.querySelectorAll(selectors.join(', '));

    links.forEach(function (link) {
      if (link.dataset.nginArrow === 'done') return;
      // Skip if this link is actually a button block
      if (link.closest('[data-sqsp-block="button"]')) return;
      // Skip nav, header, footer links
      if (link.closest('header, footer, nav, #header, #footer')) return;
      // Skip links that are just images
      if (!link.textContent.trim()) return;

      link.dataset.nginArrow = 'done';
      link.classList.add('ngin-inline-link');

      var arrow = document.createElement('span');
      arrow.className = 'ngin-link-arrow';
      arrow.setAttribute('aria-hidden', 'true');
      arrow.textContent = 'north_east';
      link.appendChild(arrow);
    });
  }

  /* --- Section Label Icons ---
     Adds Material icons to the left of category labels
     in the "What's Inside" section.
     ------------------------------------------------ */

  var LABEL_ICONS = {
    'core insights':      'lightbulb',
    'resource bank':      'menu_book',
    'case studies':       'cases',
    'about the alliance': 'hub'
  };

  function addLabelIcons(root) {
    var section = root.querySelector
      ? root.querySelector('section[data-section-id="69badcb87603e07234d02a29"]')
      : null;
    if (!section) return;

    var strongs = section.querySelectorAll('[data-sqsp-block="text"] p:first-child strong');
    strongs.forEach(function (el) {
      if (el.dataset.nginLabelIcon === 'done') return;
      el.dataset.nginLabelIcon = 'done';

      var text = el.textContent.trim().toLowerCase();
      var icon = LABEL_ICONS[text];
      if (!icon) return;

      var span = document.createElement('span');
      span.className = 'ngin-label-icon';
      span.setAttribute('aria-hidden', 'true');
      span.textContent = icon;
      el.insertBefore(span, el.firstChild);
    });
  }

  // Register with NGIN init system
  window.NGIN = window.NGIN || {};
  window.NGIN.addButtonIcons = addButtonIcons;
  window.NGIN.addLinkArrows = addLinkArrows;
  window.NGIN.addLabelIcons = addLabelIcons;
})();


