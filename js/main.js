// import { productos } from "./productos.js";
import { Contacto, contactoService } from "./contacto.js";
import { Carrito, carritoService } from "./carrito.js";

// Guarda los productos en memoria al hacer el primer Get
let globalProductos_ini = [];
let globalProductos = [];

class mainApp {
  // Actualiza en tiempo real el contador de items del carrito
  counterItemsShoppingCart() {
    // Se obtiene el carrito del Local Storage
    let arrayCarrito = JSON.parse(localStorage.getItem("carrito"));

    if (!arrayCarrito) {
      arrayCarrito = [];
    }

    // Setea la cantidad al contador
    $("#count").text(`${arrayCarrito.length}`);
  }

  // Construye el menu en el header dinamicamente
  buildMenu() {
    let secciones = [];
    let seccionesIndex = [
      {
        texto: "Home",
        href: "index.html",
        delay: "data-wow-delay='0.2s'",
      },
      {
        texto: "Nosotros",
        href: "html/nosotros.html",
        delay: "data-wow-delay='0.3s'",
      },
      {
        texto: "Indumentaria",
        href: "html/indumentaria.html",
        delay: "data-wow-delay='0.4s'",
      },
      {
        texto: "Accesorios",
        href: "html/accesorios.html",
        delay: "data-wow-delay='0.5s'",
      },
      {
        texto: "Contacto",
        href: "html/contacto.html",
        delay: "data-wow-delay='0.6s'",
      },
    ];
    let seccionesOtras = [
      {
        texto: "Home",
        href: "../index.html",
        delay: "",
      },
      {
        texto: "Nosotros",
        href: "../html/nosotros.html",
        delay: "",
      },
      {
        texto: "Indumentaria",
        href: "../html/indumentaria.html",
        delay: "",
      },
      {
        texto: "Accesorios",
        href: "../html/accesorios.html",
        delay: "",
      },
      {
        texto: "Contacto",
        href: "../html/contacto.html",
        delay: "",
      },
    ];

    // Obtiene el nombre de la pagina en la que estoy si es el index le paso
    // el path de secciones y clases correspondiente
    let path = window.location.pathname;
    let page = path.split("/").pop();
    let page2 = page.split(".");
    let clasesMenu = "";
    let pagina = page2[0].toUpperCase();

    if (pagina === "INDEX" || pagina === "") {
      secciones = seccionesIndex;
      clasesMenu =
        "nav-link fst-italic header__menuSecciones wow animate__animated animate__bounceInDown";
    } else {
      secciones = seccionesOtras;
      clasesMenu = "nav-link fst-italic header__menuSecciones";
    }

    // Crea el menu del Sitio
    for (const seccion of secciones) {
      $("#menuHeader").append(`<li class="nav-item">
                                        <a class="${clasesMenu}" href="${seccion.href}" ${seccion.delay}>
                                            ${seccion.texto}
                                        </a>
                                      </li>`);
    }
  }

