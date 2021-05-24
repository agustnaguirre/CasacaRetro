 
 
                                            /*DECLARO SELECTORES*/

const DOMItems= document.querySelector(`#items`)
const carritoHTML = document.querySelector("#lista-carrito tbody");
const btnVaciarCarrito = document.querySelector("#vaciar-carrito");
const formulario = document.querySelector("#formulario");
const comprar = document.querySelector("#comprar");
const sumaTotal = document.querySelector("#total")
const contador = document.querySelector("#contador-carrito")
const nombreImpreso = document.getElementById(`nombre-impreso`);


let carrito = [];
let total = 0;

                                            /*DECLARO EVENTOS*/

/*La consola me tira error sobre este evento, la verdad no se porqué porque funciona bien*/
DOMItems.addEventListener('click', agregarProducto);

carritoHTML.addEventListener(`DOMContentLoaded`, () => {
    carrito = JSON.parse(localStorage.getItem(`carrito`)) || [];
    actualizarCarritoHTML();
});
carritoHTML.addEventListener(`click`, borrarProducto);
btnVaciarCarrito.addEventListener(`click`, vaciarCarrito);
formulario.addEventListener(`submit`, buscarProducto);


            /*Aca intente renderizar los productos desde JS. Pude, pero por alguna razón no me funcionaba el boton de agregar. 
            Decidí comentarlo en vez de borrarlo para que veas que hice el intento xD*/


/* function renderizarProductos() {

    stockProductos.forEach((info) => {

        const div1 = document.createElement(`div`);
        div1.classList.add( `card`);
        DOMItems.appendChild(div1);

        const img = document.createElement(`img`);
        img.classList.add(`img-fluid`)
        img.setAttribute(`src`, info.imagen);
        div1.appendChild(img)

        const div2 = document.createElement(`div`)
        div2.classList.add(`card-body`);
        div1.appendChild(div2);

        const h4 = document.createElement(`h4`);
        h4.classList.add(`card-title`)
        h4.textContent = info.nombre;
        div2.appendChild(h4)

        const p = document.createElement(`p`)
        p.classList.add(`precio`)
        div2.appendChild(p);

        const span = document.createElement(`span`);
        span.classList.add(`u-pull-right`);
        span.textContent=  `$` + info.precio ;
        p.appendChild(span)

        const a = document.createElement(`a`);
        a.setAttribute(`href`, "#!");
        a.classList.add(`btn`, `btn-primary`, `agregar-producto`);
        a.setAttribute(`data-id`, info.id);
        a.textContent = "Agregar";
        a.addEventListener(`click`, agregarProducto)
        div2.appendChild(a)
        

    })
} */

                        /*De acá en adelante están todas las funciones que utlicé para el funcionamiento de la página*/

function agregarProducto(e) {
    if(e.target.classList.contains('agregar-producto')) {
        const producto = e.target.parentElement.parentElement;
        obtenerDatos(producto);
    }
    /* calcularTotal(); */
    $(`.contador`).fadeIn(500)
    actualizarCarritoHTML();
    actualizarStorage(); 
    
};

                        /*Acá obtengo los datos de cada producto para luego poder imprimirlos en el carrito*/

function obtenerDatos(card) {
    const producto = {
        nombre: card.querySelector(`h4`).textContent,
        precio: Number.parseInt(card.querySelector(`.precio .u-pull-right`).textContent),
        imagen: card.querySelector(`img`).getAttribute(`src`),
        cantidad: 1,
        id: card.querySelector('a').dataset.id,
    }
    const prodExistente = carrito.find(prod => prod.id === producto.id);

    if(prodExistente){
        const productos = carrito.map(producto => {
            if(producto.id === prodExistente.id){
                producto.cantidad++;
                return producto;
            } else {
                return producto;
            }
    })
    carrito = [...productos];
    }   else {

        carrito.push(producto);

        actualizarCarritoHTML();
        actualizarStorage();
}}
function borrarProducto(e) {
    e.preventDefault();

    if(e.target.classList.contains(`borrar-producto`)) {
        const id = e.target.getAttribute(`data-id`);
         
        carrito = carrito.filter(producto => producto.id !== id);
        
        actualizarStorage();
        actualizarCarritoHTML();
        calcularTotal();
        contadorCarrito();

    }
}
function vaciarCarrito(e){
    e.preventDefault();

    carrito = []

    actualizarCarritoHTML();
    actualizarStorage();
    calcularTotal();
    contadorCarrito();
}

