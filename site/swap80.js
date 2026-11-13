/* 마라민족 80판 임시 바꿔 끼우기 (아임웹 '공통 코드 삽입'용, 2026-11-13)
   아임웹 코드 칸(74판 내용)을 PC에서 고치기 전까지, 화면이 뜨기 전에 80판 내용으로 바꿔 끼운다.
   PC에서 코드 칸을 80판으로 바꾸면 이 줄은 아임웹 설정에서 지운다.
   - 머리글(Header) 칸에 넣으면: 옛 내용은 보이지 않은 채 바로 80판이 뜬다.
   - 바닥(Footer) 칸에 넣어도 작동한다(옛 화면이 잠깐 보였다가 바뀜).
   - 무엇이든 실패하면 6초 안에 옛 화면을 그대로 보여 준다. */
(function () {
  if (window.__mm80) return;
  var S = window.__mm80 = { blocked: false, done: false, where: document.readyState === 'loading' ? 'head' : 'foot' };
  var B = 'https://cdn.jsdelivr.net/gh/theckfnb/maraminjok-assets@';
  var W1 = B + '9d0ad49/site/w1_20261113_4.html', W2 = B + '9d0ad49/site/w2_20261113_4.html';
  var CSS = B + 'e3bafed/site/mm_v37_20261113_4.css', JS = B + 'e3bafed/site/mm_v37_20261113_4.js';
  var d = document, early = d.readyState === 'loading', blocked = false, finished = false;
  // 바꿔 끼우는 대상은 지금 아임웹 코드 칸에 들어 있는 판(…_2)뿐. 코드 칸이 다른 판으로 바뀌면 이 코드는 아무것도 하지 않는다.
  var OLD = 'maraminjok-assets@f6eabcf/site/mm_v37_20261113_2.';
  function isOld(u, ext) { return (u || '').indexOf(OLD + ext) >= 0; }
  var hide = d.createElement('style');
  hide.textContent = '.mm37{visibility:hidden!important}';
  (d.head || d.documentElement).appendChild(hide);
  function show() { if (hide.parentNode) hide.parentNode.removeChild(hide); }
  var fail = setTimeout(show, 6000);
  function end() { finished = true; clearTimeout(fail); show(); }
  function get(u) { return fetch(u).then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); }); }
  var p1, p2;
  try { p1 = get(W1); p2 = get(W2); } catch (e) { end(); return; }
  // 머리글 칸에 넣었을 때: 옛 움직임 코드가 실행되기 전에 막는다
  if (early && window.MutationObserver) {
    var mo = new MutationObserver(function (ms) {
      ms.forEach(function (m) {
        [].forEach.call(m.addedNodes, function (n) {
          if (n.nodeType === 1 && n.tagName === 'SCRIPT' && isOld(n.src, 'js')) {
            n.type = 'javascript/blocked'; blocked = true; S.blocked = true;
            if (n.parentNode) n.parentNode.removeChild(n);
          }
        });
      });
    });
    mo.observe(d.documentElement, { childList: true, subtree: true });
    d.addEventListener('DOMContentLoaded', function () { mo.disconnect(); });
  }
  function inner(t) {
    var a = t.indexOf('<div class="mm37">'), b = t.lastIndexOf('</div>');
    if (a < 0 || b < 0) throw new Error('조각 모양이 다름');
    return t.slice(a + 18, b);
  }
  function waitGsap(cb, n) {
    n = n || 0;
    if ((window.gsap && window.ScrollTrigger) || n > 100) return cb();
    setTimeout(function () { waitGsap(cb, n + 1); }, 50);
  }
  function swap() {
    var cs = d.querySelectorAll('.mm37');
    // 이 페이지에 바꿀 칸이 없거나, 코드 칸이 이미 다른 판이면 손대지 않는다
    if (cs.length < 2 || !d.querySelector('link[href*="' + OLD + 'css"]')) { end(); return; }
    Promise.all([p1, p2]).then(function (r) {
      var h1 = inner(r[0]), h2 = inner(r[1]);
      var link = d.createElement('link'); link.rel = 'stylesheet'; link.href = CSS;
      link.onerror = end;
      link.onload = function () {
        try {
          if (!blocked) {   // 바닥 칸에 넣은 경우: 이미 돌고 있는 옛 움직임 정리
            if (window.ScrollTrigger) window.ScrollTrigger.getAll().forEach(function (t) { t.kill(); });
            if (window.gsap) window.gsap.globalTimeline.clear();
          }
          [].forEach.call(d.querySelectorAll('link[rel="stylesheet"]'), function (l) { if (isOld(l.href, 'css')) l.disabled = true; });
          cs[0].innerHTML = h1; cs[1].innerHTML = h2;
        } catch (e) { end(); return; }
        waitGsap(function () {
          var s = d.createElement('script'); s.src = JS;
          s.onerror = end;
          s.onload = function () {
            S.done = true; end();
            try { window.ScrollTrigger.refresh(); } catch (e) {}
            window.addEventListener('load', function () { try { window.ScrollTrigger.refresh(); } catch (e) {} });
          };
          d.body.appendChild(s);
        });
      };
      d.head.appendChild(link);
    }).catch(end);
  }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', swap); else swap();
})();
