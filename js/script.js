//==================================
// GALERÍAS
//==================================

const galerias = {

    bodas: 7,
    documental: 4,
    eventos: 11,
    exposiciones: 2,
    moda: 28,
    parejas: 4,
    video: 1

};


//==================================
// NAVBAR
//==================================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    navbar.classList.toggle("scrolled", window.scrollY > 80);

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


let categoriaActual = "";

let imagenActual = 1;

let totalImagenes = 0;  

//==================================
// FUNCIONES
//==================================

function mostrarImagen() {

    lightboxImg.src = `assets/gallery/${categoriaActual}/${categoriaActual}${imagenActual}.jpg`;

    contador.textContent = `${imagenActual} / ${totalImagenes}`;

}

function abrirGaleria(categoria) {

    categoriaActual = categoria;

    imagenActual = 1;

    totalImagenes = galerias[categoria];

    mostrarImagen();

    lightbox.classList.add("activo");

document.body.style.overflow = "hidden";

}
//==================================
// TARJETAS DEL PORTFOLIO
//==================================

tarjetas.forEach(tarjeta => {

    tarjeta.addEventListener("click", (e) => {

        e.preventDefault();

        abrirGaleria(tarjeta.dataset.gallery);

    });

});
//==================================
// BOTONES DEL LIGHTBOX
//==================================

btnCerrar.addEventListener("click", () => {

    lightbox.classList.remove("activo");

    document.body.style.overflow = "";

});

lightbox.addEventListener("click", (e) => {

    if (e.target === lightbox) {

        lightbox.classList.remove("activo");

        document.body.style.overflow = "";

    }

});


btnSiguiente.addEventListener("click", () => {

    imagenActual++;

    if (imagenActual > totalImagenes) {

        imagenActual = 1;

    }

    mostrarImagen();

});


btnAnterior.addEventListener("click", () => {

    imagenActual--;

    if (imagenActual < 1) {

        imagenActual = totalImagenes;

    }

    mostrarImagen();

});

//==================================
// TECLADO
//==================================

document.addEventListener("keydown", (e) => {

    if (!lightbox.classList.contains("activo")) return;

    switch (e.key) {

        case "Escape":

            lightbox.classList.remove("activo");

            break;

        case "ArrowRight":

            btnSiguiente.click();

            break;

        case "ArrowLeft":

            btnAnterior.click();

            break;

    }

}); 

lightboxImg.addEventListener("click", (e) => {

    e.stopPropagation();

});