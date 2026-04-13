/* NGIN Alliance Playbook — Custom Scripts */
/* Auto-built: 2026-04-13T21:17:15.183Z */

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

    // Inject critical hide CSS directly (cannot rely on external stylesheet timing)
    if (!document.getElementById('ngin-filter-css')) {
      var style = document.createElement('style');
      style.id = 'ngin-filter-css';
      style.textContent = '.ngin-hidden { display: none !important; visibility: hidden !important; height: 0 !important; overflow: hidden !important; margin: 0 !important; padding: 0 !important; border: 0 !important; }';
      document.head.appendChild(style);
    }

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

    // Insert inside the blog grid, before the first blog item
    var firstItem = blogGrid.querySelector('.blog-item');
    if (firstItem) {
      blogGrid.insertBefore(filterBar, firstItem);
    } else {
      blogGrid.appendChild(filterBar);
    }

    // Process each card: extract tool number, build footer, style
    var itemsArr = Array.from(items);
    itemsArr.forEach(function(item) {
      if (item.dataset.nginCardDone === 'true') return;
      item.dataset.nginCardDone = 'true';

      var textWrap = item.querySelector('.blog-basic-grid--text');
      if (!textWrap) return;

      // Extract tool number from bold text in excerpt
      var boldEl = textWrap.querySelector('p strong');
      var toolNum = '';
      var toolSortNum = 999;
      if (boldEl) {
        toolNum = boldEl.textContent.trim();
        var numMatch = toolNum.match(/\d+/);
        if (numMatch) toolSortNum = parseInt(numMatch[0], 10);
      }
      item.dataset.nginToolSort = toolSortNum;

      // Inject tool number label above title
      if (toolNum) {
        var titleEl = textWrap.querySelector('.blog-title, h1, h2');
        if (titleEl) {
          var label = document.createElement('div');
          label.className = 'ngin-tool-number';
          label.textContent = toolNum;
          titleEl.parentNode.insertBefore(label, titleEl);
        }
      }

      // Build card footer with categories + view tool link
      var catLinks = item.querySelectorAll('.blog-meta-primary .blog-categories');
      var postLink = item.querySelector('h1 a, h2 a, .blog-title a');
      var href = postLink ? postLink.getAttribute('href') : '#';

      var footer = document.createElement('div');
      footer.className = 'ngin-card-footer';

      var catsDiv = document.createElement('div');
      catsDiv.className = 'ngin-card-footer__cats';
      var catTexts = [];
      catLinks.forEach(function(c) {
        var t = c.textContent.trim();
        if (t && catTexts.indexOf(t) === -1) catTexts.push(t);
      });
      catsDiv.textContent = catTexts.join(', ');

      var viewLink = document.createElement('a');
      viewLink.className = 'ngin-card-footer__link';
      viewLink.href = href;
      viewLink.innerHTML = 'View Tool <span class="ngin-card-footer__arrow">→</span>';

      footer.appendChild(catsDiv);
      footer.appendChild(viewLink);
      item.appendChild(footer);
    });

    // Sort by tool number
    itemsArr.sort(function(a, b) {
      return (parseInt(a.dataset.nginToolSort) || 999) - (parseInt(b.dataset.nginToolSort) || 999);
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

        // Category match — check footer cats (has all categories) and native blog-categories
        var catMatch = true;
        if (activeCat) {
          catMatch = false;
          // Check our custom footer first (has complete category list)
          var footerCats = item.querySelector('.ngin-card-footer__cats');
          if (footerCats) {
            var catText = footerCats.textContent.toLowerCase();
            // Split by comma and check each individual category
            var cats = catText.split(',').map(function(s) { return s.trim(); });
            cats.forEach(function(c) {
              if (c === activeCat) catMatch = true;
            });
          }
          // Fallback: check native blog-categories
          if (!catMatch) {
            var nativeCats = item.querySelectorAll('.blog-categories');
            nativeCats.forEach(function(c) {
              if (c.textContent.trim().toLowerCase().indexOf(activeCat) !== -1) catMatch = true;
            });
          }
        }

        // Search match
        var searchMatch = !query || text.indexOf(query) !== -1;

        if (catMatch && searchMatch) {
          item.classList.remove('ngin-hidden');
          item.style.removeProperty('display');
        } else {
          item.classList.add('ngin-hidden');
        }
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

  /* --- Case Study Back Navigation ---
     Detects /case-studies/* pages and injects a
     "Back to Case Studies" link at top and bottom.
     ------------------------------------------------ */

  function addCaseStudyBackNav() {
    // Detect case study pages by the presence of the pills section
    var pillsSection = document.querySelector('section[data-section-id="69baf822077df3202166c679"]');
    if (!pillsSection) return;
    if (document.querySelector('.ngin-back-nav')) return;

    var CASE_STUDIES_URL = '/case-studies';
    var LABEL = 'Back to All Case Studies';

    // Bottom nav only — hero already has an "All Case Studies" button for immediate back
    var bottomNav = document.createElement('div');
    bottomNav.className = 'ngin-back-nav ngin-back-nav--bottom';
    bottomNav.innerHTML =
      '<a href="' + CASE_STUDIES_URL + '" class="ngin-back-nav__btn">' +
        '<span class="ngin-back-nav__icon" aria-hidden="true">arrow_back</span>' +
        LABEL +
      '</a>';

    var allSections = document.querySelectorAll('#page .page-section, main .page-section');
    var lastSection = allSections[allSections.length - 1];
    if (lastSection && lastSection.parentNode) {
      lastSection.parentNode.insertBefore(bottomNav, lastSection.nextSibling);
    }
  }

  /* --- Cross-Site Context Bar ---
     Shows a dismissible top bar linking between the
     Playbook microsite and the main NGIN site.
     Mode auto-detected by hostname, overridable via
     window.NGIN_CROSSLINK_CONFIG = { mode: 'playbook' | 'main', ... }
     ------------------------------------------------ */

  function initCrossSiteLink() {
    if (document.querySelector('.ngin-crosslink, .ngin-crosslink-chip')) return;

    var defaults = {
      mainHosts: ['newgrowth.org', 'www.newgrowth.org'],
      mainUrl: 'https://newgrowth.org/',
      mainName: 'New Growth Innovation Network',
      mainLogoUrl: 'https://static1.squarespace.com/static/69bac4ee1264074d6b59d99f/t/69d521f64f84837aff7ec9d2/1775575542383/Untitled+design+-+2026-04-07T112437.104.png',
      playbookHosts: [],
      playbookUrl: '/',
      playbookName: 'The Alliance Playbook',
      playbookLogoUrl: 'https://static1.squarespace.com/static/69bac4ee1264074d6b59d99f/t/69d521f64f84837aff7ec9d2/1775575542383/Untitled+design+-+2026-04-07T112437.104.png',
      dismissDays: 30
    };

    var config = Object.assign({}, defaults, window.NGIN_CROSSLINK_CONFIG || {});

    // Determine mode: 'playbook' (we're on microsite, link to main) or 'main'
    var mode = (window.NGIN_CROSSLINK_CONFIG && window.NGIN_CROSSLINK_CONFIG.mode) || null;
    if (!mode) {
      var host = location.hostname.toLowerCase();
      mode = config.mainHosts.indexOf(host) !== -1 ? 'main' : 'playbook';
    }

    var target, targetName, targetLogo, barModClass, chipModClass, barLabel;
    if (mode === 'main') {
      // On main NGIN site → link to Playbook
      target = config.playbookUrl;
      targetName = config.playbookName;
      targetLogo = config.playbookLogoUrl;
      barModClass = 'ngin-crosslink--to-playbook';
      chipModClass = 'ngin-crosslink-chip--to-playbook';
      barLabel = '<span class="ngin-crosslink__label-full">New: explore </span><strong>' + targetName + '</strong>' +
                 '<span class="ngin-crosslink__label-full"> — a living field guide for coalitions.</span>';
    } else {
      // On Playbook microsite → link to main NGIN
      target = config.mainUrl;
      targetName = config.mainName;
      targetLogo = config.mainLogoUrl;
      barModClass = '';
      chipModClass = '';
      barLabel = '<span class="ngin-crosslink__label-full">You\u2019re viewing the Alliance Playbook, part of </span>' +
                 '<strong>' + targetName + '</strong>';
    }

    // Check dismissal
    var STORAGE_KEY = 'ngin-crosslink-dismissed-' + mode;
    var dismissed = false;
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var ts = parseInt(raw, 10);
        var ageMs = Date.now() - ts;
        var maxMs = config.dismissDays * 24 * 60 * 60 * 1000;
        if (!isNaN(ts) && ageMs < maxMs) dismissed = true;
      }
    } catch (e) { /* storage blocked — show bar */ }

    if (dismissed) {
      renderChip();
    } else {
      renderBar();
    }

    function renderBar() {
      var bar = document.createElement('aside');
      bar.className = 'ngin-crosslink ' + barModClass;
      bar.setAttribute('role', 'complementary');
      bar.setAttribute('aria-label', 'Related site');
      bar.innerHTML =
        '<div class="ngin-crosslink__inner">' +
          '<span class="ngin-crosslink__mark" aria-hidden="true">' +
            '<img src="' + targetLogo + '" alt="" />' +
          '</span>' +
          '<span class="ngin-crosslink__label">' + barLabel + '</span>' +
          '<a class="ngin-crosslink__cta" href="' + target + '">' +
            (mode === 'main' ? 'Open the Playbook' : 'Visit NGIN') +
            ' <span class="ngin-crosslink__cta-arrow" aria-hidden="true">\u2192</span>' +
          '</a>' +
          '<button type="button" class="ngin-crosslink__close" aria-label="Dismiss">\u00d7</button>' +
        '</div>';

      // Prepend to body so DOM order puts it first
      if (document.body.firstChild) {
        document.body.insertBefore(bar, document.body.firstChild);
      } else {
        document.body.appendChild(bar);
      }

      // Measure and expose height so CSS can offset body + sticky header
      var barRemoved = false;
      function applyHeight() {
        if (barRemoved) return;
        // Ensure bar is still in the DOM
        if (!bar.parentNode) { cleanupBar(); return; }
        var h = bar.offsetHeight;
        if (h > 0) {
          document.documentElement.style.setProperty('--ngin-crosslink-h', h + 'px');
          document.documentElement.classList.add('ngin-has-crosslink');
        }
      }

      function cleanupBar() {
        barRemoved = true;
        if (bar.parentNode) bar.parentNode.removeChild(bar);
        document.documentElement.classList.remove('ngin-has-crosslink');
        document.documentElement.style.removeProperty('--ngin-crosslink-h');
        window.removeEventListener('resize', applyHeight);
      }

      // Defer initial measurement to next frame so the bar has rendered
      requestAnimationFrame(function () {
        applyHeight();
      });

      // Re-measure after the logo image loads (it changes height)
      var logoImg = bar.querySelector('img');
      if (logoImg) {
        if (logoImg.complete) requestAnimationFrame(applyHeight);
        else logoImg.addEventListener('load', function () {
          requestAnimationFrame(applyHeight);
        });
      }
      window.addEventListener('resize', applyHeight);

      var closeBtn = bar.querySelector('.ngin-crosslink__close');
      closeBtn.addEventListener('click', function () {
        try { localStorage.setItem(STORAGE_KEY, String(Date.now())); } catch (e) {}
        bar.style.transition = 'opacity 220ms ease, transform 220ms ease';
        bar.style.opacity = '0';
        bar.style.transform = 'translateY(-100%)';
        setTimeout(function () {
          cleanupBar();
          renderChip();
        }, 240);
      });
    }

    function renderChip() {
      if (document.querySelector('.ngin-crosslink-chip')) return;
      var chip = document.createElement('a');
      chip.className = 'ngin-crosslink-chip ' + chipModClass;
      chip.href = target;
      chip.setAttribute('aria-label',
        (mode === 'main' ? 'Open the Alliance Playbook' : 'Visit New Growth Innovation Network'));
      chip.innerHTML =
        '<span class="ngin-crosslink-chip__mark" aria-hidden="true">' +
          '<img src="' + targetLogo + '" alt="" />' +
        '</span>' +
        (mode === 'main' ? 'Alliance Playbook' : 'NGIN.org') +
        ' <span aria-hidden="true">\u2192</span>';
      document.body.appendChild(chip);
    }
  }

  // Register with NGIN init system
  window.NGIN = window.NGIN || {};
  window.NGIN.addButtonIcons = addButtonIcons;
  window.NGIN.addLinkArrows = addLinkArrows;
  window.NGIN.addLabelIcons = addLabelIcons;
  window.NGIN.addCaseStudyPills = addCaseStudyPills;
  /* --- Make full resource card clickable ---
     Finds the first link inside each blog-item card and
     navigates on click anywhere on the card.
     ------------------------------------------------ */
  function makeResourceCardsClickable(root) {
    root = root || document;
    if (!document.body.className.match(/collection-type-blog/)) return;
    if (document.body.classList.contains('view-item')) return;

    root.querySelectorAll('.blog-item').forEach(function (card) {
      if (card.dataset.nginClickable === 'true') return;
      card.dataset.nginClickable = 'true';

      card.addEventListener('click', function (e) {
        // Don't hijack clicks on existing links or buttons
        if (e.target.closest('a, button')) return;

        // Target the post title link or View Tool button, NOT category links
        var link = card.querySelector('.blog-title a[href], h1.blog-title a[href], .ngin-card-footer__link[href], .blog-more-link[href]');
        if (!link) {
          // Fallback: find any link that points to a blog item (contains /resource-bank/)
          var allLinks = card.querySelectorAll('a[href]');
          for (var i = 0; i < allLinks.length; i++) {
            var href = allLinks[i].getAttribute('href') || '';
            if (href.indexOf('/resource-bank/') !== -1 && href.length > '/resource-bank/'.length + 1) {
              link = allLinks[i];
              break;
            }
          }
        }
        if (link) {
          window.location.href = link.href;
        }
      });
    });
  }
  window.NGIN.makeResourceCardsClickable = makeResourceCardsClickable;

  window.NGIN.initResourceFilter = initResourceFilter;
  window.NGIN.addCaseStudyBackNav = addCaseStudyBackNav;

  /* --- Resource Bank back breadcrumb ---
     Injects a "← Back to Resource Bank" link above the
     blog post title on resource-bank item pages.
     ------------------------------------------------ */
  function addResourceBackNav() {
    if (!document.body.className.match(/collection-type-blog/) ||
        !document.body.classList.contains('view-item')) return;
    if (document.querySelector('.ngin-resource-back')) return;

    // Insert above the blog post title, inside the blog content wrapper
    // so it inherits the same centering/max-width as the article content.
    var target = document.querySelector('.blog-item-top-wrapper') ||
                 document.querySelector('.blog-item-inner-wrapper') ||
                 document.querySelector('article');
    if (!target) return;

    var nav = document.createElement('div');
    nav.className = 'ngin-resource-back';
    nav.innerHTML =
      '<a href="/resource-bank" class="ngin-resource-back__link">' +
        '<span class="ngin-resource-back__icon" aria-hidden="true">arrow_back</span>' +
        'Back to Resource Bank' +
      '</a>';

    target.parentNode.insertBefore(nav, target);
  }
  window.NGIN.addResourceBackNav = addResourceBackNav;

  /* --- Resource Tool Hero Banner ---
     On resource-bank item pages, fetches the post's thumbnail
     (assetUrl) via Squarespace JSON and builds a full-width
     hero banner with the title centered on top — matching the
     case study page style.
     -------------------------------------------------------- */
  function addResourceHeroBanner() {
    if (!document.body.className.match(/collection-type-blog/) ||
        !document.body.classList.contains('view-item')) return;
    if (document.querySelector('.ngin-resource-hero')) return;

    var titleEl = document.querySelector('.blog-item-top-wrapper h1, h1.blog-title');
    if (!titleEl) return;
    var titleText = titleEl.textContent.trim();

    // Fetch the post JSON for the thumbnail image
    fetch(window.location.pathname + '?format=json')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var item = data.item || data;
        var imgUrl = item.assetUrl;
        if (!imgUrl) return;

        // Squarespace image service — request a decent size
        if (imgUrl.indexOf('?') === -1) {
          imgUrl += '?format=2500w';
        }

        // Extract tool number from the excerpt (bold prefix like "Tool 14")
        var toolLabel = '';
        var excerpt = (item.excerpt || '').replace(/<[^>]+>/g, ' ').trim();
        var toolMatch = excerpt.match(/^(Tool\s*\d+)/i);
        if (toolMatch) {
          toolLabel = toolMatch[1];
        }

        // Build the hero banner
        var hero = document.createElement('div');
        hero.className = 'ngin-resource-hero';
        hero.innerHTML =
          '<div class="ngin-resource-hero__bg">' +
            '<img src="' + imgUrl + '" alt="" loading="eager" />' +
          '</div>' +
          '<div class="ngin-resource-hero__overlay"></div>' +
          '<div class="ngin-resource-hero__content">' +
            (toolLabel
              ? '<span class="ngin-resource-hero__tool-pill">' + toolLabel + '</span>'
              : '') +
            '<h1 class="ngin-resource-hero__title">' + titleText + '</h1>' +
            '<a href="/resource-bank" class="ngin-resource-hero__back">' +
              '<span class="ngin-resource-hero__back-icon" aria-hidden="true">arrow_back</span>' +
              'Back to Resource Bank' +
            '</a>' +
          '</div>';

        // Insert directly after the header inside #siteWrapper
        // so the banner sits edge-to-edge, outside the blog content
        // wrappers that have section padding.
        var header = document.querySelector('#header');
        var siteWrapper = document.querySelector('#siteWrapper');
        if (header && header.nextSibling) {
          siteWrapper.insertBefore(hero, header.nextSibling);
        } else if (siteWrapper) {
          siteWrapper.appendChild(hero);
        }

        // Hide the original title and back breadcrumb (now in the banner)
        titleEl.style.display = 'none';
        var origBack = document.querySelector('.ngin-resource-back');
        if (origBack) origBack.style.display = 'none';

        // Hide the blog-item-top-wrapper since it just had the title
        var topWrapper = document.querySelector('.blog-item-top-wrapper');
        if (topWrapper) topWrapper.style.display = 'none';
      })
      .catch(function () {
        // Silently fail — page will show the default title layout
      });
  }
  window.NGIN.addResourceHeroBanner = addResourceHeroBanner;

  window.NGIN.initCrossSiteLink = initCrossSiteLink;

  /* --- Strip leading digits from Building Blocks h4 titles ---
     CSS counter renders the circle badge; the original "1 " / "2 "
     etc. in the heading text is no longer needed.
     -------------------------------------------------------------- */
  function stripBuildingBlockNumbers(root) {
    root = root || document;
    var block = root.querySelector('#block-yui_3_17_2_1_1775574232499_3834');
    if (!block) return;
    block.querySelectorAll('h4').forEach(function (h4) {
      if (h4.dataset.nginStripped === 'true') return;
      var original = h4.textContent;
      var cleaned = original.replace(/^\s*\d+\s*[.)\-:]?\s*/, '');
      if (cleaned !== original) {
        h4.textContent = cleaned;
      }
      h4.dataset.nginStripped = 'true';
    });
  }
  window.NGIN.stripBuildingBlockNumbers = stripBuildingBlockNumbers;

  /* --- Coalition Map navigation listener ---
     The map iframe posts { nginMapNavigate: "/slug" } when a
     case-study city is clicked. Navigate the parent page.
     -------------------------------------------------------- */
  window.addEventListener('message', function (e) {
    if (e.data && e.data.nginMapNavigate) {
      window.location.href = e.data.nginMapNavigate;
    }
  });
})();


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

    // Make full resource cards clickable
    if (window.NGIN && window.NGIN.makeResourceCardsClickable) {
      window.NGIN.makeResourceCardsClickable(root);
    }

    // Case study back navigation
    if (window.NGIN && window.NGIN.addCaseStudyBackNav) {
      window.NGIN.addCaseStudyBackNav();
    }

    // Resource bank back breadcrumb
    if (window.NGIN && window.NGIN.addResourceBackNav) {
      window.NGIN.addResourceBackNav();
    }

    // Resource bank tool page hero banner
    if (window.NGIN && window.NGIN.addResourceHeroBanner) {
      window.NGIN.addResourceHeroBanner();
    }

    // Cross-site context bar (Playbook ↔ main NGIN)
    if (window.NGIN && window.NGIN.initCrossSiteLink) {
      window.NGIN.initCrossSiteLink();
    }

    if (window.NGIN && window.NGIN.stripBuildingBlockNumbers) {
      window.NGIN.stripBuildingBlockNumbers(root);
    }
  }

  // Run init — handle both static script tags and dynamic loading
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initNGIN(document);
    });
  } else {
    // DOM already ready (script was loaded dynamically after DOMContentLoaded)
    initNGIN(document);
  }

  // Expose for future module use
  window.NGIN = window.NGIN || {};
  window.NGIN.init = initNGIN;
  window.NGIN.isEditing = isEditing;
})();


