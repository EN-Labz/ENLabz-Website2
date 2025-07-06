let currentIndex = 0;

const images = document.querySelectorAll(".carousel-image");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const carousel = document.querySelector(".carousel");
const navLinks = document.querySelectorAll("a[data-page]");
const pageSections = document.querySelectorAll(".page-section");

let intervalId;

// Carousel Logic
function showImage(index) {
  images.forEach((img, i) => {
    img.classList.toggle("active", i === index);
    dots[i].classList.toggle("active-dot", i === index);
  });
}

function showNextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
}

function showPrevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
}

function startCarousel() {
  intervalId = setInterval(showNextImage, 3000);
}

function pauseCarousel() {
  clearInterval(intervalId);
}

// Navigation Handling
function navigateTo(targetId) {
  // Hide all sections
  pageSections.forEach(section => {
    section.style.display = "none";
    section.classList.remove("fade-in");
  });

  // Show target section
  const targetSection = document.getElementById(targetId);
  if (targetSection) {
    targetSection.style.display = "block";
    void targetSection.offsetWidth;
    targetSection.classList.add("fade-in");
  }

  // Update active nav link
  navLinks.forEach(link => link.classList.remove("active"));
  const activeLink = document.querySelector(`[data-page="${targetId}"]`);
  if (activeLink) activeLink.classList.add("active");

  // Restart carousel if home
  if (targetId === "home") {
    showImage(currentIndex);
    startCarousel();
  } else {
    pauseCarousel();
  }
}

// Nav Link Events
navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = link.getAttribute("data-page");
    window.location.hash = target; // Update hash
    navigateTo(target);
  });
});

// View More Products Button
document.getElementById("viewMoreBtn").addEventListener("click", () => {
  window.location.hash = "products";
  navigateTo("products");
});

// Horizontal Scroll Button Logic (for future slider containers)
document.querySelectorAll('.slider-container').forEach(container => {
  const track = container.querySelector('.slider-track');
  const prev = container.querySelector('.slider-btn.prev');
  const next = container.querySelector('.slider-btn.next');

  prev.addEventListener('click', () => {
    track.scrollBy({ left: -250, behavior: 'smooth' });
  });

  next.addEventListener('click', () => {
    track.scrollBy({ left: 250, behavior: 'smooth' });
  });
});

// Product Slider (for image slideshows inside product cards if used)
document.querySelectorAll('.product-slider').forEach(slider => {
  const slides = slider.querySelectorAll('.slide');
  const prev = slider.querySelector('.prev-slide');
  const next = slider.querySelector('.next-slide');
  let index = 0;

  const showSlide = (i) => {
    slides.forEach((slide, j) => {
      slide.classList.toggle('active', j === i);
    });
  };

  prev?.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
  });

  next?.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    showSlide(index);
  });

  showSlide(index);
});

// Horizontal Scroll Buttons (used in catalog rows)
document.querySelectorAll('.scroll-row-wrapper').forEach(wrapper => {
  const row = wrapper.querySelector('.product-row');
  const leftBtn = wrapper.querySelector('.scroll-btn.left');
  const rightBtn = wrapper.querySelector('.scroll-btn.right');

  leftBtn?.addEventListener('click', () => {
    row.scrollBy({ left: -300, behavior: 'smooth' });
  });

  rightBtn?.addEventListener('click', () => {
    row.scrollBy({ left: 300, behavior: 'smooth' });
  });
});

// Carousel controls
nextBtn.addEventListener("click", showNextImage);
prevBtn.addEventListener("click", showPrevImage);
carousel.addEventListener("mouseenter", pauseCarousel);
carousel.addEventListener("mouseleave", startCarousel);
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    currentIndex = i;
    showImage(currentIndex);
  });
});

// Initial load behavior
document.addEventListener("DOMContentLoaded", () => {
  const hash = window.location.hash.substring(1); // remove '#'
  const targetId = hash || "home";
  navigateTo(targetId);
});
