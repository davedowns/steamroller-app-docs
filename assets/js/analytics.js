// Google Tag Manager container ID.
var GTM_ID = 'GTM-NT5SZKT2';

var CONSENT_KEY = 'analytics_consent';

window.dataLayer = window.dataLayer || [];

function loadAnalytics() {
  if (window.gaLoaded) return;
  window.gaLoaded = true;
  dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM_ID;
  document.head.appendChild(s);
}

function getConsent() {
  try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
}

function setConsent(value) {
  try { localStorage.setItem(CONSENT_KEY, value); } catch (e) {}
  var banner = document.getElementById('cookie-banner');
  if (banner) banner.remove();
  if (value === 'granted') {
    loadAnalytics();
  } else if (window.gaLoaded) {
    // Already loaded this page view: stop sending install events and drop GA cookies.
    document.cookie.split(';').forEach(function (c) {
      var name = c.split('=')[0].trim();
      if (name === '_ga' || name.indexOf('_ga_') === 0) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
      }
    });
  }
}

function showBanner() {
  if (document.getElementById('cookie-banner')) return;
  var banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', 'Cookie consent');
  banner.innerHTML =
    '<p class="mb-0">We use Google Analytics cookies to understand how this website is used, ' +
    'including clicks on the app download buttons. Analytics only runs if you accept. ' +
    '<a href="/privacy/#website-analytics">Learn more</a></p>' +
    '<div class="cookie-banner-actions">' +
    '<button type="button" class="btn btn-outline-light btn-sm" data-consent="denied">Decline</button>' +
    '<button type="button" class="btn btn-warning btn-sm fw-semibold" data-consent="granted">Accept</button>' +
    '</div>';
  document.body.appendChild(banner);
}

document.addEventListener('DOMContentLoaded', function () {
  var consent = getConsent();
  if (consent === 'granted') loadAnalytics();
  else if (consent !== 'denied') showBanner();
});

// Record clicks on any element with data-install-store (the install calls to action).
document.addEventListener('click', function (e) {
  var choice = e.target.closest('[data-consent]');
  if (choice) {
    setConsent(choice.dataset.consent);
    return;
  }
  if (e.target.closest('[data-cookie-settings]')) {
    e.preventDefault();
    showBanner();
    return;
  }
  var link = e.target.closest('[data-install-store]');
  if (!link || !window.gaLoaded || getConsent() !== 'granted') return;
  dataLayer.push({
    event: 'install_click',
    store: link.dataset.installStore,
    location: link.dataset.installLocation || 'unknown'
  });
});
