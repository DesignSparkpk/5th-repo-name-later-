const { chromium } = require('playwright'); const {spawn}=require('child_process');
const TEST=process.argv[2]==='test';
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:720}});
await p.goto('http://localhost:8765/video.html',{waitUntil:'networkidle'});await p.waitForTimeout(4000);
await p.evaluate(()=>document.querySelectorAll('iframe').forEach(f=>{try{const s=f.contentDocument.createElement('style');s.textContent='html,body{scroll-behavior:auto!important}';f.contentDocument.head.appendChild(s)}catch(e){}}));
const total=await p.evaluate(()=>TOTAL);const FPS=30;
if(TEST){for(const t of [1.5,6,9,15,30,39,43]){await p.evaluate(t=>render(t),t);await p.waitForTimeout(400);await p.screenshot({path:`/tmp/claude-0/vt-${t}.jpg`,type:'jpeg',quality:80});}await b.close();return;}
const out='/home/user/5th-repo-name-later-/fiverr-kit/gig-video.mp4';
const ff=spawn('ffmpeg',['-y','-f','image2pipe','-framerate',String(FPS),'-c:v','mjpeg','-i','-','-c:v','libx264','-pix_fmt','yuv420p','-crf','20','-preset','medium','-movflags','+faststart',out],{stdio:['pipe','ignore','inherit']});
const N=Math.round(total*FPS);
for(let i=0;i<N;i++){await p.evaluate(t=>render(t),i/FPS);await p.waitForTimeout(12);const buf=await p.screenshot({type:'jpeg',quality:92});if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));if(i%300==0)console.log('frame',i,'/',N);}
ff.stdin.end();await new Promise(r=>ff.on('close',r));await b.close();console.log('done',total,'s');})();
