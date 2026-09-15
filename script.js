(() => {
  const WEDDING = new Date("2027-03-27T15:00:00+02:00");
  const RSVP_URL =
    "https://docs.google.com/forms/d/1dcCrQzi0r20UjTprcxyaFdeUMphUO71Bp8yxMEXtJIA/viewform";

  document.querySelectorAll('a[href*="docs.google.com/forms"]').forEach((a) => {
    a.href = RSVP_URL;
  });

  const nums = {
    days: document.querySelector('[data-unit="days"]'),
    hours: document.querySelector('[data-unit="hours"]'),
    mins: document.querySelector('[data-unit="mins"]'),
    secs: document.querySelector('[data-unit="secs"]'),
  };

  function tick() {
    const now = Date.now();
    let diff = Math.max(0, WEDDING.getTime() - now);
    const days = Math.floor(diff / 86400000);
    diff -= days * 86400000;
    const hours = Math.floor(diff / 3600000);
    diff -= hours * 3600000;
    const mins = Math.floor(diff / 60000);
    diff -= mins * 60000;
    const secs = Math.floor(diff / 1000);

    if (nums.days) nums.days.textContent = String(days);
    if (nums.hours) nums.hours.textContent = String(hours).padStart(2, "0");
    if (nums.mins) nums.mins.textContent = String(mins).padStart(2, "0");
    if (nums.secs) nums.secs.textContent = String(secs).padStart(2, "0");
  }

  tick();
  setInterval(tick, 1000);

  const topBar = document.querySelector(".top-bar");
  const onScroll = () => {
    if (!topBar) return;
    topBar.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const toggle = document.querySelector(".nav-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  if (toggle && mobileNav) {
    toggle.addEventListener("click", () => {
      const open = mobileNav.hasAttribute("hidden");
      if (open) mobileNav.removeAttribute("hidden");
      else mobileNav.setAttribute("hidden", "");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.setAttribute("hidden", "");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const value = btn.getAttribute("data-copy") || "";
      try {
        await navigator.clipboard.writeText(value);
        btn.textContent = "Copied";
        btn.classList.add("is-copied");
        setTimeout(() => {
          btn.textContent = "Copy";
          btn.classList.remove("is-copied");
        }, 1600);
      } catch {
        btn.textContent = "Select & copy";
      }
    });
  });
})();
