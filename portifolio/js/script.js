// ====== Tema Claro/Escuro ======
const body = document.body;
const themeToggle = document.getElementById("theme-toggle");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  body.classList.add("dark");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");

  const isDark = body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
});

// ====== Menu Mobile Responsivo ======
const menuBtn = document.getElementById("menu-btn");
const navList = document.getElementById("nav-list");

menuBtn.addEventListener("click", () => {
  const isOpen = navList.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", isOpen);
});

document.querySelectorAll(".nav-list a").forEach((link) => {
  link.addEventListener("click", () => {
    navList.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", false);
    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
  });
});

// ========== Menu ativo ==========
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-list a");

let manualNavActive = false;

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
    manualNavActive = true;
    setTimeout(() => {
      manualNavActive = false;
    }, 800); 
  });
});

window.addEventListener("scroll", () => {
  if (manualNavActive) return;

  const scrollY = window.scrollY;
  let found = false;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
          found = true;
        }
      });
    }
  });

  if (!found) {
    navLinks.forEach((link) => link.classList.remove("active"));
  }
});

// ========== Botão de voltar ao topo ==========
const backToTopBtn = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  backToTopBtn.style.display = window.scrollY > 300 ? "flex" : "none";
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
