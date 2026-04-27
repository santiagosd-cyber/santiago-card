
const boton = document.querySelector('#modo-oscuro');
const botonrojo = document.querySelector('#rojo');
const botonamarillo = document.querySelector('#amarillo');
const botonverde = document.querySelector('#verde');
const botonForm = document.querySelector('#mostrar-form');
const formulario = document.querySelector('#formulario');



if(localStorage.getItem('modo-oscuro') === 'true') {
    document.body.classList.add('dark-mode');
    boton.textContent = "Modo claro";
}
if(localStorage.getItem('color-texto')) {
    document.body.classList.add(`texto-${localStorage.getItem('color-texto')}`);
}

/* al precionar hace esto */
boton.addEventListener('click', () => {
    /* interactua con el documento , solo con la clase dark-mode, 
    si no existe esta clase creala y usa sus datos, si existe borra
     la clase y toma la predterminada */
    document.body.classList.toggle('dark-mode');

    if (boton.textContent === "Modo oscuro") {
        localStorage.setItem('modo-oscuro', 'true');
        boton.textContent = "Modo claro";
    } else {
        localStorage.setItem('modo-oscuro', 'false');
        boton.textContent = "Modo oscuro";
    }
});


function limpiarColores() {
    document.body.classList.remove('texto-rojo', 'texto-verde', 'texto-amarillo');
    localStorage.removeItem('color-texto');
}

botonrojo.addEventListener('click', () => {
    if (document.body.classList.contains('texto-rojo')) {
        limpiarColores(); // vuelve al predeterminado
    } else {
        limpiarColores();
        document.body.classList.add('texto-rojo');
        localStorage.setItem('color-texto', 'rojo');
    }
});

botonverde.addEventListener('click', () => {
    if (document.body.classList.contains('texto-verde')) {
        limpiarColores();
    } else {
        limpiarColores();
        document.body.classList.add('texto-verde');
        localStorage.setItem('color-texto', 'verde');
    }
});

botonamarillo.addEventListener('click', () => {
    if (document.body.classList.contains('texto-amarillo')) {
        limpiarColores();
    } else {
        limpiarColores();
        document.body.classList.add('texto-amarillo');
        localStorage.setItem('color-texto', 'amarillo');
    }
});

// Cargar datos guardados
window.addEventListener('DOMContentLoaded', () => {
    const datos = JSON.parse(localStorage.getItem('perfil'));

    if (datos) {
        document.querySelector('#nombrePerfil').textContent = datos.nombre;
        document.querySelector('#descripcionPerfil').textContent = datos.descripcion;
        document.querySelector('#edadPerfil').textContent = datos.edad;
        document.querySelector('#alturaPerfil').textContent = datos.altura;
        document.querySelector('#pesoPerfil').textContent = datos.peso;
    }
});

// Guardar datos
formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.querySelector('#nombre').value.trim();
    const descripcion = document.querySelector('#descripcion').value.trim();
    const edad = document.querySelector('#edad').value.trim();
    const altura = document.querySelector('#altura').value.trim();
    const peso = document.querySelector('#peso').value.trim();

    if (!nombre || !descripcion || !edad || !altura || !peso) {
        alert('Completa todos los campos');
        return;
    }

    if (isNaN(edad) || isNaN(peso)) {
        alert('Edad y peso deben ser números');
        return;
    }

    const datosPerfil = {
        nombre,
        descripcion,
        edad,
        altura,
        peso
    };

    localStorage.setItem('perfil', JSON.stringify(datosPerfil));

    document.querySelector('#nombrePerfil').textContent = nombre;
    document.querySelector('#descripcionPerfil').textContent = descripcion;
    document.querySelector('#edadPerfil').textContent = edad;
    document.querySelector('#alturaPerfil').textContent = altura + 'm';
    document.querySelector('#pesoPerfil').textContent = peso + 'kg';

    formulario.reset();
    formulario.classList.add('oculto');
});

botonForm.addEventListener('click', () => {
    formulario.classList.toggle('oculto');
});