document.addEventListener('DOMContentLoaded', function(){
  // Typed subtitle (simple type/delete)
  (function(){
    const el = document.querySelector('.header-mono');
    if(!el) return;
    const words = ['Front-end Designer','Developer','UX Engineer','Product Thinker'];
    let w = 0, i = 0, isDeleting = false;
    function tick(){
      const full = words[w];
      i += isDeleting ? -1 : 1;
      el.textContent = full.substring(0, i);
      if(!isDeleting && i === full.length){
        setTimeout(()=> isDeleting = true, 900);
      } else if(isDeleting && i === 0){
        isDeleting = false; w = (w + 1) % words.length;
      }
      setTimeout(tick, isDeleting ? 60 : 120);
    }
    tick();
  })();

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor){
    anchor.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href === '#' || href === '') return;
      const target = document.querySelector(href);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // Navbar shrink on scroll
  const nav = document.querySelector('.navbar');
  function onScroll(){
    if(!nav) return;
    if(window.scrollY > 60) nav.classList.add('navbar-scrolled'); else nav.classList.remove('navbar-scrolled');
  }
  onScroll();
  window.addEventListener('scroll', onScroll);

  // Reveal on scroll (cards, portfolio items, blog cards)
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(ent=>{
      if(ent.isIntersecting){
        ent.target.classList.add('in-view');
        io.unobserve(ent.target);
      }
    });
  },{threshold:0.12});
  document.querySelectorAll('.card, .portfolio-item, .blog-card, .price-card, .contact-form-card, .contact-info-card').forEach(el=>{
    el.classList.add('reveal-up');
    io.observe(el);
  });

});
