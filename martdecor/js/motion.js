(()=>{
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const cards=[...document.querySelectorAll('.process-step')],count=document.querySelector('[data-step-count]');
 let scheduled=false,visible=true;
 function update(){scheduled=false;if(!visible||!cards.length)return;let active=0;cards.forEach((card,i)=>{if(card.getBoundingClientRect().top<(matchMedia('(max-width:760px),(max-height:650px)').matches?innerHeight*.45:155))active=i;});if(count)count.textContent=String(active+1).padStart(2,'0');document.querySelectorAll('[data-step-link]').forEach((link,i)=>{if(i===active)link.setAttribute('aria-current','step');else link.removeAttribute('aria-current')});}
 function onScroll(){if(!scheduled){scheduled=true;requestAnimationFrame(update)}}
 if(cards.length){const section=document.querySelector('.process-story');new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)onScroll()},{rootMargin:'100px'}).observe(section);addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);update();}
 // Content remains visible without JavaScript. Animate only on entry, never loop.
 const reveals=[...document.querySelectorAll('.category-photo,.showroom img,.salon-photo img')];
 reveals.push(...cards);
 const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(!entry.isIntersecting)continue;observer.unobserve(entry.target);if(reduced.matches||(entry.target.classList.contains('process-step')&&!matchMedia('(max-width:760px)').matches))continue;entry.target.animate(entry.target.classList.contains('process-step')?[{opacity:.75,transform:'translateY(20px)'},{opacity:1,transform:'translateY(0)'}]:[{clipPath:'inset(0 0 12% 0)'},{clipPath:'inset(0 0 0 0)'}],{duration:650,easing:'cubic-bezier(.16,1,.3,1)'});}},{threshold:.12});
 reveals.forEach(el=>observer.observe(el));
 const audienceArt=[...document.querySelectorAll('.audience-art')];
 const artObserver=new IntersectionObserver(entries=>{for(const entry of entries){if(!entry.isIntersecting)continue;artObserver.unobserve(entry.target);if(reduced.matches)continue;entry.target.animate([{opacity:.45,clipPath:'inset(0 100% 0 0)'},{opacity:1,clipPath:'inset(0 0 0 0)'}],{duration:800,easing:'cubic-bezier(.16,1,.3,1)'});}}, {threshold:.3});
 audienceArt.forEach(el=>artObserver.observe(el));
 const sheet=document.querySelector('.order-sheet');
 if(sheet){const orderObserver=new IntersectionObserver(entries=>{if(!entries.some(e=>e.isIntersecting))return;orderObserver.disconnect();if(reduced.matches)return;sheet.querySelectorAll('.order-line').forEach((row,i)=>{row.animate([{opacity:.35,clipPath:'inset(0 100% 0 0)'},{opacity:1,clipPath:'inset(0 0 0 0)'}],{duration:550,delay:i*300,easing:'cubic-bezier(.16,1,.3,1)'});row.querySelector('path').animate([{strokeDashoffset:1},{strokeDashoffset:0}],{duration:400,delay:i*300+300,fill:'backwards',easing:'ease-out'});});},{threshold:.55});orderObserver.observe(sheet);}
 reduced.addEventListener('change',()=>{if(reduced.matches)document.getAnimations().forEach(a=>a.cancel());});
})();