function buscarProducto(e){
    e.preventDefault();
    $(`#items`).hide();
    const buscador = document.querySelector("#buscador").value; 
    const resultado = stockProductos.filter(producto => producto.nombre.toLowerCase().includes(buscador))
    let resultadoHTML = [];
    if(resultado){

        resultado.forEach(producto => {

            const { nombre, imagen, precio, id } = producto;

            resultadoHTML += `
            <div class= "card">
            <img src="${imagen}" class="" alt="Responsive image">
            <div class="card-body">
              <h4 class="card-title">${nombre}</h4>
              <p class="precio"><span>$</span><span class="u-pull-right ">${precio}</span></p>
              <a href="#!" class="agregar-producto" data-id="${id}">Agregar</a>
            </div> 
        
            `
            
            DOMItems.innerHTML = resultadoHTML;
            $(`#items`).fadeIn(1000);
        });
        this.reset();
    }
}
function calcularTotal(){

    const precioProd = JSON.parse(localStorage.getItem(`carrito`));
 
    const res = precioProd.reduce ( (acc, item) => {
        return acc += item.precio;
    }, 0);
    
    sumaTotal.innerHTML=``;

    const contenedor = document.createElement(`span`);
    contenedor.textContent=(`$${res}`);
    contenedor.classList.add(`sumaTotal`);
    sumaTotal.appendChild(contenedor);
   /*  document.querySelector("#totalFinal").appendChild(contenedor) */
}

                        /*Esta Función la hice para ir a una pagina de Checkout donde se vean más claros los productos que agregamos*/
function precompra(){
    calcularTotal();
    let precomprado = JSON.parse(localStorage.getItem(`carrito`));
    
    for( let indice of precomprado){
        console.log(indice)
        const contenedor = document.createElement(`div`);
        contenedor.classList.add(`card-precompra`);
        document.querySelector("#precompra").appendChild(contenedor);

        contenedor.innerHTML=`
        <td class="td1">
            <img src="${indice.imagen}">
        </td>
        <td class="td2">
            <span>${indice.nombre}</span>
        </td>
        <td class="td3">
            <span>$</span>${indice.precio}
        </td>
        <td class="td4">
            <span>X  </span>${indice.cantidad} uni.
        </td> 
        <td class="borrar5">
            <a href="#" class="borrar-producto far fa-trash-alt" data-id="${indice.id}">
            </a>               
        </td>              
        `        
}      
}
function redireccion() {
    window.location.href="comprar.html"
}

                        /*Esta función la uso para que cada vez que agrego o saco algun producto, haya un contador en el icono del carrito*/
function contadorCarrito(){

    const cantidad = JSON.parse(localStorage.getItem(`carrito`));

    const res = cantidad.reduce ( (acc, item) => {
        return acc += item.cantidad;
    }, 0);

    contador.innerHTML = ``;

    const contenedor = document.createElement(`span`);
    contenedor.textContent=`${res}`;
    contador.appendChild(contenedor);
    actualizarStorage()
}



/* acá intento que se vea el nombre en la carta de reserva pero por h o b
no me deja hacerlo, seguro con tiempo se soluciona, lamentablemente ahora no tengo.
El error que me tira es Uncaught TypeError: Cannot read property 'value' of undefined
Habia un onclick="datosIngresados()" en el html pero la saqué para que la consola no tirara otro error*/

/* function datosIngresados() {
    let nombreIngresado = document.getElementsByName('nombre')[0].value;
    console.log(nombreIngresado);
    const contenedor = document.createElement(`p`);
    contenedor.textContent=`${nombreIngresado}`;
    nombreImpreso.appendChild(contenedor);

} */


                        /* Esta función sirve para actualizar los datos del carrito cada vez que se realizan acciones
                        como agregar un producto, borrarlo, o incluso vaciar el carrito. Se utiliza adentro de las 
                        funciones para las acciones antes mencionadas*/

function actualizarCarritoHTML() {

    carritoHTML.innerHTML = '';


    carrito.forEach(producto => {

        const { nombre, precio, imagen, cantidad, id } = producto;

        const contenedor = document.createElement(`tr`);
        contenedor.classList.add(`"contenedor"`)
		contenedor.innerHTML = `
			<td class="td1">
				<img src="${imagen}">
			</td>
			<td class="td2">
				${nombre}
			</td>
			<td class="td3">
				<span>$</span>${precio}
			</td>
			<td class="td4">
				<span>x </span> ${cantidad} uni.
			</td> 
			<td class="td5">
				<a href="#" class="borrar-producto far fa-trash-alt" data-id="${id}">
                </a>               
			</td>
            
		`
		carritoHTML.appendChild(contenedor);


        actualizarStorage();
        calcularTotal();
        contadorCarrito();
    })
}


                        /*Es parecida a la funcón anterior, sólo que lo hace con el localStorage, cada vez que 
                        hay movimiento en el carrito, esta función nos permite refrescarlo*/

function actualizarStorage(){
    localStorage.setItem(`carrito`, JSON.stringify(carrito));
}


























