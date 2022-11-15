class Producto {
    constructor(id, nombre, tipo, precio, img,) {
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1;
    }
}

const VueJS = new Producto (1, "VueJS", "Remera", 2800, "img/1.jpg" );
const AngularJS = new Producto (2, "AngularJS", "Remera", 3500, "img/2.jpg");
const ReactJS = new Producto (3, "ReactJS", "Remera", 5000, "img/3.jpg");
const Redux = new Producto (4, "Redux", "Remera", 2800, "img/4.jpg");
const Nodejs = new Producto (5, "Node.js", "Remera", 4000, "img/5.jpg");
const SASS = new Producto (6, "SASS", "Remera", 800, "img/6.jpg");
const HTML5 = new Producto (7, "HTML5", "Remera", 700, "img/7.jpg");
const GitHub = new Producto (8, "GitHub", "Remera", 1500, "img/8.jpg");
const BulmaCSS = new Producto (9, "BulmaCSS", "Remera", 2500, "img/9.jpg");
const TypeScript = new Producto (10, "TypeScript", "Remera", 2500, "img/10.jpg");
const Drupal = new Producto (11, "Drupal", "Remera", 2500, "img/11.jpg");
const JavaScript = new Producto (12, "JavaScript", "Remera", 5500, "img/12.jpg");
const GraphQL = new Producto (13, "GraphQL", "Remera", 3300, "img/13.jpg");
const WordPress = new Producto (14, "WordPress", "Remera", 2100, "img/14.jpg");


const productos = [VueJS, AngularJS, ReactJS, Redux, Nodejs, SASS, HTML5, GitHub, BulmaCSS, TypeScript, Drupal, JavaScript, GraphQL, WordPress]

let carrito = []

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
                        <button class="formulario__submit" id= "boton${producto.id}" > Agregar al carrito </button>
                </div>
        `
        contenedorProductos.appendChild(card);

        //agregar al carrito
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
                destination: "https://google.com",
                newWindow:true,
            }).showToast();
        })
    })
}

//Función agregar al carrito: 

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

mostrarProductos();

//MOSTRAR EL CARRITO DE COMPRAS: 

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
        card.innerHTML = `
        <img class="imagenCarrito" src="${producto.img}" alt="camiseta ${producto.nombre}">
                <div class="producto__informacion text-center">
                    <p class="parrafo__carrito"> Camiseta ${producto.nombre} </p>
                    <p class="parrafo__carrito"> x ${producto.cantidad} </p>
                    <p class="parrafo__carrito"> ${producto.precio} </p>
                        <button class="submit__carrito" id= "eliminar${producto.id}" > Eliminar del carrito </button>
                </div>
        `
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

//calculo del total

const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0; 
    carrito.forEach((producto) => {
        totalCompra = totalCompra + producto.precio * producto.cantidad;
    })
    total.innerHTML = ` $${totalCompra}`;
}