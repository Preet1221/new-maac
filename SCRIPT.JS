function typeWriter(element, text, speed = 100) {
  return new Promise((resolve) => {
    element.innerHTML = "";
    element.style.borderRight = "3px solid #6366f1";
    let i = 0;

    function typing() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(typing, speed);
      } else {
        // //////////  Keep cursor blinking for a moment then remove it
        setTimeout(() => {
          element.classList.add("completed");
          element.style.borderRight = "none";
          resolve();
        }, 500);
      }
    }
    typing();
  });
}

function fadeIn(element, delay = 0) {
  setTimeout(() => {
    element.style.transition = "opacity 0.8s ease-out";
    element.style.opacity = "1";
  }, delay);
}

// //////////  Start the typing animation when page loads
window.addEventListener("load", async () => {
  const creativeText = document.getElementById("creative-text");
  const webDesignerText = document.getElementById("web-designer-text");
  const subtitle = document.getElementById("subtitle");
  const buttons = document.getElementById("buttons");

  // //////////  Type "Creative" first
  await typeWriter(creativeText, "Creative", 150);

  // //////////  Small delay before typing "Web Designer"
  await new Promise((resolve) => setTimeout(resolve, 300));

  // //////////  Type "Web Designer"
  await typeWriter(webDesignerText, "Web Designer", 150);

  ////////// Show subtitle and buttons with fade in effect
  fadeIn(subtitle, 500);
  fadeIn(buttons, 800);
});

// ////// Theme toggle functionality
const themeToggle = document.getElementById("theme-toggle");
const sunIcon = document.getElementById("sun-icon");
const moonIcon = document.getElementById("moon-icon");
const html = document.documentElement;

//////// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem("theme") || "dark";
html.classList.toggle("light", currentTheme === "light");
html.classList.toggle("dark", currentTheme === "dark");

///////// Update icon visibility based on current theme
function updateThemeIcon() {
  if (html.classList.contains("light")) {
    sunIcon.classList.add("hidden");
    moonIcon.classList.remove("hidden");
  } else {
    sunIcon.classList.remove("hidden");
    moonIcon.classList.add("hidden");
  }
}

updateThemeIcon();

themeToggle.addEventListener("click", () => {
  html.classList.toggle("light");
  html.classList.toggle("dark");
  const newTheme = html.classList.contains("light") ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
  updateThemeIcon();
});

///////// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

///////// Add scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

/////////// Observe elements for animation
document.querySelectorAll(".glass-effect").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(el);
});

/////////// Button functionality
document.getElementById("view-work-btn").addEventListener("click", () => {
  document
    .getElementById("portfolio")
    .scrollIntoView({ behavior: "smooth", block: "start" });
});

document.getElementById("start-project-btn").addEventListener("click", () => {
  document
    .getElementById("contact")
    .scrollIntoView({ behavior: "smooth", block: "start" });
});

////////// zoom ........

function openModal(src) {
  const modal = document.getElementById("imageModal");
  const img = document.getElementById("modalImg");
  img.src = src;
  modal.classList.remove("hidden");
}

function closeModal() {
  document.getElementById("imageModal").classList.add("hidden");
}
