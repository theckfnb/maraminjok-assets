if(window.ScrollTrigger)ScrollTrigger.config({ignoreMobileResize:true});

(()=>{
const RM=false; /* 움직임 줄이기 설정이 켜진 PC에서도 숫자·띠·사진이 움직이게(2026-11-09) */
const P=s=>s.split(',').map(x=>'.mm37 '+x.trim()).join(',');const $=s=>document.querySelector(P(s)),$$=s=>[...document.querySelectorAll(P(s))];

const vio=new IntersectionObserver(es=>{for(const e of es){const v=e.target;if(e.isIntersecting&&!RM){v.play().catch(()=>{})}else v.pause()}},{threshold:.2});
$$('video').forEach(v=>{v.muted=true;vio.observe(v)});

const sw=$$('#swap b');let wi=0;
if(!RM)setInterval(()=>{const a=sw[wi];a.classList.remove('on');a.classList.add('out');wi=(wi+1)%sw.length;const b=sw[wi];b.classList.remove('out');void b.offsetWidth;b.classList.add('on');setTimeout(()=>a.classList.remove('out'),600)},2400);

const hero=$('.hero'),cv=$('#fx'),cx=cv.getContext('2d');let W,H,on=true,ps=[];
function rs(){W=cv.width=hero.clientWidth*devicePixelRatio;H=cv.height=hero.clientHeight*devicePixelRatio}rs();addEventListener('resize',rs);
const GLY=['麻','辣'];for(let i=0;i<36;i++)ps.push({x:Math.random(),y:Math.random(),r:Math.random()*2.2+.6,s:Math.random()*.0011+.0004,w:Math.random()*6,g:i%8===0?GLY[i%2]:null});
new IntersectionObserver(e=>on=e[0].isIntersecting).observe(hero);
function draw(){if(on){cx.clearRect(0,0,W,H);for(const p of ps){p.y-=p.s;p.w+=.01;if(p.y<-.05){p.y=1.05;p.x=Math.random()}const x=(p.x+Math.sin(p.w)*.01)*W,y=p.y*H;
 if(p.g){cx.font=`${30*devicePixelRatio}px "Black Han Sans",sans-serif`;cx.fillStyle='rgba(255,255,255,.22)';cx.fillText(p.g,x,y)}else{cx.beginPath();cx.arc(x,y,p.r*devicePixelRatio,0,7);cx.fillStyle='rgba(255,246,234,.5)';cx.fill()}}}requestAnimationFrame(draw)}
if(!RM)draw();

const qb=$('#qbar'),sd2=$('.side'),nv=$('.nav');let lsy=scrollY;addEventListener('scroll',()=>{const on=scrollY>innerHeight*.7;qb.classList.toggle('show',on);sd2.classList.toggle('show',on);nv.classList.toggle('up',scrollY>lsy&&scrollY>300);lsy=scrollY},{passive:true});

const ms=$$('.mq .tr,.strip .tr').map(t=>{t.innerHTML+=t.innerHTML+t.innerHTML;return{t,d:+t.dataset.dir,x:0}});
let ly=scrollY,vel=0;
function loop(){const dy=scrollY-ly;ly=scrollY;vel=vel*.9+dy*.1;for(const m of ms){const w=m.t.scrollWidth/3;m.x-=(0.9+Math.abs(vel)*.3)*m.d;if(m.x<-w)m.x+=w;if(m.x>0)m.x-=w;m.t.style.transform=`translateX(${m.x}px)`}requestAnimationFrame(loop)}
if(!RM)loop();


const sl=$$('#slider .slide'),sd=$('#sdots');let si=0,timer;
sl.forEach((_,i)=>{const d=document.createElement('i');d.onclick=()=>go(i);sd.appendChild(d)});
let pinned=false;
function go(i){i=(i+sl.length)%sl.length;if(i===si&&sl[si].classList.contains('on')&&pinned)return;sl[si].classList.remove('on');sd.children[si].classList.remove('on');si=i;sl[si].classList.add('on');sd.children[si].classList.add('on');clearInterval(timer);if(!RM&&!pinned)timer=setInterval(()=>go(si+1),3800)}
if(sl.length){$('#prev').onclick=()=>go(si-1);$('#next').onclick=()=>go(si+1);go(0);}

$$('.tabs button').forEach(b=>b.onclick=()=>{$$('.tabs button').forEach(x=>x.setAttribute('aria-selected',x===b));$$('.pane').forEach(p=>p.hidden=p.id!==b.dataset.p)});

const fmt=n=>n.toLocaleString('ko-KR');



/* ===== MOTION (GSAP + ScrollTrigger) ===== */
const G=window.gsap,GS=window.gsap,ST=window.ScrollTrigger;
const fmtN=n=>Math.round(n).toLocaleString('ko-KR');
function counters(root){ $$( (root||'')+' [data-count]').forEach(el=>{const to=+el.dataset.count,fr=+(el.dataset.from||0);
  const run=()=>{if(RM||!G){el.textContent=fmtN(to);return}const o={v:fr};G.fromTo(o,{v:fr},{v:to,duration:+(el.dataset.dur||1.6),ease:el.dataset.dur?'power1.inOut':'power3.out',delay:+(el.dataset.delay||0),onUpdate:()=>el.textContent=fmtN(o.v)})};
  if(ST&&!RM)ST.create({trigger:el,start:'top 88%',onEnter:run,onEnterBack:run});else run()})}
if(!G||!ST||RM){counters();return}
G.registerPlugin(ST);
const mm=G.matchMedia();

/* split headings into chars (keeps <em>, <span>, <br>) */
function splitChars(el){const walk=n=>{[...n.childNodes].forEach(c=>{if(c.nodeType===3){const f=document.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(w=>{if(!w)return;if(/^\s+$/.test(w)){f.appendChild(document.createTextNode(' '));return}const wd=document.createElement('span');wd.style.cssText='display:inline-block;white-space:nowrap';[...w].forEach(ch=>{const sp=document.createElement('span');sp.className='ch';sp.textContent=ch;wd.appendChild(sp)});f.appendChild(wd)});c.replaceWith(f)}else if(c.nodeType===1&&!c.classList.contains('swap')&&c.tagName!=='BR')walk(c)})};walk(el);return el.querySelectorAll('.ch')}
$$('.split').forEach(h=>{const cs=splitChars(h);G.from(cs,{yPercent:110,rotate:8,opacity:0,duration:.8,ease:'back.out(1.7)',stagger:.035,scrollTrigger:{trigger:h,start:'top 85%',toggleActions:'play none none reverse'}})});

/* scroll progress */
G.to(P('#prog'),{scaleX:1,ease:'none',scrollTrigger:{start:0,end:'max',scrub:.2}});

/* HERO: load sequence + scroll parallax */
const h1=$('.hero h1');const hc=splitChars(h1.querySelector('.y'));
G.from(P('.hero .k'),{y:-30,opacity:0,duration:.6,ease:'back.out(2)'});
G.from(h1,{y:60,opacity:0,duration:.9,ease:'power3.out',delay:.1});
G.from(hc,{yPercent:120,opacity:0,stagger:.06,duration:.7,ease:'back.out(2)',delay:.35});
if(innerWidth<901)G.set(P('.phone'),{rotation:i=>[-5,4,3,-3][i]});
G.from(P('.phone'),{y:220,rotate:i=>[-8,5,-5,8][i],opacity:0,stagger:.12,duration:1.1,ease:'power4.out',delay:.3});
G.from(P('.hero .ctas .btn'),{y:30,opacity:0,stagger:.1,duration:.6,delay:.9});
G.from(P('.hero .chr'),{scale:0,rotate:-30,duration:1,ease:'elastic.out(1,.5)',delay:.8});
G.to(P('.phone'),{y:i=>(innerWidth<901?[-24,-8,-40,-16]:[-120,-40,-160,-60])[i],ease:'none',scrollTrigger:{trigger:P('.hero'),start:'top top',end:'bottom top',scrub:true}});
G.to(P('.hero .chr.l'),{y:-200,rotate:-20,ease:'none',scrollTrigger:{trigger:P('.hero'),start:'top top',end:'bottom top',scrub:true}});
G.to(P('.hero .chr.r'),{y:160,rotate:25,ease:'none',scrollTrigger:{trigger:P('.hero'),start:'top top',end:'bottom top',scrub:true}});
G.to(P('.hero .t'),{y:120,opacity:.2,ease:'none',scrollTrigger:{trigger:P('.hero'),start:'top top',end:'bottom top',scrub:true}});

/* NUMBERS: counters + giant outline text slides with scroll */
counters();
G.from(P('.nm'),{y:80,opacity:0,stagger:.12,duration:.8,ease:'power3.out',scrollTrigger:{trigger:P('.nrow'),start:'top 85%',toggleActions:'play none none reverse'}});
G.fromTo(P('.nums .giant'),{xPercent:5},{xPercent:-45,ease:'none',scrollTrigger:{trigger:P('.nums'),start:'top bottom',end:'bottom top',scrub:true}});

/* STORY: words light up as you scroll */
$$('.words').forEach(p=>{const walk=n=>{[...n.childNodes].forEach(c=>{if(c.nodeType===3){const f=document.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(w=>{if(!w)return;if(/^\s+$/.test(w)){f.appendChild(document.createTextNode(w));return}const sp=document.createElement('span');sp.className='wd';sp.textContent=w;f.appendChild(sp)});c.replaceWith(f)}else if(c.nodeType===1&&c.tagName!=='BR')walk(c)})};walk(p);
  G.fromTo(p.querySelectorAll('.wd'),{opacity:.15},{opacity:1,stagger:.05,ease:'none',scrollTrigger:{trigger:p,start:'top 80%',end:'bottom 45%',scrub:true}})});
G.from(P('.story .q'),{scale:.6,opacity:0,duration:.8,ease:'back.out(2)',scrollTrigger:{trigger:P('.story .q'),start:'top 85%',toggleActions:'play none none reverse'}});
G.fromTo(P('.story .duo'),{scale:.5,rotate:-15,y:120},{scale:1,rotate:0,y:0,ease:'none',scrollTrigger:{trigger:P('.story .duo'),start:'top bottom',end:'center 60%',scrub:true}});

/* TILES: flip up */
G.fromTo(P('.tile'),{rotateX:-80,y:60,opacity:0},{rotateX:0,y:0,opacity:1,transformOrigin:'50% 0%',stagger:.15,duration:.9,ease:'power3.out',scrollTrigger:{trigger:P('.tiles'),start:'top 85%',toggleActions:'play none none reverse'}});
G.fromTo(P('.tile .ic'),{scale:0,rotate:-90},{scale:1,rotate:0,stagger:.15,duration:.8,ease:'back.out(2.5)',delay:.3,scrollTrigger:{trigger:P('.tiles'),start:'top 85%',toggleActions:'play none none reverse'}});

/* LIVE CCTV: main frame opens, cams pop */
G.fromTo(P('.live-main'),{clipPath:'inset(8% 14% 8% 14% round 40px)',scale:.92},{clipPath:'inset(0% 0% 0% 0% round 26px)',scale:1,ease:'none',scrollTrigger:{trigger:P('.live-main'),start:'top 95%',end:'center 60%',scrub:true}});
G.from(P('.cam'),{y:80,opacity:0,rotate:i=>[-4,3,-3][i],stagger:.12,duration:.9,ease:'power3.out',scrollTrigger:{trigger:P('.live-row'),start:'top 92%',toggleActions:'play none none reverse'}});
$$('.live video').forEach(v=>{try{v.playbackRate=1}catch(e){}});

/* ENGLISH giant lines drift with scroll */
$$('.eng').forEach((e,i)=>G.fromTo(e,{xPercent:i%2?-12:8},{xPercent:i%2?4:-14,ease:'none',scrollTrigger:{trigger:e,start:'top bottom',end:'bottom top',scrub:true}}));
$$('.kick').forEach(k=>G.from(k,{y:24,scale:.8,opacity:0,duration:.6,ease:'back.out(2)',scrollTrigger:{trigger:k,start:'top 90%',toggleActions:'play none none reverse'}}));

/* COLOR MORPH: page background changes section by section */
document.documentElement.classList.add('morph');const WR=[...document.querySelectorAll('.mm37')];WR.forEach(w=>w.style.backgroundColor='#16110E');addEventListener('load',()=>ST.refresh());
[['#nums','#16110E'],['#story','#FFF6EA'],['#live','#FF770F'],['.why','#003221'],['#menu','#FFF6EA'],['#yt','#16110E'],['#contact','#FF770F']].forEach(([sel,c])=>{const el=$(sel);if(!el)return;
  ST.create({trigger:el,start:'top 60%',end:'bottom 60%',refreshPriority:-10,onToggle:self=>{if(self.isActive)G.to(WR,{backgroundColor:c,duration:.7,ease:'power2.out',overwrite:true})}})});

/* WHY: oval cards fly in, photos tilt with scroll */
$$('.wr').forEach((r,i)=>{G.from(r.querySelector('.wi'),{x:i%2?120:-120,rotate:i%2?4:-4,opacity:0,duration:1,ease:'power4.out',scrollTrigger:{trigger:r,start:'top 82%',toggleActions:'play none none reverse'}});G.from(r.querySelectorAll('.wt > *, .wc li'),{y:40,opacity:0,stagger:.07,duration:.7,ease:'power3.out',scrollTrigger:{trigger:r,start:'top 78%',toggleActions:'play none none reverse'}});G.fromTo(r.querySelector('.wi img'),{scale:1.15,yPercent:-4},{scale:1.02,yPercent:4,ease:'none',scrollTrigger:{trigger:r,start:'top bottom',end:'bottom top',scrub:true}})});

/* MENU: pinned scroll-driven slider on desktop */
if(sl.length)mm.add('(min-width:901px)',()=>{pinned=true;clearInterval(timer);
  const t=ST.create({trigger:P('.menu'),start:'top top',end:'+='+(sl.length*55)+'%',pin:true,scrub:true,
    onUpdate:self=>{go(Math.min(sl.length-1,Math.floor(self.progress*sl.length)));G.set(P('.slide.on .dish'),{rotate:self.progress*360})}});
  return()=>{pinned=false;t.kill();go(si)}});

/* YOUTUBE cards */
G.fromTo(P('.yc'),{y:100,scale:.85,opacity:0},{y:0,scale:1,opacity:1,stagger:.1,duration:.9,ease:'power3.out',scrollTrigger:{trigger:P('.ytg'),start:'top 85%',toggleActions:'play none none reverse'}});
G.fromTo(P('.yc .pl'),{scale:0,rotate:-45},{scale:1,rotate:0,stagger:.1,duration:.7,ease:'back.out(3)',delay:.4,scrollTrigger:{trigger:P('.ytg'),start:'top 85%',toggleActions:'play none none reverse'}});

/* STORE */
G.from(P('.store .l'),{xPercent:-40,opacity:0,duration:1.1,ease:'power3.out',scrollTrigger:{trigger:P('.store'),start:'top 75%',toggleActions:'play none none reverse'}});
G.from(P('.store .r > *'),{x:80,opacity:0,stagger:.1,duration:.8,ease:'power3.out',scrollTrigger:{trigger:P('.store'),start:'top 75%',toggleActions:'play none none reverse'}});
G.from(P('.store .tags span'),{scale:0,stagger:.08,duration:.5,ease:'back.out(3)',delay:.6,scrollTrigger:{trigger:P('.store'),start:'top 75%',toggleActions:'play none none reverse'}});


/* GUIDE */
G.from(P('.ytab tr'),{x:-40,opacity:0,stagger:.06,duration:.5,ease:'power2.out',scrollTrigger:{trigger:P('.ytab table'),start:'top 85%',toggleActions:'play none none reverse'}});
G.from(P('.flow > div'),{y:50,opacity:0,stagger:.08,duration:.6,ease:'power3.out',scrollTrigger:{trigger:P('.flow'),start:'top 88%',toggleActions:'play none none reverse'}});
$$('.gh h3').forEach(h=>G.from(h,{y:40,opacity:0,duration:.6,ease:'back.out(2)',scrollTrigger:{trigger:h,start:'top 88%',toggleActions:'play none none reverse'}}));
G.from(P('.cond > div'),{y:60,opacity:0,stagger:.1,duration:.7,ease:'power3.out',scrollTrigger:{trigger:P('.cond'),start:'top 88%',toggleActions:'play none none reverse'}});
$$('.tabs button').forEach(b=>b.addEventListener('click',()=>{setTimeout(()=>ST.refresh(),60);const p=$('#'+b.dataset.p);G.from(p.querySelectorAll('.flow > div, .cond > div, tr'),{y:30,opacity:0,stagger:.05,duration:.45,ease:'power2.out'});p.querySelectorAll('[data-count]').forEach(el=>{const o={v:+(el.dataset.from||0)};G.to(o,{v:+el.dataset.count,duration:1.2,ease:'power3.out',onUpdate:()=>el.textContent=fmtN(o.v)})})}));

/* CONTACT */
G.from(P('.contact .telb'),{scale:.6,opacity:0,duration:.8,ease:'back.out(2)',scrollTrigger:{trigger:P('.contact'),start:'top 70%',toggleActions:'play none none reverse'}});
G.fromTo(P('.contact .chr'),{x:-200,rotate:-30},{x:0,rotate:0,ease:'none',scrollTrigger:{trigger:P('.contact'),start:'top bottom',end:'center center',scrub:true}});

/* EXTRA: always-moving details */
$$('.yc').forEach(c=>GS.fromTo(c,{backgroundPosition:'50% 0%'},{backgroundPosition:'50% 100%',ease:'none',scrollTrigger:{trigger:c,start:'top bottom',end:'bottom top',scrub:true}}));
GS.fromTo(P('.strip'),{rotate:-1.5},{rotate:1.5,ease:'none',scrollTrigger:{trigger:P('.strip'),start:'top bottom',end:'bottom top',scrub:true}});
GS.fromTo(P('.mq:not(.f)'),{rotate:1},{rotate:-1,ease:'none',scrollTrigger:{trigger:P('.mq'),start:'top bottom',end:'bottom top',scrub:true}});
GS.from(P('footer .in > *'),{y:30,opacity:0,stagger:.15,duration:.6,scrollTrigger:{trigger:P('footer'),start:'top 90%'}});
addEventListener('load',()=>ST.refresh());
})();

