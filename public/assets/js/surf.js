// Obtener el elemento por su ID
const $ = e => document.getElementById(e) || [];

// Asignar un enlace a GitHub
$("tacogithub").href = "https://github.com/Tacosheel/TacoProxy";

// Evento para cargar la URL en el iframe
$('alloyframe').onclick = function() {
    const frame = $('frame');
    const url = $('iurl').value.trim(); // Obtener la URL introducida

    // Comprobar si la URL no está vacía
    if (url) {
        const domain = document.domain.replace('www.', '').split(/[/?#]/)[0]; // Obtener el dominio
        frame.src = "https://" + domain + "/prefix/" + url; // Redirigir a través del proxy con el prefijo
        frame.style.visibility = "visible"; // Hacer visible el iframe
    } else {
        alert("Por favor, introduce una URL válida.");
    }
    return false;
};

// Evento para redirigir completamente a través del proxy
$('alloydefault').onclick = function() {
    const url = $('iurl').value.trim(); // Obtener la URL introducida

    // Comprobar si la URL no está vacía
    if (url) {
        const domain = document.domain.replace('www.', '').split(/[/?#]/)[0]; // Obtener el dominio
        window.location.href = "https://" + domain + "/prefix/" + url; // Redirigir completamente
    } else {
        alert("Por favor, introduce una URL válida.");
    }
    return false;
};

// Poner el foco en el campo de entrada al cargar la página
window.onload = function() {
    $('iurl').focus();
};
