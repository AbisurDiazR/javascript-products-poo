//calse y metodo constructor
class Product {
    constructor(name, price, year) {
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

//clase de interfaz de usuario que modifica la interfaz principal
class UI {

    addProduct(product) {
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');//creamos elemento div
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Nombre Producto</strong>: ${product.name}
                    <strong>Precio Producto</strong>: ${product.price}
                    <strong>Año Producto</strong>: ${product.year}
                    <a href="#" class="btn btn-danger" name="delete">Borrar</a>
                </div> 
            </div> 
        `;
        productList.appendChild(element);
    }

    //metodo para limpiar el formulario
    resetForm() {
        document.getElementById('product-form').reset();
    }

    deleteProduct(element) {
        if(element.name === 'delete'){
            element.parentElement.parentElement.parentElement.remove();
        }
    }

    showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));
        //mostrando en el dom
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        container.insertBefore(div, app);
        //llamamos al temporizador de javascript
        setTimeout(() => {
            document.querySelector('.alert').remove();            
        }, 3000);//despues de tres segundos remueve el mensaje
    }
}

//evantos del DOM (Document Object Model) ocurren en el documento html
document.getElementById('product-form').addEventListener('submit', 
function (e) {
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const year = document.getElementById('year').value;

    const product = new Product(name, price, year);
    
    //llamamos un objeto de la clase UI
    const ui = new UI();

    //validamos si los campos estan vacios
    if (name === '' || price === '' || year === '') {
        return ui.showMessage('Campos vacios','info');
    }

    //usamos el metodo addProduct de UI
    ui.addProduct(product);
    //limpiamos el form con el metodo de UI
    ui.resetForm();
    ui.showMessage('Producto agregado', 'success');

    //eliminamos el evento por defecto del submit
    e.preventDefault();
});//addEventListener captura los eventos del form


//capturamos el evento de eliminar a traves del evento click
document.getElementById('product-list').addEventListener('click', function(e){
    const ui = new UI();
    ui.deleteProduct(e.target);
    //inicializamos mensaje
    ui.showMessage('Producto eliminado','danger')
});