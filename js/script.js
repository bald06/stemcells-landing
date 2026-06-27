/* script.js - Animaciones Avanzadas e Interactividad Premium */

// Registrar GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 1. Lógica de Entrada del Hero (Sin Preloader)
document.addEventListener("DOMContentLoaded", () => {
  // Iniciar Timeline de Entrada del Hero inmediatamente
  startHeroEntrance();
});

function startHeroEntrance() {
  const heroTl = gsap.timeline();

  // 1. Revelar indicador de Scroll
  heroTl.call(() => {
    const scrollIndicator = document.getElementById("hero-scroll-indicator");
    if (scrollIndicator) scrollIndicator.classList.add("visible");
  });

  // 2. Revelar textos y botones del Hero con un stagger premium
  heroTl.fromTo(".hero-content .hero-logo",
    { opacity: 0, scale: 0.92 },
    { opacity: 1, scale: 1, duration: 0.9, ease: "power3.out" }
  )
    .fromTo(".hero-content .section-tag",
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" },
      "-=0.5"
    )
    .fromTo(".hero-content .hero-title",
      { opacity: 0, y: 45 },
      { opacity: 1, y: 0, duration: 1.0, ease: "power4.out" },
      "-=0.4"
    )
    .fromTo(".hero-content .hero-desc",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.8"
    )
    .fromTo(".hero-content .hero-btns .btn",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out" },
      "-=0.6"
    );
}

// 2. Control de Navbar al Scroll
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// 3. Menú Móvil Hamburguesa
const mobileToggle = document.getElementById("mobile-toggle");
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-links a");

if (mobileToggle) {
  mobileToggle.addEventListener("click", () => {
    navbar.classList.toggle("mobile-active");
  });
}

// Cerrar menú al hacer clic en un enlace
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navbar.classList.contains("mobile-active")) {
      navbar.classList.remove("mobile-active");
    }
  });
});

// 4. Secciones Interactivas

// 4B. Animación de Revelado de Texto palabra por palabra al Scroll (Nuestra Filosofía)
const textReveal = document.getElementById("philosophy-text");
if (textReveal) {
  const words = textReveal.innerText.split(" ");
  textReveal.innerHTML = words
    .map((word) => `<span class="reveal-word">${word}</span>`)
    .join(" ");

  const revealSpans = textReveal.querySelectorAll(".reveal-word");

  gsap.to(revealSpans, {
    scrollTrigger: {
      trigger: ".philosophy-section",
      start: "top 75%",
      end: "bottom 40%",
      scrub: 0.8,
    },
    color: "#2e3231", // var(--secondary)
    stagger: 0.15,
    ease: "none",
  });

  // Revelar el botón CTA de abajo suavemente
  gsap.fromTo(
    ".philosophy-cta-wrapper",
    { opacity: 0, y: 15 },
    {
      scrollTrigger: {
        trigger: ".philosophy-section",
        start: "bottom 70%",
        toggleActions: "play none none none",
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    },
  );
}

// 4C. Entrada de Tarjetas Escalonadas de Servicios
gsap.from(".service-stagger-card", {
  scrollTrigger: {
    trigger: ".services-staggered-grid",
    start: "top 80%",
    toggleActions: "play none none none",
  },
  y: 100,
  opacity: 0,
  duration: 1.2,
  stagger: 0.25,
  ease: "power4.out",
});

// 5. Acordeón Interactivo de FAQs
const faqHeaders = document.querySelectorAll(".faq-header");

faqHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    const item = header.parentElement;
    const body = item.querySelector(".faq-body");
    const isActive = item.classList.contains("active");

    // Cerrar todos los acordeones activos
    document.querySelectorAll(".faq-item.active").forEach((activeItem) => {
      const activeBody = activeItem.querySelector(".faq-body");
      activeItem.classList.remove("active");
      gsap.to(activeBody, {
        maxHeight: 0,
        duration: 0.5,
        ease: "power3.inOut",
      });
    });

    // Si el elemento cliqueado no estaba activo, abrirlo
    if (!isActive) {
      item.classList.add("active");
      // Medir la altura real del contenido para una transición perfecta
      gsap.to(body, {
        maxHeight: body.scrollHeight,
        duration: 0.6,
        ease: "power3.out",
      });
    }
  });
});