  // Construye los productos obtenidos del .json y suscribe addShoppinCart
  buildProductos() {
    //Declaramos la url del archivo JSON local
    const URL_JSON_LOCAL = "../data/productos.json", // Archivo .json
      URL_JSON_SERVER_GET = "http://localhost:3000/productos", // Servidor Local
      URL_JSON_SERVER_GITHUB_GET =
        "https://my-json-server.typicode.com/Fran1171/coderhouse-server/productos",
      dirImagen = "../images/carritoMakeup/";

    // Se obtiene los productos del archivo .json cargado localmente
    $.getJSON(URL_JSON_SERVER_GITHUB_GET, function (respuesta, estado) {
      if (estado === "success") {
        const productos = respuesta;

        // if (globalProductos_ini.length === 0) {
        // globalProductos_ini = respuesta;
        //}
        globalProductos_ini = productos;
        globalProductos = respuesta;

        for (const producto of productos) {
          // Generamos un ID para el actualizar el texto del Stock tras agregar al carrito
          let stockid = `${producto.id}`.slice(-3);

          $("#mainServicioMakeup").append(`

                        <div class="col">
                            <div id = "alert-${
                              producto.id
                            }" class="card h-100 w-75 card-ancho">
                                
                                <img src="${
                                  dirImagen + producto.imagen
                                }" class="card-img-top img-fluid" loading="lazy" alt="${
            producto.descripcion
          }">
                                
                                <div class="card-body">
                                
                                    <div class="card-title pt-3 fw-bold productoMakeup pb-2">
                                        ${producto.nombre}
                                    </div>
                                    
                                    <div class="h6 text-muted">
                                        $ ${parseFloat(producto.precio).toFixed(
                                          2
                                        )}
                                    </div>

                                    <div class="h6">
                                        <input id="idCant-${
                                          producto.id
                                        }" type="number" value="1" min="1" max="${
            producto.stock
          }" 
                                            class="p-2 w-75 text-muted tex-center border border-secondary">
                                    </div>

                                    <div id= "${stockid}" class="h6 text-muted" >
                                        ${producto.stock} disponibles
                                    </div>

                                    <button id="${
                                      producto.id
                                    }" type="button" class="btn btn-dark w-100 mt-3">
                                        Agregar al carrito
                                        <i class="bi bi-cart3 ps-2"></i>
                                    </button>
                                </div>

                                <div class="container container-md container-sm">

                                    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
                                        <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                                            <path
                                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                        </symbol>
                                    </svg>

                                    <div class="alert alert-success fade show align-items-center" role="alert" style="display: none;"
                                        id="success-addToShoppingCart-alert-${
                                          producto.id
                                        }">
                                        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:">
                                            <use xlink:href="#check-circle-fill" />
                                        </svg>
                                        <span>
                                            Se agreg?? al carrito.
                                        </span>
                                    </div>

                                </div>    

                            </div>
                        </div>
            
                    `);

          // Suscribe el evento click al presionar boton carrito
          $(`#${producto.id}`).click(eventHandlerAddItemToShoppingCart);
        } // for (const producto of productos) {
      }
    });
  }

  // Manejador del evento submit del formulario de contacto
  eventHandlerSubmit() {
    // Suscribe el evento
    $("#form-contacto").submit(function (event) {
      // Se obtiene la lista de contactos del storage
      let contactos = JSON.parse(localStorage.getItem("contactos"));

      if (!contactos) {
        contactos = [];
      }

      // Instancia la clase contactoService para hacer el crud
      const crudContacto = new contactoService(contactos, localStorage);

      // Previene el refresh por default
      event.preventDefault();

      const id = contactos.length + 1;
      const nombre = $("#nombre").val();
      const email = $("#email").val();
      const newsletter = $("#flexCheckChecked").val();

      // Verifica si ya existe contacto con ese nombre
      let contacto = crudContacto.read(nombre);

      // Si no existe lo crea
      if (!contacto) {
        // Se crea un nuevo contacto
        const newContacto = new Contacto(id, nombre, email, newsletter);
        crudContacto.create(newContacto);
      } else {
        // Si existe actualiza
        crudContacto.update(contacto, email, newsletter);
      }

      // Mensaje de Exito al enviar formulario Primer disenio
      // $("#mensajeSubmit").show("slow",function(){
      //     $("#mensajeSubmit").fadeOut(2000);
      // });

      // Mensaje de Exito al enviar formulario Segundo disenio
      $("#mensajeSubmit")
        .fadeTo(2000, 500)
        .slideUp(500, function () {
          $("#mensajeSubmit").slideUp(500);
        });

      // Limpia valores del formulario
      $("#form-contacto").trigger("reset");
    });
  }

