// variables y selectores
const formulario = document.querySelector("#agregar-gasto");
const gastoListado = document.querySelector("#gastos ul");

// eventos

eventListeners();
function eventListeners() {
    document.addEventListener("DOMContentLoaded", preguntarPresupuesto);

    formulario.addEventListener('submit', agregarGasto);
}

// clases
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }

}

class UI {
    insertarPresupuesto( cantidad ) {
        // Extrayendo los valores
        const { presupuesto, restante } = cantidad;

        // Agregar al HTML
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }

    imprimirAlerta(mensaje, tipo) {
        // crear div
        const divMensaje = document.createElement("div");
        divMensaje.classList.add("text-center", "alert");

        if(tipo === "error") {
            divMensaje.classList.add("alert-danger")
        } else {
            divMensaje.classList.add("alert-success");
        }

        // mensaje de error
        divMensaje.textContent = mensaje;

        // insertar en el HTML
        document.querySelector(".primario").insertBefore(divMensaje, formulario);

        //quitar del HTML
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }
}


// Instanciar
const ui = new UI();
let presupuesto;

// Funciones

function preguntarPresupuesto() {
    const presupuestoUsuario = prompt('¿Cual es tu presupuesto?');

    // console.log( Number( presupuestoUsuario) );

    if(presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0 ) {
        window.location.reload();
    }

    // Presupuesto valido
    presupuesto = new Presupuesto(presupuestoUsuario);
    console.log(presupuesto);

    ui.insertarPresupuesto(presupuesto);
}

// añade gastos
function agregarGasto(e) {
    e.preventDefault();

    // leer los datos del formulario 
    const nombre = document.querySelector("#gasto").value;
    const cantidad = document.querySelector("#cantidad").value;
    

    // validar
    if(nombre === "" || cantidad === "") {
        ui.imprimirAlerta("Ambos campos don obligatorios", "error");
        return;
        
    } else if (cantidad <= 0 || isNaN(cantidad)) {
        ui.imprimirAlerta("Cantidad no válida", "error");
        return;
    }
}