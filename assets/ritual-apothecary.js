// Mobile Menu Toggle
document.querySelectorAll('.mobile-menu-toggle').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const nav = document.querySelector('.header-nav');
    if (nav) {
      nav.classList.toggle('mobile-active');
      toggle.classList.toggle('active');
    }
  });
});

// Collapsible Accordions
const accordionButtons = document.querySelectorAll('[data-accordion-trigger]');
accordionButtons.forEach(button => {
  button.addEventListener('click', function() {
    const content = this.nextElementSibling;
    const isActive = this.getAttribute('aria-expanded') === 'true';
    
    // Close other accordions
    accordionButtons.forEach(btn => {
      if (btn !== this) {
        btn.setAttribute('aria-expanded', 'false');
        const otherContent = btn.nextElementSibling;
        if (otherContent) {
          otherContent.style.maxHeight = null;
          otherContent.setAttribute('aria-hidden', 'true');
        }
      }
    });
    
    // Toggle current accordion
    this.setAttribute('aria-expanded', !isActive);
    if (content) {
      if (isActive) {
        content.style.maxHeight = null;
        content.setAttribute('aria-hidden', 'true');
      } else {
        content.style.maxHeight = content.scrollHeight + 'px';
        content.setAttribute('aria-hidden', 'false');
      }
    }
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Lazy load images
if ('IntersectionObserver' in window) {
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// Prevent multiple form submissions
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', function() {
    const submitButton = this.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Processing...';
    }
  });
});
