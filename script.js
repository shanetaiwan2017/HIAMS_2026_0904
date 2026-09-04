(function () {
  const config = window.HANKEL_SITE || { images: {}, links: {} };

  document.querySelectorAll("[data-image]").forEach((image) => {
    const source = config.images[image.dataset.image];
    if (source) image.src = source;
  });

  document.querySelectorAll("[data-link]").forEach((link) => {
    const href = config.links[link.dataset.link];
    if (href) {
      link.href = href;
      if (href.startsWith("http")) link.target = "_blank";
    }
  });

  const menuButton = document.querySelector(".menu-button");
  const nav = document.querySelector(".nav-links");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    }));
  }

  const form = document.getElementById("admission-form");
  const status = document.getElementById("form-status");
  if (form && status) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const target = config.links.registration;
      if (target) {
        window.open(target, "_blank", "noopener");
      } else {
        status.hidden = false;
        status.focus();
      }
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
})();