// 6. Animaciones al hacer Scroll (ScrollTrigger)

// A) Títulos de Sección (Fade In Up)
const scrollHeaders = document.querySelectorAll(".section-header, .about-text");
scrollHeaders.forEach((elem) => {
  gsap.from(elem, {
    scrollTrigger: {
      trigger: elem,
      start: "top 85%",
      toggleActions: "play none none none",
    },
    y: 40,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });
});

// B) Auto-incremento numérico de Estadísticas (Counter)
const statNumbers = document.querySelectorAll(".stat-number");
statNumbers.forEach((stat) => {
  const targetValue = parseInt(stat.getAttribute("data-target"), 10);

  gsap.from(stat, {
    scrollTrigger: {
      trigger: stat,
      start: "top 90%",
      toggleActions: "play none none none",
    },
    duration: 2.5,
    innerText: 0,
    snap: { innerText: 1 },
    ease: "power3.out",
    // Formato para añadir el símbolo + o % según corresponda
    onUpdate: function () {
      if (targetValue === 10) {
        stat.innerHTML = `+${Math.floor(stat.innerText)}`;
      } else if (targetValue === 100) {
        stat.innerHTML = `${Math.floor(stat.innerText)}%`;
      }
    },
  });
});

// C) Sección Carlos Miramontes (Revelado asimétrico)
gsap.from(".carlos-image", {
  scrollTrigger: {
    trigger: ".carlos-section",
    start: "top 80%",
    toggleActions: "play none none none",
  },
  x: -80,
  opacity: 0,
  duration: 1.4,
  ease: "power4.out",
});

gsap.from(".carlos-text", {
  scrollTrigger: {
    trigger: ".carlos-section",
    start: "top 80%",
    toggleActions: "play none none none",
  },
  x: 80,
  opacity: 0,
  duration: 1.4,
  ease: "power4.out",
});

// D) Sección Productos Cosméticos
gsap.from(".products-image", {
  scrollTrigger: {
    trigger: ".products-section",
    start: "top 80%",
    toggleActions: "play none none none",
  },
  scale: 0.95,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out",
});

gsap.from(".products-text", {
  scrollTrigger: {
    trigger: ".products-section",
    start: "top 80%",
    toggleActions: "play none none none",
  },
  y: 30,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out",
});

// E) Sección de Contacto y Formulario (Rediseñada)
gsap.from(".contact-header-gsap", {
  scrollTrigger: {
    trigger: ".contact-section",
    start: "top 85%",
    toggleActions: "play none none none",
  },
  y: 40,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
});

gsap.from(".contact-form-gsap", {
  scrollTrigger: {
    trigger: ".contact-section",
    start: "top bottom",
    toggleActions: "play none none none",
  },
  x: -50,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out",
});

gsap.from(".contact-map-gsap", {
  scrollTrigger: {
    trigger: ".contact-section",
    start: "top bottom",
    toggleActions: "play none none none",
  },
  x: 50,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out",
});

// Formulario de Reserva: Animación de envío simulado
const bookingForm = document.getElementById("booking-form");
const btnSubmit = document.getElementById("btn-submit");

if (bookingForm) {
  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Cambiar estado del botón
    btnSubmit.textContent = "Enviando Solicitud...";
    btnSubmit.disabled = true;

    // Simular retardo de red
    setTimeout(() => {
      btnSubmit.textContent = "¡Solicitud Enviada con Éxito!";
      btnSubmit.style.backgroundColor = "#5a7b70"; // Verde salvia oscuro de éxito

      // Restablecer después de unos segundos
      setTimeout(() => {
        bookingForm.reset();
        btnSubmit.textContent = "Enviar Solicitud";
        btnSubmit.disabled = false;
        btnSubmit.style.backgroundColor = "";
      }, 3000);
    }, 1500);
  });
}

// G) Parallax y movimiento de las Células Orgánicas Flotantes
gsap.to(".floating-cell-1", {
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: 1.5,
  },
  y: 1600, // Se mueve hacia abajo
  x: -180, // Se desplaza horizontalmente a la izquierda
  scale: 0.8,
  ease: "none",
});

