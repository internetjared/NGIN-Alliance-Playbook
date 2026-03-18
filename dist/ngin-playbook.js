/* NGIN Alliance Playbook — Custom Scripts */
/* Auto-built: 2026-03-18T17:27:01.102Z */

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
   Material Symbols icon before or after the label.
   -------------------------------------------- */

(function () {
  'use strict';

  // Icon placed AFTER text (trailing arrows / directional)
  var AFTER_RULES = [
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
  ];

  // Icon placed BEFORE text (leading icons)
  var BEFORE_RULES = [
    { pattern: /browse/i,            icon: 'menu_book' },
    { pattern: /resource/i,          icon: 'library_books' },
    { pattern: /download/i,          icon: 'download' },
    { pattern: /pdf/i,               icon: 'picture_as_pdf' },
    { pattern: /print/i,             icon: 'print' },
    { pattern: /search/i,            icon: 'search' },
    { pattern: /filter/i,            icon: 'filter_list' },
    { pattern: /contact/i,           icon: 'mail' },
    { pattern: /email/i,             icon: 'mail' },
    { pattern: /call/i,              icon: 'phone' },
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
    // Get visible text, ignoring any icons we already injected
    var clone = btn.cloneNode(true);
    var icons = clone.querySelectorAll('.ngin-icon, .ngin-icon-after');
    for (var i = 0; i < icons.length; i++) {
      icons[i].remove();
    }
    return (clone.textContent || '').trim();
  }

  function matchIcon(text, rules) {
    for (var i = 0; i < rules.length; i++) {
      if (rules[i].pattern.test(text)) {
        return rules[i].icon;
      }
    }
    return null;
  }

  function addButtonIcons(root) {
    var buttons = root.querySelectorAll('[data-sqsp-button]');

    buttons.forEach(function (btn) {
      if (btn.dataset.nginIcon === 'done') return;
      btn.dataset.nginIcon = 'done';

      var text = getButtonText(btn);
      if (!text) return;

      // Check trailing icon first (directional CTAs)
      var afterIcon = matchIcon(text, AFTER_RULES);
      if (afterIcon) {
        var after = document.createElement('span');
        after.className = 'ngin-icon-after';
        after.setAttribute('aria-hidden', 'true');
        after.textContent = afterIcon;
        btn.appendChild(after);
        return;
      }

      // Then check leading icon
      var beforeIcon = matchIcon(text, BEFORE_RULES);
      if (beforeIcon) {
        var before = document.createElement('span');
        before.className = 'ngin-icon';
        before.setAttribute('aria-hidden', 'true');
        before.textContent = beforeIcon;
        btn.insertBefore(before, btn.firstChild);
      }
    });
  }

  // Register with NGIN init system
  window.NGIN = window.NGIN || {};
  window.NGIN.addButtonIcons = addButtonIcons;
})();


