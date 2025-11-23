// ===== Sticky header visual class =====
const header = document.getElementById('site-header');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  });
}

// ===== Mobile nav toggle =====
const navToggle = document.getElementById('nav-toggle');
const primaryMenu = document.getElementById('primary-menu');

if (navToggle && primaryMenu) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    primaryMenu.classList.toggle('show');
  });
}

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
    if (primaryMenu && primaryMenu.classList.contains('show')) {
      primaryMenu.classList.remove('show');
      if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

// ===== Search form handling (prevent default + basic validation) =====
const searchForm = document.getElementById('search-form');
if (searchForm) {
  searchForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const locationInput = document.getElementById('location');
    const typeSelect = document.getElementById('type');
    const budgetSelect = document.getElementById('budget-range'); // <-- updated to match HTML

    const location = locationInput ? locationInput.value.trim() : '';
    const type = typeSelect ? typeSelect.value : '';
    const budgetValue = budgetSelect ? budgetSelect.value : '';

    // Basic validation & feedback
    if (!location && !type && !budgetValue) {
      alert('Please enter at least one search criterion (location, type, or budget).');
      return;
    }

    // Convert budget value (string like "lt5000", "5to20") to numeric range
    const budgetMap = {
      'lt5000': { min: 0, max: 5000 },
      '5to20': { min: 5000, max: 20000 },
      '20to50': { min: 20000, max: 50000 },
      'gt50000': { min: 50000, max: Infinity }
    };

    const budgetRange = budgetMap[budgetValue] || null;

    // Build criteria object
    const criteria = {
      location: location || null,
      type: type || null,
      budget: budgetRange // either an object or null
    };

    console.log('Search criteria:', criteria);

    // Simple user feedback in dev: use alert or better: show inline message in UI
    alert('Search submitted. Check console for query object (development mode).');

    // TODO: Replace with actual search/filter logic or call an API
  });
}
