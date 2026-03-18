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