/* 전체 메뉴 탭·세트 필터 */
(()=>{const tb=document.querySelectorAll('.ftabs button');tb.forEach(b=>b.addEventListener('click',()=>{tb.forEach(x=>x.setAttribute('aria-selected',x===b));document.querySelectorAll('.fpane').forEach(p=>p.hidden=p.id!==b.dataset.p);if(window.ScrollTrigger)ScrollTrigger.refresh()}));
const ch=document.querySelectorAll('.fchips button');ch.forEach(b=>b.addEventListener('click',()=>{ch.forEach(x=>x.classList.toggle('on',x===b));document.querySelectorAll('#fp1 .fc').forEach(c=>c.classList.toggle('hide',!!b.dataset.f&&c.querySelector('small').textContent!==b.dataset.f));if(window.ScrollTrigger)ScrollTrigger.refresh()}))})();

/* 세트 '전체' 단체 사진 슬라이드 */
(()=>{const g=document.getElementById('gsl');if(!g)return;const ss=[...g.querySelectorAll('.gs')],cb=[...g.querySelectorAll('.gcat button')],cnt=g.querySelector('.gcnt b'),bar=g.querySelector('.gbar i');let i=0,t,D=2200;
function go(n){ss[i].classList.remove('on');i=(n+ss.length)%ss.length;ss[i].classList.add('on');cnt.textContent=String(i+1).padStart(2,'0');cb.forEach(b=>b.classList.toggle('on',b.dataset.c===ss[i].dataset.c));bar.style.transition='none';bar.style.width='0';void bar.offsetWidth;bar.style.transition='width '+D+'ms linear';bar.style.width='100%';clearTimeout(t);t=setTimeout(()=>go(i+1),D)}
g.querySelector('.gp').onclick=()=>go(i-1);g.querySelector('.gn').onclick=()=>go(i+1);
cb.forEach(b=>b.onclick=()=>go(ss.findIndex(s=>s.dataset.c===b.dataset.c)));
let x0=null;const v=g.querySelector('.gview');v.addEventListener('touchstart',e=>x0=e.touches[0].clientX,{passive:true});v.addEventListener('touchend',e=>{if(x0===null)return;const dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>40)go(i+(dx<0?1:-1));x0=null});
go(0)})();
