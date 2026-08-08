/**
 * Google Analytics 4 — Measurement ID: G-ZV0TH2QD66
 */
(function () {
  'use strict';

  var GA_MEASUREMENT_ID = 'G-ZV0TH2QD66';

  // Load gtag.js
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_MEASUREMENT_ID);
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);
})();
