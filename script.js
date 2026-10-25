(() => {
  'use strict';

  // Ссылка для всех кнопок «Więcej wiadomości» / «Czytaj więcej».
  // Параметры из адреса страницы (utm, fbclid и т. д.) добавятся к ней сами.
  const MORE_NEWS_URL = '#';

  // Суммы с 1 марта 2026 г. (брутто)
  const R = {
    year: 2026,
    minPension: 1978.49,     // trzynastka i pełna czternastka
    threshold14: 2900,       // próg pełnej czternastki
    min14: 50,               // poniżej 50 zł czternastka nie jest wypłacana
    careSupplement: 366.68,  // dodatek pielęgnacyjny (75+)
    honorary: 6938.92,       // świadczenie honorowe (100+)
    minYear: 1915,
    maxYear: 1966,
    minMoney: 100,
    maxMoney: 50000,
  };

  const nf = new Intl.NumberFormat('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const round2 = (v) => Math.round(v * 100) / 100;
  const money = (v) => nf.format(round2(v)) + ' zł';
  const $ = (sel) => document.querySelector(sel);

  /* ---------- Полоса прогресса и плашка внизу ---------- */
  const bar = $('#progress-bar');
  const sticky = $('#sticky-cta');
  const calcSection = $('#kalkulator');
  const endCta = $('.cta');
  let ticking = false;

  function onScroll() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    bar.style.transform = `scaleX(${p})`;

    const pastCalc = calcSection.getBoundingClientRect().bottom < window.innerHeight * 0.4;
    const endVisible = endCta.getBoundingClientRect().top < window.innerHeight;
    const show = pastCalc && !endVisible;
    if (sticky.classList.contains('show') !== show) {
      sticky.classList.toggle('show', show);
      sticky.setAttribute('aria-hidden', String(!show));
      sticky.tabIndex = show ? 0 : -1;
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onScroll);
    }
  }, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* ---------- Проверка рочника ---------- */
  const form = $('#calc');
  const yearEl = $('#year');
  const yearErr = $('#year-error');
  const pensionEl = $('#pension');
  const pensionErr = $('#pension-error');
  const rangeEl = $('#pension-range');
  const reveal = $('#reveal');
  const revealLabel = $('#reveal-label');
  const revealPlus = $('#reveal-plus');
  const sumOnceEl = $('#sum-once');
  const sumMonthlyEl = $('#sum-monthly');
  const resultsEl = $('#results');

  const ICON_YES = '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const ICON_NO = '<svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true"><path d="M6 12h12" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>';

  form.addEventListener('submit', (e) => e.preventDefault());

  function parseMoney(raw) {
    const clean = String(raw).replace(/[\s ]|zł/gi, '').replace(',', '.');
    if (!/^\d+(\.\d{1,2})?$/.test(clean)) return NaN;
    return parseFloat(clean);
  }

  function readYear() {
    const v = yearEl.value.trim();
    if (!/^\d{4}$/.test(v)) {
      return { ok: false, partial: /^\d{0,3}$/.test(v), msg: `Wpisz rok od ${R.minYear} do ${R.maxYear}.` };
    }
    const y = Number(v);
    if (y > R.maxYear) return { ok: false, msg: `Sprawdzamy roczniki ${R.maxYear} i starsze, czyli osoby w wieku emerytalnym.` };
    if (y < R.minYear) return { ok: false, msg: `Wpisz rok od ${R.minYear} do ${R.maxYear}.` };
    return { ok: true, value: y };
  }

  function readMoney(input) {
    const v = input.value.trim();
    if (v === '') return { ok: false, partial: true, msg: 'Wpisz kwotę emerytury brutto.' };
    const n = parseMoney(v);
    if (Number.isNaN(n)) return { ok: false, msg: 'Wpisz kwotę cyframi, np. 2500.' };
    if (n < R.minMoney || n > R.maxMoney) return { ok: false, partial: n < R.minMoney, msg: 'Wpisz kwotę od 100 do 50 000 zł.' };
    return { ok: true, value: n };
  }

  function showError(input, errEl, res, force) {
    const show = !res.ok && (force || !res.partial);
    errEl.textContent = show ? res.msg : '';
    if (show) input.setAttribute('aria-invalid', 'true');
    else input.removeAttribute('aria-invalid');
  }

  function compute(y, p) {
    const age = R.year - y;
    const rows = [];
    let once = R.minPension;
    let monthly = 0;

    rows.push({ name: '13. emerytura', value: money(R.minPension) });

    const c14 = round2(R.minPension - Math.max(0, p - R.threshold14));
    if (c14 >= R.min14) {
      rows.push({ name: '14. emerytura', value: money(c14) });
      once += c14;
    } else {
      rows.push({ name: '14. emerytura', value: 'przy emeryturze do 4828,49 zł', off: true });
    }

    if (age >= 75) {
      rows.push({ name: 'Dodatek pielęgnacyjny', value: money(R.careSupplement), per: true });
      monthly += R.careSupplement;
    } else {
      rows.push({ name: 'Dodatek pielęgnacyjny', value: `od ${y + 75} r.`, off: true });
    }

    if (age >= 100) {
      rows.push({ name: 'Świadczenie honorowe', value: money(R.honorary), per: true });
      monthly += R.honorary;
    } else {
      rows.push({ name: 'Świadczenie honorowe', value: 'po 100. urodzinach', off: true });
    }

    return { y, rows, once, monthly };
  }

  let lastKey = '';

  function render(res) {
    revealLabel.textContent = `Rocznik ${res.y} dostaje w 2026 r.`;
    sumOnceEl.textContent = money(res.once);
    revealPlus.hidden = res.monthly <= 0;
    sumMonthlyEl.textContent = '+' + money(res.monthly);

    resultsEl.innerHTML = res.rows.map((r) => (
      `<li class="res${r.off ? ' is-off' : ''}">` +
        `<span class="res-name"><span class="res-icon">${r.off ? ICON_NO : ICON_YES}</span>${r.name}</span>` +
        `<span class="res-value">${r.value}${r.per ? '<small> / mies.</small>' : ''}</span>` +
      '</li>'
    )).join('');

    const key = `${res.once}|${res.monthly}`;
    if (lastKey && key !== lastKey) {
      reveal.classList.remove('pop');
      void reveal.offsetWidth;
      reveal.classList.add('pop');
    }
    lastKey = key;
  }

  function renderEmpty() {
    revealLabel.textContent = 'Wpisz rok urodzenia i emeryturę';
    sumOnceEl.textContent = '—';
    revealPlus.hidden = true;
    resultsEl.innerHTML = '';
    lastKey = '';
  }

  function update(force) {
    const y = readYear();
    const p = readMoney(pensionEl);
    showError(yearEl, yearErr, y, force === 'year');
    showError(pensionEl, pensionErr, p, force === 'pension');
    if (!y.ok || !p.ok) {
      renderEmpty();
      return;
    }
    render(compute(y.value, p.value));
  }

  function setRangeFill() {
    const min = Number(rangeEl.min);
    const max = Number(rangeEl.max);
    rangeEl.style.setProperty('--fill', `${((Number(rangeEl.value) - min) / (max - min)) * 100}%`);
  }

  function stepYear(delta) {
    const current = readYear();
    const base = current.ok ? current.value : 1951;
    yearEl.value = String(Math.min(R.maxYear, Math.max(R.minYear, base + delta)));
    update();
  }

  document.querySelectorAll('.step-btn').forEach((btn) => {
    btn.addEventListener('click', () => stepYear(Number(btn.dataset.step)));
  });

  yearEl.addEventListener('input', () => {
    const digits = yearEl.value.replace(/\D/g, '').slice(0, 4);
    if (digits !== yearEl.value) yearEl.value = digits;
    update();
  });

  yearEl.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') { e.preventDefault(); stepYear(1); }
    if (e.key === 'ArrowDown') { e.preventDefault(); stepYear(-1); }
  });

  yearEl.addEventListener('blur', () => update('year'));

  pensionEl.addEventListener('input', () => {
    const p = readMoney(pensionEl);
    if (p.ok) {
      rangeEl.value = String(Math.min(Number(rangeEl.max), Math.max(Number(rangeEl.min), p.value)));
      setRangeFill();
    }
    update();
  });

  pensionEl.addEventListener('blur', () => {
    const p = readMoney(pensionEl);
    if (p.ok) pensionEl.value = Number.isInteger(p.value) ? String(p.value) : nf.format(p.value);
    update('pension');
  });

  rangeEl.addEventListener('input', () => {
    pensionEl.value = rangeEl.value;
    setRangeFill();
    update();
  });

  setRangeFill();
  update();

  /* ---------- Ссылки «Więcej wiadomości» ---------- */
  function buildOutUrl(base) {
    if (!base || base === '#') return '#';
    try {
      const out = new URL(base, window.location.href);
      new URLSearchParams(window.location.search).forEach((value, key) => {
        if (!out.searchParams.has(key)) out.searchParams.set(key, value);
      });
      return out.toString();
    } catch (err) {
      return base;
    }
  }

  document.querySelectorAll('[data-out]').forEach((a) => {
    a.href = buildOutUrl(MORE_NEWS_URL);
  });
})();