gsap.to(".floating-cell-2", {
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: 2,
  },
  y: 1900, // Se mueve hacia abajo con ritmo diferente
  x: 200, // Se desplaza a la derecha
  scale: 1.2,
  ease: "none",
});

// H) Efecto 3D Tilt e Inclinación Dinámica sobre Tarjetas de Servicios
const serviceCards = document.querySelectorAll(".service-stagger-card");

// Helper para obtener el escalonamiento original de cada tarjeta en base a su clase
function getStaggerY(card) {
  if (card.classList.contains("card-stagger-2")) return 60;
  if (card.classList.contains("card-stagger-3")) return 30;
  if (card.classList.contains("card-stagger-4")) return 90;
  return 0;
}

serviceCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    // Si la tarjeta está volteada, desactivar el efecto Tilt
    if (card.classList.contains("is-flipped")) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // posición X del cursor dentro del elemento
    const y = e.clientY - rect.top; // posición Y del cursor dentro del elemento

    const xc = rect.width / 2;
    const yc = rect.height / 2;

    // Calcular la distancia relativa desde el centro (-1 a 1)
    const dx = (x - xc) / xc;
    const dy = (y - yc) / yc;

    // Calcular la inclinación en grados (máximo 12 grados de rotación)
    const rotX = -dy * 12;
    const rotY = dx * 12;

    const staggerY = getStaggerY(card);

    // Aplicar transformación 3D ultra suave con GSAP preservando la altura de stagger
    gsap.to(card, {
      rotationX: rotX,
      rotationY: rotY,
      y: staggerY - 18, // Se eleva ligeramente
      scale: 1.03, // Aumenta su tamaño suavemente
      transformPerspective: 1000,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });
  });

  card.addEventListener("mouseleave", () => {
    // Si la tarjeta está volteada, mantener su estado volteado y no restablecer
    if (card.classList.contains("is-flipped")) return;

    const staggerY = getStaggerY(card);

    // Restablecer posición y rotación original de forma fluida regresando a su stagger
    gsap.to(card, {
      rotationX: 0,
      rotationY: 0,
      y: staggerY,
      scale: 1,
      duration: 0.7,
      ease: "power3.out",
      overwrite: "auto",
    });
  });
});

// I) Interactividad de Giro 3D y Expansión al hacer Clic en Tarjetas de Servicios
serviceCards.forEach((card) => {
  const container = card.closest(".service-card-container");
  const closeBtn = card.querySelector(".close-card-btn");
  const ctaBtn = card.querySelector(".card-cta-btn");

  // Al hacer clic en la tarjeta
  card.addEventListener("click", (e) => {
    // Si el clic fue en el botón de cerrar o en el botón CTA, se manejan en sus propios listeners
    if (e.target.closest(".close-card-btn") || e.target.closest(".card-cta-btn")) return;

    // Si ya está volteada, no hacer nada para permitir clics e interactuar con el reverso
    if (card.classList.contains("is-flipped")) return;

    // Primero, cerrar cualquier otra tarjeta de servicio que esté volteada/abierta
    document.querySelectorAll(".service-stagger-card.is-flipped").forEach((openCard) => {
      const openContainer = openCard.closest(".service-card-container");
      openCard.classList.remove("is-flipped");
      if (openContainer) openContainer.classList.remove("is-expanded");

      const openStaggerY = getStaggerY(openCard);

      gsap.to(openCard, {
        rotationY: 0,
        rotationX: 0,
        y: openStaggerY,
        scale: 1,
        duration: 0.7,
        ease: "power3.out",
        overwrite: "auto",
        onComplete: () => {
          // Limpiar propiedades en línea de GSAP al terminar para retornar limpiamente al CSS original
          if (!openCard.classList.contains("is-flipped")) {
            gsap.set(openCard, { clearProps: "transform,scale" });
          }
        }
      });
    });

    // Activar el estado de giro y expansión en la tarjeta seleccionada
    card.classList.add("is-flipped");
    if (container) container.classList.add("is-expanded");

    const staggerY = getStaggerY(card);

    // Animar la rotación e incremento de escala, manteniendo su staggerY para evitar saltos verticales
    gsap.to(card, {
      rotationY: 180,
      rotationX: 0,
      y: staggerY,
      scale: 1.05,
      duration: 0.8,
      ease: "back.out(1.2)",
      overwrite: "auto"
    });
  });

  // Al hacer clic en el botón de cerrar de la cara trasera
  if (closeBtn) {
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Evitar que el clic se propague al contenedor de la tarjeta

      card.classList.remove("is-flipped");
      if (container) container.classList.remove("is-expanded");

      const staggerY = getStaggerY(card);

      // Regresar al estado inicial frontal con su escalonamiento respectivo
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        y: staggerY,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        overwrite: "auto",
        onComplete: () => {
          // Limpiar propiedades en línea de GSAP al terminar para retornar limpiamente al CSS original
          if (!card.classList.contains("is-flipped")) {
            gsap.set(card, { clearProps: "transform,scale" });
          }
        }
      });
    });
  }

  // Integración con el formulario al hacer clic en "Agendar Valoración"
  if (ctaBtn) {
    ctaBtn.addEventListener("click", (e) => {
      // Detener propagación para evitar disparar otros eventos
      e.stopPropagation();

      const serviceValue = ctaBtn.getAttribute("data-service");
      const treatmentSelect = document.getElementById("form-treatment");

      // Preseleccionar el tratamiento respectivo en el dropdown del formulario
      if (treatmentSelect && serviceValue) {
        treatmentSelect.value = serviceValue;
      }
    });
  }
});

