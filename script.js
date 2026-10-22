// typing effect
  const phrases = [
    "answering your customers 24/7",
    "automating your manual admin",
    "fixing the bug costing you sales",
    "launching your product fast"
  ];
  const target = document.getElementById('typeTarget');
  let pIndex = 0, cIndex = 0, deleting = false;
  function tick(){
    const phrase = phrases[pIndex];
    if(!deleting){
      cIndex++;
      target.textContent = phrase.slice(0, cIndex);
      if(cIndex === phrase.length){ deleting = true; setTimeout(tick, 1400); return; }
    } else {
      cIndex--;
      target.textContent = phrase.slice(0, cIndex);
      if(cIndex === 0){ deleting = false; pIndex = (pIndex + 1) % phrases.length; }
    }
    setTimeout(tick, deleting ? 30 : 55);
  }
  tick();

  // skill bar fill on view
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        document.querySelectorAll('.skill-fill').forEach(el => {
          el.style.width = el.dataset.fill + '%';
        });
        skillObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });
  const skillsSection = document.querySelector('.skills');
  if(skillsSection) skillObserver.observe(skillsSection);

  // active nav highlighting
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], .hero[id]');
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        navLinks.forEach(l => l.classList.remove('active'));
        const link = document.querySelector('.nav-link[href="#' + entry.target.id + '"]');
        if(link) link.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });
  sections.forEach(s => navObserver.observe(s));

  // mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  navToggle.addEventListener('click', () => navMenu.classList.toggle('open'));
  navLinks.forEach(l => l.addEventListener('click', () => navMenu.classList.remove('open')));

  // project filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      cards.forEach(card => {
        const cats = card.dataset.cat.split(' ');
        card.style.display = (f === 'all' || cats.includes(f)) ? 'flex' : 'none';
      });
    });
  });

  // contact form -> mailto
  document.getElementById('contactForm').addEventListener('submit', function(e){
    e.preventDefault();
    const name = document.getElementById('cname').value;
    const email = document.getElementById('cemail').value;
    const subject = document.getElementById('csubject').value;
    const message = document.getElementById('cmessage').value;
    const body = `Name: ${name}%0AEmail: ${email}%0A%0A${message}`;
    window.location.href = `mailto:emmanuelfemi000@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  });