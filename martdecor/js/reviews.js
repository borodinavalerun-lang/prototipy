(()=>{
 const section=document.querySelector('#reviews'),stage=section?.querySelector('.review-stage');
 if(!stage)return;
 const slides=[...stage.querySelectorAll('.review-slide')],controls=section.querySelector('.review-controls'),position=section.querySelector('.review-position');
 let current=0;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 function show(next,animate=true){
  current=(next+slides.length)%slides.length;
  slides.forEach((slide,i)=>{slide.getAnimations().forEach(a=>a.cancel());slide.hidden=i!==current;});
  position.textContent=`${current+1} из ${slides.length}`;
  if(animate&&!reduced.matches)slides[current].animate([{opacity:.3,transform:'translateX(12px)'},{opacity:1,transform:'translateX(0)'}],{duration:360,easing:'cubic-bezier(.16,1,.3,1)'});
 }
 // Reserve the tallest quote's height so the controls stay in place.
 function measure(){
  stage.style.minHeight='';
  let max=0;
  slides.forEach(slide=>{slide.hidden=false;max=Math.max(max,slide.getBoundingClientRect().height);});
  const style=getComputedStyle(stage);
  stage.style.minHeight=`${Math.ceil(max+parseFloat(style.paddingTop)+parseFloat(style.paddingBottom))}px`;
  show(current,false);
 }
 stage.classList.add('review-enhanced');controls.hidden=false;show(0,false);
 section.querySelector('.previous').addEventListener('click',()=>show(current-1));
 section.querySelector('.next').addEventListener('click',()=>show(current+1));
 controls.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();show(current+(e.key==='ArrowRight'?1:-1));}});
 measure();document.fonts.ready.then(measure);
 let frame;addEventListener('resize',()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(measure);});
 reduced.addEventListener('change',()=>{if(reduced.matches)slides.forEach(s=>s.getAnimations().forEach(a=>a.cancel()));});
})();
