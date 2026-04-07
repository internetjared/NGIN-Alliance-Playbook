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

    // Case study back navigation
    if (window.NGIN && window.NGIN.addCaseStudyBackNav) {
      window.NGIN.addCaseStudyBackNav();
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
