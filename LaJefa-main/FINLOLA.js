/* ============================================================
   Entre nosotros — Interacciones
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- 1. Barra de progreso de lectura ---------- */
  const progress = document.getElementById("progress");

  const updateProgress = () => {
    const doc = document.documentElement;
    const scrolled = doc.scrollTop;
    const height = doc.scrollHeight - doc.clientHeight;
    const pct = height > 0 ? (scrolled / height) * 100 : 0;
    progress.style.width = pct + "%";
  };

  /* ---------- 2. Botón volver arriba ---------- */
  const toTop = document.getElementById("toTop");

  toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const updateToTop = () => {
    toTop.classList.toggle("is-visible", window.scrollY > 500);
  };

  window.addEventListener("scroll", () => {
    updateProgress();
    updateToTop();
  }, { passive: true });

  updateProgress();
  updateToTop();

  /* ---------- 3. Revelar secciones al hacer scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- 4. Índice: sección activa ---------- */
  const tocLinks = document.querySelectorAll(".toc__list a");
  const sections = document.querySelectorAll(".section");

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          tocLinks.forEach((link) => {
            link.classList.toggle(
              "is-active",
              link.getAttribute("href") === "#" + entry.target.id
            );
          });
        }
      });
    }, { rootMargin: "-30% 0px -60% 0px" });

    sections.forEach((sec) => sectionObserver.observe(sec));
  }

  /* ---------- 5. Acordeón del ciclo ---------- */
  const cycleSteps = document.querySelectorAll(".cycle__step");

  cycleSteps.forEach((step) => {
    step.addEventListener("click", () => {
      const body = step.nextElementSibling;
      const isOpen = step.getAttribute("aria-expanded") === "true";

      // Cerrar los demás pasos (solo uno abierto a la vez)
      cycleSteps.forEach((other) => {
        if (other !== step) {
          other.setAttribute("aria-expanded", "false");
          other.nextElementSibling.style.maxHeight = null;
        }
      });

      step.setAttribute("aria-expanded", String(!isOpen));
      body.style.maxHeight = isOpen ? null : body.scrollHeight + "px";
    });
  });

  /* ---------- 6. Pestañas de escenarios ---------- */
  const tabs = document.querySelectorAll(".tab");
  const panels = document.querySelectorAll(".panel");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;

      tabs.forEach((t) => {
        t.classList.toggle("is-active", t === tab);
        t.setAttribute("aria-selected", String(t === tab));
      });

      panels.forEach((panel) => {
        panel.classList.toggle("is-active", panel.dataset.panel === target);
      });
    });
  });

  /* ---------- 7. Tarjetas del veredicto (voltear) ---------- */
  const verdictCards = document.querySelectorAll(".verdict__card");

  verdictCards.forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("is-flipped");
    });
  });

  /* ---------- 8. Clic en el índice = scroll suave ---------- */
  tocLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

});