  // Suscribe al evento Click icono fijo de carrito y boton iniciar compra en el modal
  eventHandlerDetalleShoppingCart() {
    // Suscribe al Evento Modal - Detalle del carrito
    $("#idCarrito").click(buildItemsInShoppingCart);

    // Suscribe al Evento Iniciar Compra
    $("#comprar").click(iniciarCompra);
  }
} // class mainApp

// Agrega producto al carrito de compras presionando el icono carrito
// y agregando cantidad
function eventHandlerAddItemToShoppingCart(event) {
  try {
    const idProducto = parseInt(event.target.id);
    let itemCarrito = [];

    // Se obtiene el carrito del storage
    let carritoLocalStorage = JSON.parse(localStorage.getItem("carrito"));

    if (!carritoLocalStorage) {
      carritoLocalStorage = [];
    }

    // Instancia la clase carritoService para hacer el crud
    const crudCarrito = new carritoService(carritoLocalStorage, localStorage);

    // Previene el refresh por default
    // event.preventDefault()

    const producto = globalProductos.find(
      (producto) => producto.id === idProducto
    );

    // Lee la cantidad ingresada
    let cant = parseInt($(`#idCant-${idProducto}`).val());

    if (cant > producto.stock) {
      throw Error("Cantidad ingresada supera al stock");
    } else {
      producto.stock = producto.stock - cant;
    }

    // Si ya existe el producto en el carrito suma la cantidad
    const itemProducto = carritoLocalStorage.find(
      (item) => item.id === idProducto
    );

    // Actualiza cantidad
    if (itemProducto) {
      itemProducto.cantidad += cant;
      itemCarrito = new Carrito(
        producto.id,
        producto.nombre,
        itemProducto.cantidad,
        producto.precio,
        producto.imagen,
        producto.stock
      );
      crudCarrito.update(itemCarrito);
    }
    // Agrega producto a carrito
    else {
      itemCarrito = new Carrito(
        producto.id,
        producto.nombre,
        cant,
        producto.precio,
        producto.imagen,
        producto.stock
      );
      crudCarrito.create(itemCarrito);
    }

    // Actualiza en tiempo real el icono fijo contador del carrito de compras
    $("#count").text(`${crudCarrito.carrito.length}`);

    // Actualiza la cantidad del carrito de compras clickeado al valor default 1
    $(`#idCant-${idProducto}`).val("1");

    // Actualiza la cantidad del stock tras agregar items al carrito
    let stid = `${producto.id}`.slice(-3);
    $(`#${stid}`).text(`${producto.stock} disponibles`);

    // Mensaje de Exito al agregar al carrito
    $(`#success-addToShoppingCart-alert-${idProducto}`)
      .fadeTo(1000, 500)
      .slideUp(500, function () {
        $(`#success-addToShoppingCart-alert-${idProducto}`).slideUp(500);
      });
  } catch (error) {
    console.log(error);
    alert("La cantidad ingresada supera al stock.");
  }
}

