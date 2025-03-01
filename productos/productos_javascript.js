//Variables
const id_producto = document.getElementById("id");
const descripcion_producto = document.getElementById("descripcion");
const categoria_producto = document.getElementById("categoria");
const imagen = document.getElementById("url_imagen");
const precio_producto = document.getElementById("precio");
const stock_producto = document.getElementById("stock");
const btn_enviar = document.getElementById("enviar");
const btn_vaciar = document.getElementById("resetear");
const btn_aceptar_cambios = document.getElementById("aceptar_cambios");
const caja_productos = document.getElementById("caja_padre_productos");

/**
 * Funcion empleada para asegurar que los campos están rellenos.
 * @returns vaidar
 */
function validar() {
    let validar = true;

    if (id_producto.value.trim() == "") {
        id_producto.classList.add("error");
        validar = false;
    } else {
        id_producto.classList.remove("error");
    }

    if (descripcion_producto.value.trim() == "") {
        descripcion_producto.classList.add("error");
        validar = false;
    } else {
        descripcion_producto.classList.remove("error");
    }

    if (categoria_producto.value.trim() == "") {
        categoria_producto.classList.add("error");
        validar = false;
    } else {
        categoria_producto.classList.remove("error");
    }

    if (imagen.value.trim() == "") {
        imagen.classList.add("error");
        validar = false;
    } else {
        imagen.classList.remove("error");
    }

    if (precio_producto.value.trim() == "") {
        precio_producto.classList.add("error");
        validar = false;
    } else {
        precio_producto.classList.remove("error");
    }

    if (stock_producto.value.trim() == "") {
        stock_producto.classList.add("error");
        validar = false;
    } else {
        stock_producto.classList.remove("error");
    }

    return validar;

}

/**
 * Funcion que nos comprueba si un id está ya registrado
 * @param {} id 
 */
function comprobarId(id) {
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].id == id) {
            //Ya está registrado
            return true;
        }
    }
    //No está registrado
    return false;

}

let productos = JSON.parse(localStorage.getItem("Productos")) || [];

//Nos muestre los que ya están agregados sin tener que agregar yo tambien
mostrar();

/**
 * Funcion que nos muestra los coches almacenados en el array
 */
function mostrar() {
    productos.forEach((producto, index) => {
        pintar(producto, index);
    });
}

/**
 * Funcion que pinta pero NO MUESTRA los coches que damos de alta
 * @param {} producto_JSON 
 * @param {*} index 
 */
function pintar(producto_JSON, index) {
    let producto_mostar = document.createElement("div");

    let muestra = ` <img src="${producto_JSON.url}">
                    <p>Descripcion: ${producto_JSON.descripcion}</p>
                    <p>Precio: ${producto_JSON.precio}</p>
                    <p>Stock: ${producto_JSON.stock}</p>`;

    producto_mostar.innerHTML = muestra;

    const btn_elimnar = document.createElement("button");
    btn_elimnar.textContent = "Eliminar";
    const btn_editar = document.createElement("button");
    btn_editar.textContent = "Editar";

    producto_mostar.appendChild(btn_elimnar);
    producto_mostar.appendChild(btn_editar);

    caja_productos.appendChild(producto_mostar);

    btn_elimnar.addEventListener("click", () => {
        console.log("click editar");
        const eliminar = btn_elimnar.parentElement;
        btn_elimnar.parentElement.parentElement.removeChild(eliminar);

        //Si elimino el producto de la posicion 0, el producto que estaba en la posicion 1 pasa al 0
        index = productos.indexOf(producto_JSON);
        if (index !== -1) {
            //Buscamos en el array la posicion INDEX y eliminamos el primero
            productos.splice(index, 1);
            //Volvemos a guardar para que se nos guarden los datos en el localStorage
            localStorage.setItem("Productos", JSON.stringify(productos));
        }

    });

    btn_editar.addEventListener("click", (event) => {
        event.preventDefault();
        mostrarEditar(producto_JSON);

        btn_aceptar_cambios.style.display="block";
        btn_enviar.style.display = "none";
    });

    /**
     * Funcion que asigna en los input los valores del producto al que demos para editar
     * @param {} producto 
    */
    function mostrarEditar(producto) {
        //Mostramos en los input los datos del producto
        id_producto.value = producto.id;
        id_producto.disabled=true;
        descripcion_producto.value = producto.descripcion;
        categoria_producto.value = producto.categoria;
        imagen.value = producto.url;
        precio_producto.value = producto.precio;
        stock_producto.value = producto.stock;
    }
}

/**
 * Funcion que nos vacia los inputs
 */
function vaciar() {
    //Vaciamos los campos
    id_producto.value = "";
    id_producto.disabled=false;
    descripcion_producto.value = "";
    imagen.value = "";
    precio_producto.value = "";
    stock_producto.value = "";
}

btn_aceptar_cambios.addEventListener("click", (event) => {
    //event.preventDefault();
    if (validar()) {
        //Comprobamos que en array este el id que hemos puesto en el input al darle al boton editar
        for (let i = 0; i < productos.length; i++) {
            //Si coincide
            if (productos[i].id == id_producto.value) {
                //Me guardas los datos en ese producto
                productos[i] = {
                    id: id_producto.value,
                    descripcion: descripcion_producto.value,
                    categoria: categoria_producto.value,
                    url: imagen.value,
                    precio: precio_producto.value,
                    stock: stock_producto.value
                }
                //id_producto.disabled = false;
                break;
            } else {

            }
        }
        alert("Producto editado exitosamente");
        localStorage.setItem("Productos", JSON.stringify(productos));
        vaciar();

        //Escondes cambios y muestras enviar
        btn_aceptar_cambios.style.display = "none";
        btn_enviar.style.display = "block";
    }

});

btn_vaciar.addEventListener("click", () => {
    vaciar();

    //Escondes cambios y muestras enviar
    btn_aceptar_cambios.style.display = "none";
    btn_enviar.style.display = "block";
});

btn_enviar.addEventListener("click", (event) => {
    event.preventDefault();

    if (validar()) {
        //Si el indice esta vacio podrá comprobar el id
        if (comprobarId(id_producto.value)) {
            alert("ID ya registrado");
        } else {
            //Crea el json
            var producto_JSON = {
                id: id_producto.value,
                descripcion: descripcion_producto.value,
                categoria: categoria_producto.value,
                url: imagen.value,
                precio: precio_producto.value,
                stock: stock_producto.value
            }

            //Guardar en el array el JSON
            productos.push(producto_JSON);

            //Guardas en el localStorage el array con los JSON dentro
            localStorage.setItem("Productos", JSON.stringify(productos));

            pintar(producto_JSON, productos.length);

            //Una vez se guarda que aparezcan los campos en blanco otra vez
            vaciar();
        }

    }

});