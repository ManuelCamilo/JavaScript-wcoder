let productos = []
let carrito = []

fetch(`json/productos.json`)
    .then (respuesta => respuesta.json())
    .then ((datos) => {
        
        datos.forEach((producto)=> {
        productos.push(producto)
               
        })
        mostrarProductos()
    })

if(localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}


const contenedorProductos = document.getElementById("contenedorProductos");

const mostrarProductos = () => {
    productos.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("producto");
        card.innerHTML = `
        <img class="producto__imagen " src="${producto.img}" alt="camiseta ${producto.nombre}">
            <div class="producto__informacion">
                <p class="producto__nombre"> ${producto.nombre} </p>
                <p class="producto__precio"> $ ${producto.precio} </p>
                <button class="formulario__submit botonAgregarCarrito mx-auto" id= "boton${producto.id}" > Agregar al carrito </button>
            </div>`
        contenedorProductos.appendChild(card);

        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
            Toastify({
                text:"Producto agregado al carrito",
                duration:1500,
                gravity:"bottom",
                position:"right",
                style:{
                    background:"green"
                },
                destination: "./carrito.html",
                newWindow:true,
            }).showToast();
        })
    })
}

// CARRITO 

const agregarAlCarrito = (id) => {
    const producto = productos.find((producto) => producto.id === id);
    const productoEnCarrito = carrito.find((producto) => producto.id === id);
    if(productoEnCarrito){
        productoEnCarrito.cantidad++;
    }else {
        carrito.push(producto);
        localStorage.setItem("carrito",JSON.stringify(carrito));
    }
    calcularTotal();
}

const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");
verCarrito.addEventListener("click", () => {
    mostrarCarrito();
});

//Función para mostrar el carrito

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML="";
    carrito.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("cardCarrito");
        card.classList.add("mt-2")
        card.innerHTML = `
        <img class="imagenCarrito" src="${producto.img}" alt="camiseta ${producto.nombre}">
            <div class="producto__carrito text-center">
                <p class="parrafoCarrito"> Remera ${producto.nombre} </p>
                <p class="parrafoCarrito"> x ${producto.cantidad} u.</p>
                <p class="parrafoCarrito"> $ ${producto.precio} </p>        
            </div>
            <button class="submit__carrito" id= "eliminar${producto.id}" > Eliminar del carrito </button>`

        contenedorCarrito.appendChild(card);

//Eliminar productos del carrito: 
        const boton = document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(producto.id);
            Toastify({
                text:"Producto eliminado del carrito",
                duration:1500,
                gravity:"bottom",
                position:"right",
                style:{
                    background:"red"
                },
                newWindow:true,
            }).showToast();
        })
    })
    calcularTotal();
}

const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0; 
    carrito.forEach((producto) => {
        totalCompra = totalCompra + producto.precio * producto.cantidad;
    })
    total.innerHTML = ` $${totalCompra}`;
}


//Función que elimina el producto del carrito: 

const eliminarDelCarrito = (id) => {
    const producto = carrito.find((producto) => producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);
    mostrarCarrito();

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

//Vaciar carrito

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();
})

//boton eliminar carrito

const eliminarTodoElCarrito = () => {
    carrito = [];
    mostrarCarrito();

    localStorage.clear();
}