/* ==========================================================================
   NUEVAS ANIMACIONES PREMIUM (Scroll Progress, Magnetic Buttons, Glow y Parallax)
   ========================================================================== */

// 1. Barra de progreso de lectura (Scroll Progress Bar)
gsap.to("#scroll-progress", {
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: 0.1,
  },
  width: "100%",
  ease: "none",
});

// 2. Efecto Magnético para Botones Premium (.btn)
const premiumButtons = document.querySelectorAll(".btn, .whatsapp-float");
premiumButtons.forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    // Coordenadas locales desde el centro del botón
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Atracción magnética sutil (30% de la distancia del cursor)
    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  });

  btn.addEventListener("mouseleave", () => {
    // Retorno elástico de alta calidad
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1.1, 0.4)",
      overwrite: "auto",
    });
  });
});

// 3. Efecto de Brillo de Cursor Spotlight Glow
const glowElements = document.querySelectorAll(
  ".stat-card, .contact-form-container, .compact-card-link, .product-catalog-card",
);
glowElements.forEach((elem) => {
  elem.addEventListener("mousemove", (e) => {
    const rect = elem.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    elem.style.setProperty("--glow-x", `${x}px`);
    elem.style.setProperty("--glow-y", `${y}px`);
  });
});

// 4. Paralaje Suave al Scroll en Imágenes Principales
gsap.fromTo(
  ".carlos-image img",
  { yPercent: -8, scale: 1.1 },
  {
    scrollTrigger: {
      trigger: ".carlos-section",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
    yPercent: 8,
    ease: "none",
  },
);

gsap.fromTo(
  ".products-image img",
  { yPercent: -6, scale: 1.05 },
  {
    scrollTrigger: {
      trigger: ".products-section",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
    yPercent: 6,
    ease: "none",
  },
);

// 5. Parallax por Movimiento del Cursor para Células Flotantes
window.addEventListener("mousemove", (e) => {
  // Calcular el porcentaje de movimiento respecto al centro de la pantalla
  const percentX = (e.clientX / window.innerWidth - 0.5) * 25; // max 12.5px
  const percentY = (e.clientY / window.innerHeight - 0.5) * 25; // max 12.5px

  gsap.to(".floating-cell-1", {
    xPercent: percentX,
    yPercent: percentY,
    duration: 1.5,
    ease: "power2.out",
    overwrite: "auto",
  });

  gsap.to(".floating-cell-2", {
    xPercent: -percentX * 1.6, // Dirección opuesta para sensación de profundidad
    yPercent: -percentY * 1.6,
    duration: 1.8,
    ease: "power2.out",
    overwrite: "auto",
  });
});

// 6. Entrada de Tarjetas del Catálogo de Productos (ScrollTrigger Stagger)
gsap.from(".product-card-gsap", {
  scrollTrigger: {
    trigger: ".products-catalog-grid",
    start: "top 85%",
    toggleActions: "play none none none",
  },
  y: 60,
  opacity: 0,
  duration: 1.2,
  stagger: 0.08, // Acelerado un poco para dar mejor fluidez con ~30 productos
  ease: "power3.out",
});

// ==========================================================================
// NUEVO SISTEMA DE FILTRADO, BÚSQUEDA E INTERACTIVIDAD DE PRODUCTOS IA
// ==========================================================================

const productSearchInput = document.getElementById("product-search");
const searchClearBtn = document.getElementById("search-clear-btn");
const productFilterBtns = document.querySelectorAll(".filter-btn");
const catalogProductCards = document.querySelectorAll(".product-catalog-card");

let currentProductPage = 1;
const productsPerPage = 8; // Muestra exactamente las 2 primeras líneas de 4 y 4

// Lógica de filtrado y búsqueda concurrente con paginación
function filterAndSearchProducts(resetPage = true) {
  if (resetPage) {
    currentProductPage = 1;
  }

  const query = productSearchInput.value.toLowerCase().trim();
  const activeFilterBtn = document.querySelector(".filter-btn.active");
  const currentFilter = activeFilterBtn ? activeFilterBtn.getAttribute("data-filter") : "all";

  // Mostrar u ocultar botón de limpiar búsqueda
  if (query.length > 0) {
    searchClearBtn.style.display = "flex";
  } else {
    searchClearBtn.style.display = "none";
  }

  const matchingCards = [];
  const cardsToHide = [];

  catalogProductCards.forEach(card => {
    const category = card.getAttribute("data-category");
    const title = card.querySelector("h4").textContent.toLowerCase();
    const desc = card.querySelector("p").textContent.toLowerCase();
    const badge = card.querySelector(".product-card-badge").textContent.toLowerCase();

    const matchesFilter = currentFilter === "all" || category === currentFilter;
    const matchesSearch = title.includes(query) || desc.includes(query) || badge.includes(query);

    if (matchesFilter && matchesSearch) {
      matchingCards.push(card);
    } else {
      cardsToHide.push(card);
    }
  });

  // Calcular paginación
  const totalMatching = matchingCards.length;
  const totalPages = Math.ceil(totalMatching / productsPerPage) || 1;

  // Ajustar página actual si excede los límites
  if (currentProductPage > totalPages) {
    currentProductPage = totalPages;
  }
  if (currentProductPage < 1) {
    currentProductPage = 1;
  }

  // Dividir tarjetas coincidentes entre visibles e invisibles por página
  const cardsToShow = [];
  const startIndex = (currentProductPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  matchingCards.forEach((card, index) => {
    if (index >= startIndex && index < endIndex) {
      cardsToShow.push(card);
    } else {
      cardsToHide.push(card);
    }
  });

  // Actualizar indicadores visuales de paginación
  const pageIndicator = document.getElementById("page-indicator");
  const prevBtn = document.getElementById("prev-page-btn");
  const nextBtn = document.getElementById("next-page-btn");
  const paginationControls = document.querySelector(".products-pagination");

  if (pageIndicator) {
    pageIndicator.textContent = `Página ${currentProductPage} de ${totalPages}`;
  }

  if (prevBtn) {
    prevBtn.disabled = currentProductPage === 1;
  }

  if (nextBtn) {
    nextBtn.disabled = currentProductPage === totalPages;
  }

  // Ocultar paginador si no se supera el máximo por página
  if (paginationControls) {
    if (totalMatching <= productsPerPage) {
      paginationControls.style.display = "none";
    } else {
      paginationControls.style.display = "flex";
    }
  }

  // Animación de salida para tarjetas no deseadas
  if (cardsToHide.length > 0) {
    gsap.to(cardsToHide, {
      opacity: 0,
      scale: 0.85,
      y: 15,
      duration: 0.25,
      stagger: 0.005,
      ease: "power2.in",
      overwrite: "auto",
      onComplete: () => {
        cardsToHide.forEach(card => {
          card.style.display = "none";
        });
      }
    });
  }

  // Animación de entrada para tarjetas de la página actual
  if (cardsToShow.length > 0) {
    cardsToShow.forEach(card => {
      card.style.display = "flex";
    });

    gsap.fromTo(
      cardsToShow,
      { opacity: 0, scale: 0.85, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.03,
        ease: "power3.out",
        overwrite: "auto",
        clearProps: "transform,opacity"
      }
    );
  }
}

// Eventos de botones de filtrado
productFilterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    productFilterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    filterAndSearchProducts(true);
  });
});

