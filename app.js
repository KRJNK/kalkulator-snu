// Cykle snu 90 min + 15 min na zaśnięcie.
(function () {
  'use strict';
  function toMin(t) {
    var p = t.split(':');
    return (+p[0] || 0) * 60 + (+p[1] || 0);
  }
  function toStr(m) {
    m = ((m % 1440) + 1440) % 1440;
    var h = Math.floor(m / 60), mm = m % 60;
    return (h < 10 ? '0' : '') + h + ':' + (mm < 10 ? '0' : '') + mm;
  }
  function render() {
    var mode = document.getElementById('mode').value;
    var t = toMin(document.getElementById('time').value || '07:00');
    var out = document.getElementById('out');
    var det = document.getElementById('detail');
    var times = [];
    if (mode === 'wake') {
      for (var c = 6; c >= 4; c--) times.push({ c: c, t: toStr(t - c * 90 - 15) });
      out.textContent = 'Połóż się o ' + times.map(function (x) { return x.t; }).join(' / ');
      det.textContent = times.map(function (x) { return x.t + ' = ' + x.c + ' cykli'; }).join(' · ') + '. Najlepiej 5–6 cykli.';
    } else {
      for (var c2 = 4; c2 <= 6; c2++) times.push({ c: c2, t: toStr(t + c2 * 90 + 15) });
      out.textContent = 'Wstań o ' + times.map(function (x) { return x.t; }).join(' / ');
      det.textContent = times.map(function (x) { return x.t + ' = ' + x.c + ' cykli'; }).join(' · ') + '. Doliczono 15 min na zaśnięcie.';
    }
  }
  ['mode', 'time'].forEach(function (id) {
    document.getElementById(id).addEventListener('input', render);
  });
  render();
})();
