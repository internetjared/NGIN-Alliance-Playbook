/* NGIN Alliance Playbook — Custom Scripts */
/* Auto-built: 2026-03-18T20:18:36.515Z */

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

    // Case study meta pills
    if (window.NGIN && window.NGIN.addCaseStudyPills) {
      window.NGIN.addCaseStudyPills(root);
    }

    // Resource bank search + filter
    if (window.NGIN && window.NGIN.initResourceFilter) {
      window.NGIN.initResourceFilter(root);
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
    { pattern: /view case stud/i,     icon: 'north_east' },
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

  /* --- Case Study Meta Pills ---
     Converts italic text in the case study info strip
     into colored pill badges per category.
     ------------------------------------------------ */

  var PILL_COLORS = {
    'organizations':           'navy',
    'building blocks featured': 'green',
    'related tools':           'gray'
  };

  function addCaseStudyPills(root) {
    var section = root.querySelector
      ? root.querySelector('section[data-section-id="69baf822077df3202166c679"]')
      : null;
    if (!section) return;

    var blocks = section.querySelectorAll('[data-sqsp-block="text"]');
    blocks.forEach(function (block) {
      if (block.dataset.nginPills === 'done') return;

      var strong = block.querySelector('strong');
      if (!strong) return;
      var heading = strong.textContent.trim().toLowerCase();
      var colorKey = PILL_COLORS[heading];
      if (!colorKey) return;

      block.dataset.nginPills = 'done';

      // Find the paragraph containing the italic items
      var emParagraphs = block.querySelectorAll('p');
      emParagraphs.forEach(function (p) {
        var ems = p.querySelectorAll('em');
        if (!ems.length) return;

        // Build pill container
        var container = document.createElement('div');
        container.className = 'ngin-pill-container';

        ems.forEach(function (em) {
          var pill = document.createElement('span');
          pill.className = 'ngin-pill ngin-pill--' + colorKey;
          pill.textContent = em.textContent.trim();
          container.appendChild(pill);
        });

        // Replace the paragraph with the pill container
        p.parentNode.replaceChild(container, p);
      });
    });
  }

  /* --- Resource Bank Search + Filter ---
     Injects a search bar and category pill buttons into the
     blog collection section on /resource-bank. Reads categories
     from blog items and filters in real-time.
     ------------------------------------------------ */

  function initResourceFilter(root) {
    // Only run on the resource bank blog page
    if (!document.body.className.match(/collection-type-blog/)) return;
    if (window.location.pathname.indexOf('/resource-bank') !== 0) return;
    // Don't run on individual post pages
    if (document.body.classList.contains('view-item')) return;

    var blogGrid = root.querySelector('.blog-basic-grid.collection-content-wrapper');
    if (!blogGrid) return;
    if (blogGrid.dataset.nginFilter === 'done') return;
    blogGrid.dataset.nginFilter = 'done';

    var items = blogGrid.querySelectorAll('.blog-item');
    if (!items.length) return;

    // Extract all unique categories from the blog items
    var allCats = new Set();
    items.forEach(function(item) {
      var cats = item.querySelectorAll('.blog-categories');
      cats.forEach(function(c) {
        var t = c.textContent.trim();
        if (t) allCats.add(t);
      });
    });
    var categories = Array.from(allCats).sort();

    // Build the filter UI
    var filterBar = document.createElement('div');
    filterBar.className = 'ngin-filter';
    filterBar.innerHTML =
      '<div class="ngin-filter__search-wrap">' +
        '<span class="ngin-filter__search-icon">search</span>' +
        '<input type="text" class="ngin-filter__search" placeholder="Search tools...">' +
      '</div>' +
      '<div class="ngin-filter__pills"></div>';

    var pillContainer = filterBar.querySelector('.ngin-filter__pills');
    var searchInput = filterBar.querySelector('.ngin-filter__search');

    // "All" button
    var allBtn = document.createElement('button');
    allBtn.className = 'ngin-filter__pill ngin-filter__pill--active';
    allBtn.textContent = 'All';
    allBtn.dataset.cat = '';
    pillContainer.appendChild(allBtn);

    // Category buttons
    categories.forEach(function(cat) {
      var btn = document.createElement('button');
      btn.className = 'ngin-filter__pill';
      btn.textContent = cat;
      btn.dataset.cat = cat.toLowerCase();
      pillContainer.appendChild(btn);
    });

    // Insert before the blog grid
    blogGrid.parentNode.insertBefore(filterBar, blogGrid);

    // Sort items alphabetically by title
    var itemsArr = Array.from(items);
    itemsArr.sort(function(a, b) {
      var tA = (a.querySelector('h1 a, h2 a, .blog-title a') || {}).textContent || '';
      var tB = (b.querySelector('h1 a, h2 a, .blog-title a') || {}).textContent || '';
      return tA.trim().localeCompare(tB.trim());
    });
    itemsArr.forEach(function(item) {
      blogGrid.appendChild(item);
    });

    // Filter logic
    var activeCat = '';

    function filterItems() {
      var query = searchInput.value.toLowerCase().trim();

      itemsArr.forEach(function(item) {
        var title = (item.querySelector('h1, h2, .blog-title') || {}).textContent || '';
        var excerpt = (item.querySelector('.blog-excerpt, .blog-basic-grid--text p:not(.blog-meta-section *)') || {}).textContent || '';
        var text = (title + ' ' + excerpt).toLowerCase();

        // Category match
        var catMatch = true;
        if (activeCat) {
          var itemCats = item.querySelectorAll('.blog-categories');
          catMatch = false;
          itemCats.forEach(function(c) {
            if (c.textContent.trim().toLowerCase() === activeCat) catMatch = true;
          });
        }

        // Search match
        var searchMatch = !query || text.indexOf(query) !== -1;

        item.style.display = (catMatch && searchMatch) ? '' : 'none';
      });
    }

    // Pill click handler
    pillContainer.addEventListener('click', function(e) {
      var btn = e.target.closest('.ngin-filter__pill');
      if (!btn) return;
      pillContainer.querySelectorAll('.ngin-filter__pill').forEach(function(b) {
        b.classList.remove('ngin-filter__pill--active');
      });
      btn.classList.add('ngin-filter__pill--active');
      activeCat = btn.dataset.cat;
      filterItems();
    });

    // Search input handler
    searchInput.addEventListener('input', filterItems);
  }

  // Register with NGIN init system
  window.NGIN = window.NGIN || {};
  window.NGIN.addButtonIcons = addButtonIcons;
  window.NGIN.addLinkArrows = addLinkArrows;
  window.NGIN.addLabelIcons = addLabelIcons;
  window.NGIN.addCaseStudyPills = addCaseStudyPills;
  window.NGIN.initResourceFilter = initResourceFilter;
})();


