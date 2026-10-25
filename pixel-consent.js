(function () {
  const consentKey = 'jasno-meta-pixel-consent-v1';
  let consent = null;
  try { consent = localStorage.getItem(consentKey); } catch (_) {}

  function startPixel() {
    if (window.fbq) return;
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', '1454683456756709');
    window.fbq('track', 'PageView');
  }

  const banner = document.createElement('section');
  banner.className = 'pixel-consent';
  banner.setAttribute('role', 'region');
  banner.setAttribute('aria-label', 'Ustawienia prywatności');
  banner.hidden = Boolean(consent);
  banner.innerHTML = '<div class="pixel-consent-copy"><strong>Ustawienia prywatności</strong><p>Za Twoją zgodą użyjemy Meta Pixel do pomiaru skuteczności reklam. Pixel może odczytywać lub zapisywać pliki cookie i przekazywać Meta informacje o wizycie. <a href="polityka-prywatnosci.html">Szczegóły w polityce prywatności</a>.</p></div><div class="pixel-consent-actions"><button type="button" data-pixel-choice="reject">Odrzucam</button><button type="button" data-pixel-choice="accept">Zgadzam się</button></div>';
  document.body.appendChild(banner);

  const settings = document.createElement('button');
  settings.type = 'button';
  settings.className = 'pixel-consent-settings';
  settings.textContent = 'Ustawienia cookies';
  settings.setAttribute('aria-label', 'Zmień ustawienia cookies');
  settings.hidden = !consent;
  settings.addEventListener('click', function () { banner.hidden = false; });
  document.body.appendChild(settings);

  banner.addEventListener('click', function (event) {
    const choice = event.target.closest('[data-pixel-choice]');
    if (!choice) return;
    consent = choice.dataset.pixelChoice === 'accept' ? 'accepted' : 'rejected';
    try { localStorage.setItem(consentKey, consent); } catch (_) {}
    banner.hidden = true;
    settings.hidden = false;
    if (consent === 'accepted') startPixel();
    else if (window.fbq) window.fbq('consent', 'revoke');
  });

  if (consent === 'accepted') startPixel();
})();