// Eventos de barra de búsqueda
if (productSearchInput) {
  productSearchInput.addEventListener("input", () => {
    filterAndSearchProducts(true);
  });
}

// Evento de botón limpiar búsqueda
if (searchClearBtn) {
  searchClearBtn.addEventListener("click", () => {
    productSearchInput.value = "";
    filterAndSearchProducts(true);
    productSearchInput.focus();
  });
}

// Eventos de navegación de paginación
const prevPageBtn = document.getElementById("prev-page-btn");
const nextPageBtn = document.getElementById("next-page-btn");

if (prevPageBtn) {
  prevPageBtn.addEventListener("click", () => {
    if (currentProductPage > 1) {
      currentProductPage--;
      filterAndSearchProducts(false); // No resetear página al navegar
      const catalogHeader = document.querySelector(".products-catalog-header");
      if (catalogHeader) {
        catalogHeader.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
}

if (nextPageBtn) {
  nextPageBtn.addEventListener("click", () => {
    const activeFilterBtn = document.querySelector(".filter-btn.active");
    const currentFilter = activeFilterBtn ? activeFilterBtn.getAttribute("data-filter") : "all";
    const query = productSearchInput.value.toLowerCase().trim();

    let totalMatching = 0;
    catalogProductCards.forEach(card => {
      const category = card.getAttribute("data-category");
      const title = card.querySelector("h4").textContent.toLowerCase();
      const desc = card.querySelector("p").textContent.toLowerCase();
      const badge = card.querySelector(".product-card-badge").textContent.toLowerCase();

      const matchesFilter = currentFilter === "all" || category === currentFilter;
      const matchesSearch = title.includes(query) || desc.includes(query) || badge.includes(query);

      if (matchesFilter && matchesSearch) {
        totalMatching++;
      }
    });

    const totalPages = Math.ceil(totalMatching / productsPerPage) || 1;

    if (currentProductPage < totalPages) {
      currentProductPage++;
      filterAndSearchProducts(false); // No resetear página al navegar
      const catalogHeader = document.querySelector(".products-catalog-header");
      if (catalogHeader) {
        catalogHeader.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
}

// Inicializar estado del catálogo en la carga del DOM
document.addEventListener("DOMContentLoaded", () => {
  filterAndSearchProducts(true);
});

// Llamada inmediata por seguridad ante carga asíncrona
filterAndSearchProducts(true);

// Lógica de "Solicitar" contextual del catálogo
const productSolicitarBtns = document.querySelectorAll(".product-card-btn");
productSolicitarBtns.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const productName = btn.getAttribute("data-product");
    const treatmentSelect = document.getElementById("form-treatment");
    const formMessageInput = document.getElementById("form-message");
    const contactSection = document.getElementById("contact");

    if (productName) {
      const card = btn.closest(".product-catalog-card");
      const category = card ? card.getAttribute("data-category") : "all";

      // 1. Auto-seleccionar tratamiento en base a la categoría del producto
      if (treatmentSelect) {
        if (category === "cosmeticos") {
          treatmentSelect.value = "estetica";
        } else if (category === "suplementos") {
          treatmentSelect.value = "general";
        } else if (category === "regenerativa") {
          treatmentSelect.value = "celulas";
          if (productName.toLowerCase().includes("exosomas")) {
            treatmentSelect.value = "exosomas";
          }
        }
      }

      // 2. Pre-rellenar mensaje personalizado
      if (formMessageInput) {
        formMessageInput.value = `Hola, me interesa agendar una valoración médica y recibir más información detallada sobre el producto: "${productName}".`;
      }

      // 3. Actualizar dinámicamente el botón de WhatsApp con el producto de interés
      const whatsappFloat = document.querySelector(".whatsapp-float");
      if (whatsappFloat) {
        const textEncoded = encodeURIComponent(`Hola, me gustaría recibir más información y adquirir el producto: "${productName}" de STEMCELLS.`);
        whatsappFloat.href = `https://wa.me/525512345678?text=${textEncoded}`;

        // Mostrar tooltip de WhatsApp por un momento con foco de interés
        const tooltip = whatsappFloat.querySelector(".whatsapp-tooltip");
        if (tooltip) {
          tooltip.textContent = `Preguntar por "${productName}" 💬`;
          tooltip.style.opacity = "1";
          tooltip.style.transform = "translateY(-50%) translateX(0)";
          setTimeout(() => {
            tooltip.style.opacity = "";
            tooltip.style.transform = "";
            tooltip.textContent = "Chat en Vivo 💬";
          }, 6000);
        }
      }
    }

    // 4. Desplazamiento suave al formulario
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* ==========================================================================
   SISTEMA DE PARTÍCULAS BIOLÓGICAS INTERACTIVAS (Canvas Stem Cells & Exosomes)
   ========================================================================== */

class Particle {
  constructor(width, height, type, primaryColor, accentColor) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.35; // Muy lento y majestuoso
    this.vy = (Math.random() - 0.5) * 0.35;
    this.type = type; // 'cell' o 'exosome'

    this.primaryColor = primaryColor;
    this.accentColor = accentColor;

    if (this.type === 'cell') {
      this.baseRadius = Math.random() * 8 + 6; // 6px a 14px
      this.color = Math.random() > 0.3 ? this.primaryColor : this.accentColor;
      this.hasNucleus = Math.random() > 0.15;
      this.nucleusRatio = Math.random() * 0.2 + 0.25; // Tamaño del núcleo respecto a la célula
    } else {
      this.baseRadius = Math.random() * 2 + 1.5; // 1.5px a 3.5px
      this.color = this.accentColor; // Exosomas en tono oro sutil
    }

    this.radius = this.baseRadius;
    this.pulseSpeed = Math.random() * 0.02 + 0.01;
    this.pulseTime = Math.random() * Math.PI * 2;
  }

  draw(ctx) {
    ctx.save();

    // Pulsación sinusoidal sutil de tamaño
    this.pulseTime += this.pulseSpeed;
    const pulseFactor = 1 + Math.sin(this.pulseTime) * 0.08;
    this.radius = this.baseRadius * pulseFactor;

    if (this.type === 'cell') {
      // Brillo exterior de la célula madre
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;

      // Membrana celular con relleno semitranslúcido
      ctx.fillStyle = hexToRgba(this.color, 0.03);
      ctx.strokeStyle = hexToRgba(this.color, 0.15);
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Núcleo brillante central de la célula madre
      if (this.hasNucleus) {
        ctx.shadowBlur = 15;
        ctx.fillStyle = hexToRgba(this.color, 0.25);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * this.nucleusRatio, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      // Exosoma (pequeño punto de alta energía y brillo)
      ctx.shadowBlur = 6;
      ctx.shadowColor = this.color;
      ctx.fillStyle = hexToRgba(this.color, 0.4);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  update(width, height, mouse) {
    // Movimiento de deriva continuo
    this.x += this.vx;
    this.y += this.vy;

    // Envoltura infinita alrededor de la pantalla con margen
    const pad = 20;
    if (this.x < -pad) this.x = width + pad;
    else if (this.x > width + pad) this.x = -pad;

    if (this.y < -pad) this.y = height + pad;
    else if (this.y > height + pad) this.y = -pad;

    // Interacción con el cursor: repulsión física suave y orgánica
    if (mouse.x !== null && mouse.y !== null) {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius; // Fuerza proporcional a cercanía
        const angle = Math.atan2(dy, dx);

        // Empujar suavemente la partícula en dirección opuesta al cursor
        const pushX = Math.cos(angle) * force * 0.7;
        const pushY = Math.sin(angle) * force * 0.7;

        this.x += pushX;
        this.y += pushY;
      }
    }
  }
}

class CellularCanvas {
  constructor(canvasId, containerClass) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.container = this.canvas.closest(containerClass);
    this.particles = [];
    this.maxParticles = 30; // Densidad ideal para alto rendimiento y gran diseño
    this.mouse = { x: null, y: null, radius: 160 };

    this.init();
    this.animate();
    this.setupEvents();
  }

  init() {
    this.resize();
    this.particles = [];

    // Extraer dinámicamente las variables de color CSS para adaptarse a cambios de paleta
    this.primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#008dcd';
    this.accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#c5a85c';

    for (let i = 0; i < this.maxParticles; i++) {
      const type = Math.random() > 0.45 ? 'cell' : 'exosome';
      this.particles.push(new Particle(this.canvas.width, this.canvas.height, type, this.primaryColor, this.accentColor));
    }
  }

  resize() {
    if (!this.container) return;
    const rect = this.container.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
  }

  setupEvents() {
    // Registrar el movimiento del mouse sobre el contenedor
    if (this.container) {
      this.container.addEventListener('mousemove', (e) => {
        const rect = this.container.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
      });

      this.container.addEventListener('mouseleave', () => {
        this.mouse.x = null;
        this.mouse.y = null;
      });
    }

    // Redimensionamiento responsivo dinámico optimizado con debouncing
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.resize();
        // Re-distribuir partículas suavemente en el nuevo ancho y alto
        this.particles.forEach(p => {
          p.x = Math.random() * this.canvas.width;
          p.y = Math.random() * this.canvas.height;
        });
      }, 250);
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Dibujar y actualizar partículas
    this.particles.forEach(p => {
      p.update(this.canvas.width, this.canvas.height, this.mouse);
      p.draw(this.ctx);
    });

    // Dibujar enlaces tenues intercelulares (comunicación biológica)
    this.drawConnections();

    requestAnimationFrame(() => this.animate());
  }

  drawConnections() {
    const len = this.particles.length;
    for (let i = 0; i < len; i++) {
      for (let j = i + 1; j < len; j++) {
        const p1 = this.particles[i];
        const p2 = this.particles[j];

        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Conectar sólo si están lo suficientemente cerca
        if (dist < 130) {
          const alpha = (1 - dist / 130) * 0.05; // Opacidad basada en cercanía
          this.ctx.save();
          this.ctx.globalAlpha = alpha;
          this.ctx.lineWidth = 0.5;
          // Utilizar el color del nodo de tipo célula como prioritario
          this.ctx.strokeStyle = p1.type === 'cell' ? this.primaryColor : this.accentColor;
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
          this.ctx.restore();
        }
      }
    }
  }
}

// Convertidor auxiliar de Hexadecimal a RGBA para transparencias exactas en Canvas
function hexToRgba(hex, alpha) {
  if (hex.startsWith('rgba') || hex.startsWith('rgb')) {
    return hex;
  }
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  }
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Inicializar Canvas de Partículas Biológicas para Hero y Contacto al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
  // Nota: El canvas del Hero ahora es inicializado y controlado de forma óptima a través del ciclo de vida del Swiper Slider.
  new CellularCanvas("contact-canvas", ".contact-section");
});

/* ==========================================================================
   CONFIGURACIÓN E INTERACTIVIDAD DE HÉROE ESTÁTICO & PARALLAX
   ========================================================================== */

// Efecto Parallax en Células Flotantes al Scroll con inercia GSAP
document.addEventListener("DOMContentLoaded", () => {
  const parallaxCells = document.querySelectorAll(".parallax-cell-container");
  if (parallaxCells.length > 0) {
    parallaxCells.forEach((cell) => {
      const speed = parseFloat(cell.getAttribute("data-speed")) || 1.0;

      // Aplicar movimiento de deslizamiento Y coordinado con el scroll
      gsap.to(cell, {
        y: () => -180 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: cell.closest("section"),
          start: "top bottom", // Inicia la animación al asomar el contenedor
          end: "bottom top",   // Finaliza al salir del viewport por arriba
          scrub: 0.5,          // Inercia de medio segundo para efecto elástico
        }
      });
    });
  }
});
