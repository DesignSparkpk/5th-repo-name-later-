const { chromium } = require('playwright'); const fs=require('fs');
(async()=>{
 const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1280,height:720}});const p=await ctx.newPage();
 await p.goto('http://localhost:8768/designspark-site/',{waitUntil:'networkidle'});
 // reveal everything + preload lazy images
 await p.evaluate(async()=>{document.querySelectorAll('.rv').forEach(e=>e.classList.add('in'));document.querySelectorAll('img[loading=lazy]').forEach(i=>i.loading='eager');document.documentElement.style.scrollBehavior='auto'});
 await p.waitForTimeout(2500);
 await p.addStyleTag({content:`#fc{position:fixed;left:0;top:0;z-index:99999;pointer-events:none;filter:drop-shadow(0 2px 3px rgba(0,0,0,.6))}#fr{position:fixed;width:34px;height:34px;margin:-17px 0 0 -17px;border-radius:50%;border:2px solid rgba(255,211,110,.9);pointer-events:none;z-index:99998;opacity:0}#fr.go{animation:rp .45s ease-out}@keyframes rp{0%{opacity:.9;transform:scale(.4)}100%{opacity:0;transform:scale(1.5)}}
 #cap{position:fixed;left:50%;bottom:34px;transform:translate(-50%,20px);z-index:99997;opacity:0;transition:opacity .45s,transform .45s;background:rgba(9,9,11,.82);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.16);color:#fff;font:600 26px Geist,sans-serif;letter-spacing:-.4px;padding:14px 28px;border-radius:999px;white-space:nowrap;box-shadow:0 20px 50px rgba(0,0,0,.6)}
 #cap.on{opacity:1;transform:translate(-50%,0)}#cap b{background:linear-gradient(135deg,#FFD36E,#FF8A3D);-webkit-background-clip:text;background-clip:text;color:transparent}`});
 await p.evaluate(()=>{const c=document.createElement('div');c.id='fc';c.innerHTML='<svg width="22" height="22" viewBox="0 0 22 22"><path d="M3 2 L3 18 L7.5 13.8 L10.5 20.5 L13 19.4 L10.1 12.8 L16 12.8 Z" fill="#fff" stroke="#111" stroke-width="1.3" stroke-linejoin="round"/></svg>';c.style.transform='translate(900px,600px)';document.body.appendChild(c);
  const r=document.createElement('div');r.id='fr';document.body.appendChild(r);const cap=document.createElement('div');cap.id='cap';document.body.appendChild(cap);
  addEventListener('mousemove',e=>{c.style.transform=`translate(${e.clientX-3}px,${e.clientY-2}px)`},true);
  addEventListener('mousedown',e=>{r.style.left=e.clientX+'px';r.style.top=e.clientY+'px';r.classList.remove('go');void r.offsetWidth;r.classList.add('go')},true);});
 const cdp=await ctx.newCDPSession(p);const frames=[];let n=0;
 cdp.on('Page.screencastFrame',async f=>{const fn=`iframes/f${String(n++).padStart(5,'0')}.jpg`;fs.writeFileSync(fn,Buffer.from(f.data,'base64'));frames.push([fn,f.metadata.timestamp]);try{await cdp.send('Page.screencastFrameAck',{sessionId:f.sessionId})}catch(e){}});
 const W8=ms=>p.waitForTimeout(ms);let cx=900,cy=600;await p.mouse.move(cx,cy);
 async function moveTo(x,y,ms=600){const k0=Math.max(8,Math.round(ms/16)),sx=cx,sy=cy;for(let i=1;i<=k0;i++){const k=i/k0,e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;await p.mouse.move(sx+(x-sx)*e+Math.sin(k*Math.PI)*6,sy+(y-sy)*e-Math.sin(k*Math.PI)*10);await W8(14)}cx=x;cy=y}
 async function clickAt(x,y,ms){await moveTo(x,y,ms);await W8(120);await p.mouse.down();await W8(80);await p.mouse.up()}
 async function click(sel,ms=600){const bb=await p.locator(sel).first().boundingBox();await clickAt(bb.x+bb.width/2,bb.y+bb.height/2,ms)}
 async function scrollTo(sel,off=90,ms=1200){const target=await p.evaluate(([s,o])=>document.querySelector(s).getBoundingClientRect().top+scrollY-o,[sel,off]);const start=await p.evaluate(()=>scrollY);const k0=Math.round(ms/16);for(let i=1;i<=k0;i++){const k=i/k0,e=k<.5?4*k*k*k:1-Math.pow(-2*k+2,3)/2;await p.evaluate(y=>scrollTo(0,y),start+(target-start)*e);await W8(14)}}
 async function cap(html){await p.evaluate(h=>{const c=document.getElementById('cap');c.classList.remove('on');setTimeout(()=>{c.innerHTML=h;c.classList.add('on')},350)},html);}
 async function drag(sel,to,ms=1000){const el=p.locator(sel),bb=await el.boundingBox(),[mn,mx,v]=await el.evaluate(e=>[+e.min,+e.max,+e.value]);const xAt=val=>bb.x+10+(val-mn)/(mx-mn)*(bb.width-20),y=bb.y+bb.height/2;await moveTo(xAt(v),y,500);await p.mouse.down();await W8(80);const k0=Math.round(ms/16),sx=cx;for(let i=1;i<=k0;i++){const k=i/k0,e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;await p.mouse.move(sx+(xAt(to)-sx)*e,y);await W8(14)}cx=xAt(to);await p.mouse.up()}
 await cdp.send('Page.startScreencast',{format:'jpeg',quality:90,maxWidth:1280,maxHeight:720,everyNthFrame:1});
 const T=Date.now();const at=async sec=>{const ms=sec*1000-(Date.now()-T);if(ms>0)await W8(ms)};
 // L1 0.0 hero
 await cap("Hi, I'm <b>Majid Khan</b> 👋 founder of DesignSpark Studio");
 await moveTo(700,330,1800);
 // L2 3.82 services tiles
 await at(3.82);await cap("Websites · Landing pages · Calculators · <b>CVs</b>");
 for(const i of [1,2,3,4]){const bb=await p.locator(`.svc-row .sv:nth-child(${i})`).boundingBox();await moveTo(bb.x+bb.width/2,bb.y+bb.height/2,520);await W8(480)}
 // L3 9.13 bento + mini calc
 await at(9.13);await cap("Fast, modern and <b>mobile-first</b>");await scrollTo('.t-calc',110,1100);
 await drag('#mr',4200,1100);
 // L4 13.42 restaurants
 await at(13.42);await cap("Restaurant websites · QR menus · <b>WhatsApp ordering</b>");await scrollTo('#work',70,1100);await W8(200);
 await click('#rest .arrows button[data-d="1"]',650);await W8(650);await click('#rest .arrows button[data-d="1"]',350);
 // L5 18.64 landing pages
 await at(18.64);await cap("Landing pages in <b>24 hours</b>");await scrollTo('#land',120,900);await W8(200);await click('#land .arrows button[data-d="1"]',650);
 // L6 22.94 CVs
 await at(22.94);await cap("Clean, <b>ATS-friendly</b> CVs");await scrollTo('#cv',110,900);
 for(const i of [1,2]){const bb=await p.locator(`#cv .work:nth-child(${i})`).boundingBox();await moveTo(bb.x+bb.width/2,bb.y+bb.height/2,520);await W8(250)}
 // L7 26.26 live calculator
 await at(26.26);await cap("Custom calculators your visitors <b>can play with</b>");await scrollTo('#calc .demo',90,1000);
 {const f=p.frameLocator('#calcframe');const sz=await f.locator('#q-size').boundingBox();const mn=500,mx=5000;
  await moveTo(sz.x+10+(1800-mn)/(mx-mn)*(sz.width-20),sz.y+sz.height/2,500);await p.mouse.down();await W8(60);
  const sx=cx,tx=sz.x+10+(3800-mn)/(mx-mn)*(sz.width-20);for(let i=1;i<=55;i++){const k=i/55,e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;await p.mouse.move(sx+(tx-sx)*e,cy);await W8(14)}cx=tx;await p.mouse.up();
  const bb=await f.locator('#q-freq .pill[data-v="20"]').boundingBox();await clickAt(bb.x+bb.width/2,bb.y+bb.height/2,500);}
 // L8 30.23 final
 await at(30.23);await cap("Got a project? <b>Message me on Fiverr</b> 🚀");await scrollTo('.final',100,1100);
 {const bb=await p.locator('.final .btn').boundingBox();await moveTo(bb.x+bb.width/2,bb.y+bb.height/2,700)}
 await at(36.4);
 console.log('seconds',(Date.now()-T)/1000);
 await cdp.send('Page.stopScreencast');await W8(200);
 let list='';for(let i=0;i<frames.length;i++){const d=i<frames.length-1?frames[i+1][1]-frames[i][1]:0.5;list+=`file '${frames[i][0]}'\nduration ${d.toFixed(4)}\n`}list+=`file '${frames[frames.length-1][0]}'\n`;fs.writeFileSync('iframes.txt',list);console.log('frames',frames.length);
 await b.close();})();
