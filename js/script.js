// ==========================
// PORTFOLIO
// ==========================

const portfolio = [

    {
        imagen: "assets/gallery/bodas/bodas1.jpg",
        titulo: "Bodas",
        categoria: "bodas",
        cantidad: 7
    },

    {
        imagen: "assets/gallery/documental/documental1.jpg",
        titulo: "Documental",
        categoria: "documental",
        cantidad: 4
    },

    {
        imagen: "assets/gallery/eventos/eventos1.png",
        titulo: "Eventos",
        categoria: "eventos",
        cantidad: 11
    },

    {
        imagen: "assets/gallery/exposiciones/exposiciones1.png",
        titulo: "Exposiciones",
        categoria: "exposiciones",
        cantidad: 2
    },

    {
        imagen: "assets/gallery/moda/moda1.jpg",
        titulo: "Moda",
        categoria: "moda",
        cantidad: 28
    },

    {
        imagen: "assets/gallery/parejas/parejas1.jpg",
        titulo: "Parejas",
        categoria: "parejas",
        cantidad: 4
    },

    {
        imagen: "assets/gallery/video/video1.png",
        titulo: "Vídeo",
        categoria: "video",
        cantidad: 1
    }

];

// ==========================
// NAVBAR
// ==========================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});

// ==========================
// GALERÍA
// ==========================

const gallery = document.getElementById("gallery");

function cargarGaleria(categoria = "todas") {

    gallery.innerHTML = "";

const fotos = categoria === "todas"        ? portfolio
        : portfolio.filter(f => f.categoria === categoria);

    fotos.forEach(foto => {

        gallery.innerHTML += `

        <div class="card ${foto.tipo}">

            <img src="${foto.imagen}" alt="${foto.titulo}">

            <div class="overlay">

                <h3>${foto.titulo}</h3>

            </div>

        </div>

        `;

    });

    iniciarLightbox();

}

cargarGaleria();

// ==========================
// FILTROS
// ==========================

const botones = document.querySelectorAll(".filtros button");

botones.forEach(boton => {

    boton.addEventListener("click", () => {

        botones.forEach(b => b.classList.remove("activo"));

        boton.classList.add("activo");

        cargarGaleria(boton.dataset.categoria);

    });

});

// ==========================
// LIGHTBOX
// ==========================

const lightbox = document.querySelector(".lightbox");
const imagen = document.getElementById("lightbox-img");

const cerrar = document.querySelector(".cerrar");

const anterior = document.querySelector(".anterior");

const siguiente = document.querySelector(".siguiente");

let indiceActual = 0;

function iniciarLightbox() {

    const cards = document.querySelectorAll(".card");

    cards.forEach((card, index) => {

        card.onclick = () => {

            indiceActual = index;

            imagen.src = card.querySelector("img").src;

            lightbox.classList.add("activo");

        };

    });

}

cerrar.onclick = () => {

    lightbox.classList.remove("activo");

};

lightbox.onclick = (e) => {

    if (e.target === lightbox) {

        lightbox.classList.remove("activo");

    }

};

siguiente.onclick = () => {

    const cards = document.querySelectorAll(".card");

    indiceActual++;

    if (indiceActual >= cards.length) {

        indiceActual = 0;

    }

    imagen.src = cards[indiceActual].querySelector("img").src;

};

anterior.onclick = () => {

    const cards = document.querySelectorAll(".card");

    indiceActual--;

    if (indiceActual < 0) {

        indiceActual = cards.length - 1;

    }

    imagen.src = cards[indiceActual].querySelector("img").src;

};

document.addEventListener("keydown", (e) => {

    if (!lightbox.classList.contains("activo")) return;

    if (e.key === "Escape") {

        lightbox.classList.remove("activo");

    }

    if (e.key === "ArrowRight") {

        siguiente.click();

    }

    if (e.key === "ArrowLeft") {

        anterior.click();

    }

});

// ==========================
// ANIMACIÓN AL HACER SCROLL
// ==========================

const reveals = document.querySelectorAll(".reveal");

function revelar() {

    reveals.forEach(seccion => {

        if (seccion.getBoundingClientRect().top < window.innerHeight - 120) {

            seccion.classList.add("visible");

        }

    });

}

window.addEventListener("scroll", revelar);

revelar();