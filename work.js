// mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => navMenu.classList.toggle('open'));
navLinks.forEach(l => l.addEventListener('click', () => navMenu.classList.remove('open')));

// project filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.work-card');

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