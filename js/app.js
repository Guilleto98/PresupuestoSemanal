// Variables y selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');

// Eventos

eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);

    formulario.addEventListener('submit', agregarGasto);
}


// Clases

class Presupuesto{
        constructor(presupuesto, restante){
            this.presupuesto = Number(presupuesto);
            this.restante = Number(presupuesto);
            this.gastos = [];
        }

        nuevoGasto(gasto){
            this.gasto = [...this.gastos, gasto];
            console.log(this.gastos)
        }
}

class UI{
        insertarPresupuesto(cantidad){
            //Extrayendo valor
            const {presupuesto,restante} = cantidad;
            //Agregando al HTML
            document.querySelector('#total').textContent = presupuesto;
            document.querySelector('#restante').textContent = restante
        };

        imprimirAlerta(mensaje, tipo){
            const divMensaje = document.createElement('div');
            divMensaje.classList.add('text-center', 'alert');

            if(tipo === 'error'){
                divMensaje.classList.add('alert-danger');
            }else{
                divMensaje.classList.add('alert-success');
            }

            //Mensaje de error
            divMensaje.textContent = mensaje;
            //Insertando en el HTML
            document.querySelector('.primario').insertBefore(divMensaje, formulario);

            // Ocultar la alerta
            setTimeout(() => {
                divMensaje.remove();
            }, 2500)
        }

        agregarGastoListado(gastos){
            console.log(gastos)
        } 
}


// Instanciar ui
const ui = new UI();

// La instancio fuera y asi queda global
let presupuesto;

// Funciones

function preguntarPresupuesto(){
    const presupuestoUsuario = prompt('Cual es tu presupuesto semanal?');
    //console.log(Number(presupuestoUsuario));

    if(presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0){
        window.location.reload();
    }

    // Presupuesto valido
    presupuesto = new Presupuesto(presupuestoUsuario);
    console.log(presupuesto)
    ui.insertarPresupuesto(presupuesto);
}

// Agregar gastos
function agregarGasto(e){
        e.preventDefault();

        // Leer los datos del formulario

        const nombre = document.querySelector('#gasto').value;
        const cantidad = Number(document.querySelector('#cantidad').value);

        // Validacion

        if(nombre === '' || cantidad === ''){
            ui.imprimirAlerta('Ambos campos son obligatorios', 'error')
            return;
        }else if(isNaN(cantidad) || cantidad <= 0){
            ui.imprimirAlerta('Cantidad no valida', 'error')
            return;
        }

        // Crear el objeto del gasto

    const gasto = {nombre, cantidad, id: Date.now() };

    // Añade un nuevo gasto
    presupuesto.nuevoGasto(gasto)

    ui.imprimirAlerta('Gasto agregado correctamente', 'success')

    // Imprimir los gastos
     const { gastos } = presupuesto;
    ui.agregarGastoListado(gastos);
    


    formulario.reset();

}