// Construye el detalle de items en el modal
function buildItemsInShoppingCart() {
  try {
    // Se obtiene la lista de items en el carrito del storage
    let carritoLocalStorage = JSON.parse(localStorage.getItem("carrito"));
    $(".separator").show();

    if (!carritoLocalStorage || carritoLocalStorage.length === 0) {
      // Inicializamos el detalle
      $("#detalleCarrito").text("");
      $("#subTotal").text("");
      $("#total").text("");
      $(".separator").hide();

      $("#detalleCarrito").append("No existe nada cargado en el carrito");

      throw Error("No existe nada cargado en el carrito");
    }

    // Instancia la clase carritoService para hacer el crud
    const crudCarrito = new carritoService(carritoLocalStorage, localStorage);

    let subtotal = 0.0;
    let envios = 1000.0;
    let total = 0.0;

    // Inicializamos el detalle
    $("#detalleCarrito").text("");

    const dirImagenSeccion = "../images/carritoMakeup/",
      dirImagenIndex = "images/carritoMakeup/";
    let dirImagen;

    // Obtiene el nombre de la pagina en la que estoy si es el index le paso
    // el path de secciones y clases correspondiente
    let path = window.location.pathname;
    let page = path.split("/").pop();
    let page2 = page.split(".");
    let pagina = page2[0].toUpperCase();

    dirImagen =
      pagina === "INDEX" || pagina === "" ? dirImagenIndex : dirImagenSeccion;

    // Agrega los items del carrito al modal
    for (const item of carritoLocalStorage) {
      subtotal += item.precio * item.cantidad;

      const producto = globalProductos.find(
        (producto) => producto.id === item.id
      );

      // Arma Items - Carrito
      $("#detalleCarrito").prepend(`
                
                    <div class="row row-cols-2 text-muted align-items-center pb-3">
                        <!-- Imagen -->
                        <div class="col-3 col-lg-1 col-md-1">
                            <img src="${
                              dirImagen + item.srcImagen
                            }" class="img-fluid">
                        </div>
                        <div class="col-9 col-md-1 col-lg-11">
                            <div class="row text-muted align-items-center">                            
                                <!-- Producto -->
                                <div class="col">
                                    <div class="fw-bold pb-2">
                                        ${item.producto} 
                                    </div>
                                </div>
                            </div>    
                            <div class="row row-cols-3 text-muted align-items-center pt-2">    
                                <!-- Precio -->
                                <div class="col-3 col-lg-3">
                                    <div class="h6">
                                        $${item.precio}
                                    </div>
                                </div>
                                <!-- Cantidad -->
                                <div class="col-5 col-lg-2">
                                    <div class="qtyBox d-flex align-items-center justify-content-around border w-100">
                                        <div id="qtyMinus-${
                                          item.id
                                        }" class="btnQty qtyMinus fs-3 ps-2" role='button'>
                                            -
                                        </div>
                                        <input id="cantModal-${
                                          item.id
                                        }" type="text" name="quantity" value="${
        item.cantidad
      }" min="1" max="${producto.stock}" 
                                            class="qtyInput border-0 text-center form-control shadow-none">
                                        <div id="qtyPlus-${
                                          item.id
                                        }" class="btnQty qtyPlus fs-3 pe-2" role='button'>
                                            +
                                        </div>
                                    </div>
                                </div>
                                <!-- Eliminar -->
                                <div class="col">
                                    <button id="delItem-${
                                      item.id
                                    }" class="btn border-0 text-center fs-5 pe-3">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </div>  
                            </div>
                        </div>  
                    </div>                        
                `);

      // Suscribe evento eliminar item del carrito
      $(`#delItem-${item.id}`).click(function () {
        // Elimina item del carrito y construye nuevamente el carrito
        crudCarrito.delete(item.id, carritoLocalStorage);
        buildItemsInShoppingCart();

        // Actualiza el contador del carrito
        let count = 0;
        let cart = JSON.parse(localStorage.getItem("carrito"));

        if (cart) {
          count = cart.length;
        }

        $("#count").text(count);
      });

      // Suscribe evento change de la cantidad actualizada del item del carrito
      $(`#cantModal-${item.id}`).change(function () {
        // qty = ( isNaN( qty ) ) ?1 : qty;
        if (isNaN($(`#cantModal-${item.id}`).val())) {
          item.cantidad = 1;
        } else {
          item.cantidad = parseInt($(`#cantModal-${item.id}`).val());
        }

        crudCarrito.update(item);
        buildItemsInShoppingCart();
      });
    } // for (const item of carritoLocalStorage) {

    $("#detalleCarrito").append(`                
                <hr class="separator bg-secondary">
                <div id="subTotal" class="container-sm container-md container-lg"></div>
                <hr class="separator bg-secondary">
                <div id="total" class="container-sm container-md container-lg"></div>
            `);

    total = subtotal + envios;

    // SUBTOTAL
    $("#subTotal").text("");
    $("#subTotal").append(`  
                <div class="row row-cols-2 text-muted justify-content-center align-items-center">
                    <!-- Subtotal -->
                    <div class="col-9">
                        <div class="fw-bold">
                            Subtotal
                        </div>
                    </div>
                    <!-- Valor -->
                    <div class="col-3">
                        <div class="h6">
                            $${parseFloat(subtotal).toFixed(2)}
                        </div>
                    </div>
                    <!-- Envios -->
                    <div class="col-9">
                        <div class="fw-bold">
                            Envios
                        </div>
                    </div>
                    <!-- Valor -->
                    <div class="col-3">
                        <div class="h6">
                            $${parseFloat(envios).toFixed(2)}
                        </div>
                    </div>
                </div>                
            `);

    // TOTAL
    $("#total").text("");
    $("#total").append(`  
                <div class="row row-cols-2 text-muted justify-content-center align-items-center">
                    <!-- Total -->
                    <div class="col-9">
                        <div class="fw-bold">
                            TOTAL
                        </div>
                    </div>
                    <!-- Valor -->
                    <div class="col-3">
                        <div class="h6">
                            $${parseFloat(total).toFixed(2)}
                        </div>
                    </div>
                </div>                
            `);

    // Suscribe evento click + / - del item del carrito
    $(".btnQty").click(function () {
      // Recupera la cantidad ingresada
      let qty = parseInt($(this).parent(".qtyBox").find(".qtyInput").val());

      // Suma o resta en 1 la cantidad
      if ($(this).hasClass("qtyPlus")) {
        qty++;
      } else {
        if (qty > 1) {
          qty--;
        }
      }

      qty = isNaN(qty) ? 1 : qty;

      $(this).parent(".qtyBox").find(".qtyInput").val(qty);

      let idMinusPlus = $(this).attr("id");
      const id = idMinusPlus.split("-");

      // Datos globales originales, tal como viene en el JSON
      const item1 = globalProductos_ini.find(
        (producto) => producto.id === parseInt(id[1])
      );

      // Datos globales variables
      const item = globalProductos.find(
        (producto) => producto.id === parseInt(id[1])
      );

      // Se obtiene la lista de items en el carrito del storage
      let carritoLocalStorage = JSON.parse(localStorage.getItem("carrito"));

      // Instancia la clase carritoService para hacer el crud
      const crudCarrito = new carritoService(carritoLocalStorage, localStorage);

      item.cantidad = qty;

      // Actualizo el stock
      //item.stock = item1.stock - item.cantidad;

      // Actualiza la cantidad del stock tras agregar items al carrito
      let stid = `${item.id}`.slice(-3);
      $(`#${stid}`).text(`${item.stock} disponibles`);

      crudCarrito.update(item);
      buildItemsInShoppingCart();
    });
  } catch (error) {
    console.log(error);
  }
}

// Al presionar Iniciar compra actualiza el localStorage y el contador
function iniciarCompra() {
  try {
    // Se obtiene el carrito del storage
    let carritoLocalStorage = JSON.parse(localStorage.getItem("carrito"));

    if (!carritoLocalStorage) {
      throw Error("No hay nada para comprar.");
    }

    let key;
    // ELimina carrito del Local Storage
    for (let i = 0; i < localStorage.length; i++) {
      key = localStorage.key(i);

      if (key == "carrito") {
        localStorage.removeItem(key);
      }
    }

    // Inicializa el contador del carrito a 0
    $("#count").text("0");

    alert("Felicidades! Su compra se realizo correctamente");
  } catch (error) {
    console.log(error);
    alert("Ingresa a nuestra secci??n Servicios para comprar");
  }
}

// MAIN
$(document).ready(function () {
  const app = new mainApp();
  app.buildMenu();
  app.buildProductos();
  app.eventHandlerSubmit();
  app.counterItemsShoppingCart();
  app.eventHandlerDetalleShoppingCart();
});
