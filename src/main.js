import './style.css'
import '@fortawesome/fontawesome-free/css/all.css'

// Mobile Menu Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Change icon
    const icon = mobileToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    const icon = mobileToggle.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  });
});

// Smooth Scroll for Anchor Links (handling fixed header offset)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  });
});

// Scroll Animation (Fade In)
const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Target elements to animate
document.querySelectorAll('.service-card, .about-text, .about-image, .hero-content, .contact-form-wrapper').forEach(el => {
  el.classList.add('fade-in-section');
  observer.observe(el);
});

// Form Submission Handler
async function submitForm(url, data, formElement) {
  const button = formElement.querySelector('button[type="submit خوب');
  const originalText = button.innerText;

  try {
    button.innerText = 'Sending...';
    button.disabled = true;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      alert(result.message);
      formElement.reset();
    } else {
      throw new Error(result.error || 'Something went wrong');
    }
  } catch (error) {
    console.error('Submission error:', error);
    alert('Failed to send message: ' + error.message);
  } finally {
    button.innerText = originalText;
    button.disabled = false;
  }
}

// Contact Form Listener
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());
    submitForm('http://localhost:5000/api/contact', data, contactForm);
  });
}

// Proposal Form Listener
const proposalForm = document.getElementById('proposalForm');
if (proposalForm) {
  proposalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(proposalForm);
    const data = Object.fromEntries(formData.entries());
    submitForm('http://localhost:5000/api/proposal', data, proposalForm);
  });
}
