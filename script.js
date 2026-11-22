document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");

  function handleHeaderScroll() {
    header.classList.toggle("scrolled", window.scrollY > 50);
  }

  window.addEventListener("scroll", handleHeaderScroll);
  handleHeaderScroll();

  
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  function closeMenu() {
    navMenu.classList.remove("active");
    hamburger.classList.remove("active");
    document.body.classList.remove("menu-open");
  }

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    hamburger.classList.toggle("active");
    document.body.classList.toggle("menu-open");
  });

  // Keyboard support untuk hamburger (Enter / Spasi)
  hamburger.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      hamburger.click();
    }
  })

  navLinks.forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("click", (e) => {
    if (
      navMenu.classList.contains("active") &&
      !navMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = themeToggle.querySelector(".theme-icon");
  const savedTheme = localStorage.getItem("theme");

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    themeIcon.textContent = theme === "green" ? "⬛" : "🟩";
    themeToggle.title = theme === "green" ? "Mode Hitam" : "Mode Hijau";
    localStorage.setItem("theme", theme);
  }

  applyTheme(savedTheme === "green" ? "green" : "black");

  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    applyTheme(current === "green" ? "black" : "green");
  });

  const typedText = document.getElementById("typed-text");
  const roles = [
    "Web Developer",
    "Frontend Developer",
    "UI Enthusiast",
    "Problem Solver",
    "Lifelong Learner",
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typedText.textContent = currentRole.substring(0, --charIndex);
    } else {
      typedText.textContent = currentRole.substring(0, ++charIndex);
    }

    let delay = isDeleting ? 55 : 110;

    if (!isDeleting && charIndex === currentRole.length) {
      delay = 1600;       // jeda saat kalimat selesai
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 400;
    }

    setTimeout(typeEffect, delay);
  }

  if (typedText) typeEffect();

  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Beri jeda kecil antar elemen agar efeknya bergelombang
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, index * 90);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));


  const progressBars = document.querySelectorAll(".progress-bar");

  const progressObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          bar.style.width = bar.dataset.progress + "%";
          progressObserver.unobserve(bar);
        }
      });
    },
    { threshold: 0.5 }
  );

  progressBars.forEach((bar) => progressObserver.observe(bar));

  const sections = document.querySelectorAll("section[id]");

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === "#" + id);
          });
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  sections.forEach((section) => navObserver.observe(section));

  const form = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  function validateField(field) {
    const value = field.value.trim();
    const errorEl = field.parentElement.querySelector(".error-message");
    let message = "";

    if (!value) {
      message = "Kolom ini wajib diisi.";
    } else if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      message = "Format email tidak valid.";
    } else if (field.name === "message" && value.length < 10) {
      message = "Pesan minimal 10 karakter.";
    }

    errorEl.textContent = message;
    field.classList.toggle("invalid", message !== "");
    return message === "";
  }

  const fields = form.querySelectorAll("input, textarea");

  fields.forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      if (field.classList.contains("invalid")) validateField(field);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;
    fields.forEach((field) => {
      if (!validateField(field)) isValid = false;
    });

    if (!isValid) {
      formStatus.style.color = "#ef4444";
      formStatus.textContent = "Mohon periksa kembali kolom yang ditandai.";
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = "Mengirim...";

    setTimeout(() => {
      formStatus.style.color = "#22c55e";
      formStatus.textContent = "✅ Pesan berhasil dikirim! Terima kasih sudah menghubungi saya.";
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = "Kirim Pesan ✉️";
    }, 1000);
  });


  document.getElementById("year").textContent = new Date().getFullYear();
});