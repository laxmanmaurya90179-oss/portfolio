// Laxman Mourya portfolio interactions
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navItems = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navItems.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Typing animation
const roles = ['digital experiences', 'useful websites', 'e-commerce ideas', 'learning platforms'];
const typedRole = document.getElementById('typedRole');
let roleIndex = 0;
let charIndex = roles[0].length;
let deleting = true;

function typeRole() {
  const current = roles[roleIndex];
  if (deleting) {
    charIndex--;
    typedRole.textContent = current.slice(0, charIndex);
    if (charIndex <= 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeRole, 350);
      return;
    }
  } else {
    const next = roles[roleIndex];
    charIndex++;
    typedRole.textContent = next.slice(0, charIndex);
    if (charIndex >= next.length) {
      deleting = true;
      setTimeout(typeRole, 1500);
      return;
    }
  }
  setTimeout(typeRole, deleting ? 45 : 75);
}
setTimeout(typeRole, 1600);

// Reveal sections as they enter the viewport
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Project filters
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    projectCards.forEach(card => {
      const shouldShow = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !shouldShow);
    });
  });
});

// Scroll progress and active navigation state
const progress = document.getElementById('scrollProgress');
const sections = document.querySelectorAll('main section[id]');
function updateScrollUI() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
  let current = 'home';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 170) current = section.id;
  });
  navItems.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}
window.addEventListener('scroll', updateScrollUI, { passive: true });
updateScrollUI();

// Current year in footer
document.getElementById('year').textContent = new Date().getFullYear();
