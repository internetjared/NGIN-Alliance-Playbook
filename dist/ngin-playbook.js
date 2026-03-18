/* NGIN Alliance Playbook — Custom Scripts */
/* Auto-built: 2026-03-18T17:07:16.784Z */

/* === init.js === */
/* ============================================
   NGIN Alliance Playbook — Initialization
   ============================================ */

(function () {
  'use strict';

  function isEditing() {
    return document.body.classList.contains('sqs-is-page-editing') ||
           document.body.classList.contains('sqs-edit-mode-active') ||
           document.documentElement.classList.contains('squarespace-damask');
  }

  function initNGIN(root) {
    if (isEditing()) return;
    // Component initializers will be called here
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

/* --- Component scripts will be added here as we build modules --- */


