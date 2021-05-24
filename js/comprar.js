const suma = (ns) => {
    let acumulado = 0;
    for (i = 0; i < ns.length; i++){
        acumulado += ns[i]
    }
    return acumulado
}



const productos = JSON.parse(localStorage.getItem(`carrito`));

const precioTotal = productos.map( x => x.precio)
/* let sumaTotal = [productos.precio].map(x => x + productos.precio++); */
/* console.log(precio) */
const resultado = suma(precioTotal);

console.log(resultado);