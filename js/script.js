//==================================
// GALERÍAS
//==================================

const galerias = {
    bodas: 7,
    documental: 4,
    eventos: 11,
    exposiciones: 2,
    moda: [
        "moda1.jpg", "moda2.jpg", "moda3.jpg", "moda4.jpg", "moda5.jpg",
        "moda6.jpg", "moda7.jpg", "moda8.jpg", "moda9.jpg", "moda10.jpg",
        "moda11.jpg", "moda12.jpg", "moda13.jpg", "moda14.jpg", "moda15.jpg",
        "moda16.jpg", "moda17.jpg", "moda18.jpg", "moda19.jpg", "moda20.jpg",
        "Lua-2.jpg", "Lua-10.jpg", "Lua-19.jpg", "moda-28.jpg"
    ],
    parejas: 4,
    video: 1
};

function obtenerArchivos(categoria) {
    const galeria = galerias[categoria];

    if (Array.isArray(galeria)) {
        return galeria;
    }

    return Array.from(
        { length: galeria },
        (_, i) => `${categoria}${i + 1}.jpg`
    );
}

//==================================
// NAVBAR
//==================================

const navbar = document.querySelector(".navbar");
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = navMenu.querySelectorAll("a");

let scrollTicking = false;

window.addEventListener("scroll", () => {
    if (scrollTicking) return;

    scrollTicking = true;

    requestAnimationFrame(() => {
        navbar.classList.toggle("scrolled", window.scrollY > 80);
        scrollTicking = false;
    });
}, { passive: true });

function cerrarMenu() {
    navbar.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    document.body.style.overflow = "";
}

function abrirMenu() {
    navbar.classList.add("menu-open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Cerrar menú");
    document.body.style.overflow = "hidden";
}

menuToggle.addEventListener("click", () => {
    if (navbar.classList.contains("menu-open")) {
        cerrarMenu();
    } else {
        abrirMenu();
    }
});

navLinks.forEach((link) => {
    link.addEventListener("click", cerrarMenu);
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navbar.classList.contains("menu-open")) {
        cerrarMenu();
        menuToggle.focus();
    }
});

//==================================
// LIGHTBOX
//==================================

const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const btnCerrar = document.querySelector(".cerrar");
const btnAnterior = document.querySelector(".anterior");
const btnSiguiente = document.querySelector(".siguiente");
const contador = document.querySelector(".contador");
const tarjetas = document.querySelectorAll(".portfolio-card");
const lightboxFocusables = [btnCerrar, btnAnterior, btnSiguiente];

let categoriaActual = "";
let archivos = [];
let imagenActual = 0;
let tarjetaActiva = null;
let touchStartX = 0;

function precargarAdyacentes() {
    if (archivos.length < 2) return;

    const indices = [
        (imagenActual + 1) % archivos.length,
        (imagenActual - 1 + archivos.length) % archivos.length
    ];

    indices.forEach((index) => {
        const img = new Image();
        img.src = `assets/gallery/${categoriaActual}/${archivos[index]}`;
    });
}

function mostrarImagen() {
    const archivo = archivos[imagenActual];
    lightboxImg.src = `assets/gallery/${categoriaActual}/${archivo}`;
    lightboxImg.alt = `Imagen ${imagenActual + 1} de ${archivos.length} — ${categoriaActual}`;
    contador.textContent = `${imagenActual + 1} / ${archivos.length}`;
    precargarAdyacentes();
}

function cerrarLightbox() {
    lightbox.classList.remove("activo");
    lightbox.setAttribute("aria-hidden", "true");
    lightbox.hidden = true;
    document.body.style.overflow = "";

    if (tarjetaActiva) {
        tarjetaActiva.focus();
        tarjetaActiva = null;
    }
}

function abrirGaleria(categoria, tarjeta) {
    categoriaActual = categoria;
    archivos = obtenerArchivos(categoria);
    imagenActual = 0;
    tarjetaActiva = tarjeta;

    mostrarImagen();

    lightbox.classList.add("activo");
    lightbox.removeAttribute("hidden");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    btnCerrar.focus();
}

function imagenSiguiente() {
    imagenActual = (imagenActual + 1) % archivos.length;
    mostrarImagen();
}

function imagenAnterior() {
    imagenActual = (imagenActual - 1 + archivos.length) % archivos.length;
    mostrarImagen();
}

tarjetas.forEach((tarjeta) => {
    tarjeta.addEventListener("click", () => {
        abrirGaleria(tarjeta.dataset.gallery, tarjeta);
    });
});

btnCerrar.addEventListener("click", cerrarLightbox);

lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        cerrarLightbox();
    }
});

btnSiguiente.addEventListener("click", imagenSiguiente);
btnAnterior.addEventListener("click", imagenAnterior);

lightboxImg.addEventListener("click", (e) => {
    e.stopPropagation();
});

lightbox.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

lightbox.addEventListener("touchend", (e) => {
    const diff = e.changedTouches[0].screenX - touchStartX;

    if (Math.abs(diff) < 50) return;

    if (diff < 0) {
        imagenSiguiente();
    } else {
        imagenAnterior();
    }
}, { passive: true });

document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("activo")) return;

    switch (e.key) {
        case "Escape":
            cerrarLightbox();
            break;
        case "ArrowRight":
            imagenSiguiente();
            break;
        case "ArrowLeft":
            imagenAnterior();
            break;
        case "Tab": {
            const focusables = lightboxFocusables.filter((el) => !el.disabled);
            const first = focusables[0];
            const last = focusables[focusables.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
            break;
        }
        default:
            break;
    }
});

//==================================
// FORMULARIO DE CONTACTO
//==================================

const contactForm = document.querySelector(".contact-form");
const formStatus = document.querySelector(".form-status");

function mostrarEstadoFormulario(mensaje, esError) {
    formStatus.textContent = mensaje;
    formStatus.hidden = false;
    formStatus.classList.toggle("form-status--error", esError);
    formStatus.classList.toggle("form-status--success", !esError);
}

if (new URLSearchParams(window.location.search).has("enviado")) {
    mostrarEstadoFormulario("¡Mensaje enviado! Te responderé lo antes posible.", false);
    history.replaceState(null, "", window.location.pathname + window.location.hash);
}

contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('[type="submit"]');
    const formData = new FormData(contactForm);

    submitBtn.disabled = true;
    submitBtn.textContent = "Enviando…";
    formStatus.hidden = true;

    try {
        const response = await fetch("https://formsubmit.co/ajax/c82117fb00b8629c4ef32cf73ea3df50", {
            method: "POST",
            headers: {
                Accept: "application/json"
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error("Error en el envío");
        }

        contactForm.reset();
        mostrarEstadoFormulario("¡Mensaje enviado! Te responderé lo antes posible.", false);
    } catch {
        contactForm.submit();
        return;
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Enviar mensaje";
    }
});
