

let pais = document.getElementById("pais");
let capital = document.getElementById("capital");
let region = document.getElementById("region");
let subregion = document.getElementById("subregion");
/* funciones para validar input*/
function validarPais() {
    let span = document.getElementById("validpais");
    const regex = /^[A-Za-z]+$/;
    if (!regex.test(pais.value)) {
        //alert("Por favor, introduce solo caracteres de texto."); 
        span.style = "display:block";
        span.innerText = "Por favor, introduce solo caracteres de texto.";
        span.className = "text-danger";
        pais.className = "form-control border-input-error";
        return false;
    }
    else {
        span.innerText = "";
        span.style = "display:none;";
        pais.className = "form-control border-input-ok";
        return true;
    }
}
pais.addEventListener('input', validarPais);


function validarCapital() {
    let validcapital = document.getElementById("validcapital");
    var regex =  /^[A-Za-z]+$/;
    if (!regex.test(capital.value)) {
        //alert("Por favor, introduce un correo electrónico válido.");
        validcapital.style = "display:block";
        validcapital.innerText = "Por favor, introduce una capital válido";
        validcapital.className = "text-danger";

        capital.className = "form-control border-input-error";
        return false;
    }
    else {
        validcapital.style = "display:none";
        validcapital.innerText = "";
        capital.className = "form-control border-input-ok";
        return true;
    }
}
capital.addEventListener("input", validarCapital);

let array = []; //es un array o variable global


function getApi() {
    const url = "https://restcountries.com/v3.1/lang/spanish";
    fetch(url)
        .then(function (response) {
            //console.log(response.status);
            return response.json();
        }).then(function (data) {
            //console.log(data);
            //console.table(data);
            array = [];
            data.forEach(ob => {
                const data_api = {
                    pais: ob.name.common,
                    capital: ob.capital[0],
                    region: ob.region,
                    subregion: ob.subregion
                };
                array.push(data_api);
                actualizarTablaHtml();
            });
            console.table(array);
            //addSesionStorage();
            //console.table(obtieneSesionStorage());
        })
        .catch(function (error) {
            console.log(error);
        });
}

document.addEventListener("DOMContentLoaded", getApi);
function guardar() {

    let valid0 = validarPais();
    let valid1 = validarCapital();

    if (valid0 && valid1 == true) {
        // crear un objeto en javascript
        let objeto = {
            "pais": pais.value,
            "capital": capital.value,
            "region": region.value,
            "subregion" : subregion.value
            

        };
        array.push(objeto); //agregar el objeto al array
        actualizarTablaHtml();
        console.table(array); // mostrar la info del array en la console

        actualizarTablaHtml();
        // console.log(objeto);
    }
    //console.log(objeto);
    //validarTexto();
    //validarCorreo();
}

function actualizarTablaHtml() {
    let datosBody = document.getElementById('datosBody');
    datosBody.innerHTML = "";
    //recorrer el array que tiene los datos
    for (let i = 0; i < array.length; i++) {

        //crear la fila
        let fila = document.createElement('tr');
        //crear la columna codigo
        let columnaCodigo = document.createElement('td');
        columnaCodigo.textContent = array[i].pais; //pasar el dato
        fila.appendChild(columnaCodigo); // add columna a la fila

        //crear la columna capital
        let columnacapital = document.createElement('td');
        columnacapital.textContent = array[i].capital; //pasar el dato
        fila.appendChild(columnacapital); // add columna a la fila

        //crear la columna region
        let columnaregion = document.createElement('td');
        columnaregion.textContent = array[i].region; //pasar el dato
        fila.appendChild(columnaregion); // add columna a la fila

        //subregion
        //crear la columna descripcion
        let columnasubregion = document.createElement('td');
        columnasubregion.textContent = array[i].subregion; //pasar el dato
        fila.appendChild(columnasubregion); // add columna a la fila

        let columnaOPciones = document.createElement('td');
        //crear boton eliminar
        let btneliminar = document.createElement('button');
        btneliminar.textContent = "Eliminar";
        btneliminar.className = "btn btn-danger me-2";
        btneliminar.addEventListener('click', function () {
            eliminar(i);
        });
        columnaOPciones.appendChild(btneliminar);
        // crear otro boton
        let btnMarcar = document.createElement('button');
        btnMarcar.textContent = "Marcar";
        btnMarcar.className = "btn btn-primary";
        btnMarcar.addEventListener('click', function () {
            cambiaEstado(i);
        });
        columnaOPciones.appendChild(btneliminar);
        columnaOPciones.appendChild(btnMarcar);

        fila.appendChild(columnaOPciones);


        if (array[i].estado) {
            fila.className = "marcar-ok";
        }
        //add fila al tbody de la tabla html
        datosBody.appendChild(fila);
    }

}
function eliminar(i) {
    array.splice(i, 1);
    actualizarTablaHtml();
}
function cambiaEstado(i) {
    array[i].estado = !array[i].estado;
    //array[i].estado= !(false)  not, and, or
    //array[i].estado= true;

    actualizarTablaHtml();
}