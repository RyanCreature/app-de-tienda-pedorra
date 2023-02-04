const DOMproducts = document.querySelector('#products');
const DOMcarrito = document.querySelector('#carshop')
const DOMtotal = document.querySelector('#total')
const DOMbotonVaciar = document.querySelector('#carshop_clear')
var lista = []


const CrearProductos = function () {
datos.forEach((info)=>{
	const card = document.createElement('DIV'); // Crear la tarjeta de producto
	card.classList.add('product');
	const img = document.createElement('IMG'); // Insertar la imagen a cada producto
	img.setAttribute('src', info.image);
	img.setAttribute('alt', info.name);
	img.classList.add('product_img');
	const name = document.createElement('P'); // Crear el elemento P para nombre
	name.textContent = info.name;
	name.classList.add('product_name');
	const locale = document.createElement('P'); // Crear elemento P para el local
	locale.textContent = info.locale;
	locale.classList.add('product_locale');
	const description = document.createElement('P'); // Crear elemento P para descripcion
	description.textContent = info.description;
	description.classList.add('product_description');
	const price = document.createElement('P'); // Crear elemento P para precio
	price.textContent = info.price;
	price.classList.add('product_price')
	const btn = document.createElement('BUTTON'); // Crear botton de agregar
	btn.setAttribute('id', info.id);
	btn.addEventListener('click', AgregarAlCarrito);
	btn.textContent = '+';
	btn.classList.add('product_add');
	card.appendChild(img);
	card.appendChild(name);
	card.appendChild(locale);
	card.appendChild(description);
	card.appendChild(price);
	card.appendChild(btn);
	DOMproducts.appendChild(card);
})
};

const AgregarAlCarrito = function (e){
	lista.push(e.target.getAttribute('id'));
	RenderizarCarrito()
}

function RenderizarCarrito () {
	DOMcarrito.textContent = '';
	const carritoSinDuplicados = [...new Set(lista)];
	carritoSinDuplicados.forEach((item)=>{
		const miItem = datos.filter((itemBaseDatos)=>{
			return itemBaseDatos.id === parseInt(item);
		})
		const numeroUnidadesItem = lista.reduce((total, itemId)=>{
			return itemId === item ? total += 1 : total;
		}, 0);
		const miNodo = document.createElement('li');
		miNodo.classList.add('carshop_product');
		miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].name} - ${miItem[0].price}$`;
		const miBoton = document.createElement('button')
		miBoton.classList.add('carshop_delete')
		miBoton.textContent = 'X'
		miBoton.dataset.item = item;
		miBoton.addEventListener('click', borrarItemCarrito);
		miNodo.appendChild(miBoton)
		DOMcarrito.appendChild(miNodo)
	})
	DOMtotal.textContent = calcularTotal()

}

function borrarItemCarrito (evento) {
	const id = evento.target.dataset.item;
	lista = lista.filter((carritoId)=>{
		return carritoId !== id;
	});
	RenderizarCarrito(); 
}

function calcularTotal() {
    // Recorremos el array del carrito 
    return lista.reduce((total, item) => {
        // De cada elemento obtenemos su precio
        const miItem = datos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        // Los sumamos al total
        return total + miItem[0].price;
    }, 0).toFixed(2);
}
function vaciarCarrito () {
	lista = [];
	RenderizarCarrito()
}

DOMbotonVaciar.addEventListener('click', vaciarCarrito)
CrearProductos()
RenderizarCarrito ()