// ===== Sticky header visual class =====
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
});

// ===== Mobile nav toggle =====
const navToggle = document.getElementById('nav-toggle');
const primaryMenu = document.getElementById('primary-menu');

navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  primaryMenu.classList.toggle('show');
});

// ===== Smooth scroll for internal links (works with offset if needed) =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = this.getAttribute('href');
    if (!target || target === '#') return;
    const el = document.querySelector(target);
    if (!el) return;

    e.preventDefault();
    const topOffset = 70; // header height to offset (adjust if needed)
    const rect = el.getBoundingClientRect();
    const scrollTop = window.pageYOffset + rect.top - topOffset;
    window.scrollTo({ top: scrollTop, behavior: 'smooth' });

    // close mobile menu after click
    if (primaryMenu.classList.contains('show')) {
      primaryMenu.classList.remove('show');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

// ===== Search form handling (prevent default + basic validation) =====
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const location = document.getElementById('location').value.trim();
  const type = document.getElementById('type').value;
  const budgetValue = document.getElementById('budget').value;

  // Basic validation & feedback
  if (!location && !type && !budgetValue) {
    alert('Please enter at least one search criterion (location, type, or budget).');
    return;
  }

  // Convert budget to number if provided
  const budget = budgetValue ? Number(budgetValue) : null;
  // For this draft, just log the criteria and show a simple message
  console.log({ location, type, budget });
  alert('Search submitted. Check console for query object (development mode).');

  // TODO: Replace with actual search/filter logic
});
