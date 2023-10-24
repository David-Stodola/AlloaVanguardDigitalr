//PRODUCTOS-Simulacion Back-end
const consolas = [
  {
    titulo: " Regiannito",
    descripcion: "Horma 1kg ",
    fechaDeCreacion: "8 oct 2023",
    precio: 17000,
    imagen:
      "https://alloavanguard-digitalrs.netlify.app/assets/multimedia/images/Queso-reggianito-alloa-vanguard.jpg",
    categoria: "Queso duro",
    id: "5f49fab9-3135-4676-a160-5c3fdbb1ae92",
  },
  {
    titulo: " Sardo",
    descripcion: "Horma 1kg",
    fechaDeCreacion: "25 de nov",
    precio: 2100,
    imagen:
      "https://alloavanguard-digitalrs.netlify.app/assets/multimedia/images/provolone.jpg",
    categoria: "Queso duro",
    id: "2e897bad-d4e4-413d-a515-ed95df9ad917",
  },
  {
    titulo: " Provolone",
    descripcion: "(‘Provola grande’) 2kg .",
    fechaDeCreacion: "2 de feb",
    precio: 2600,
    imagen:
      "https://alloavanguard-digitalrs.netlify.app/assets/multimedia/images/Queso-sardo-alloa-vanguard.jpg",
    categoria: "Queso duro",
    id: "fc3025ec-f314-4b63-9765-1e8df3ee358a",
  },
  {
    titulo: " Gouda",
    descripcion: "(‘Provola Gouda’) 1kg.",
    fechaDeCreacion: "1 de feb",
    precio: 2400,
    imagen:
      "https://alloavanguard-digitalrs.netlify.app/assets/multimedia/images/Queso-sardo-alloa-vanguard.jpg",
    categoria: "Queso duro",
    id: "f00f413d-2e20-46f0-914f-0b4538f23599",
  },
];

let idEditar;
const btn = document.querySelector('button.btn[type="submit"]')
const tableBodyHTML = document.querySelector("#table-body")

pintarProductos(consolas)
const inputFiltrarHTML = document.getElementById("filtrar")

const formularioProductoHTML = document.getElementById("formularioProducto")

// !LISTENER EVENTO FORMULARIO
formularioProductoHTML.addEventListener('submit', (evt) => {

    evt.preventDefault()
    const el = formularioProductoHTML.elements;
    let id;
    
    if(idEditar) {
        id = idEditar
    } else {
        id = crypto.randomUUID()
    }


    const nuevoProducto = {
        id: id,
        titulo: el.tituloName.value,
        descripcion: el.descripcion.value,
        precio: el.precio.valueAsNumber,
        imagen: el.imagen.value,
        categoria: el.categoria.value,
        fechaDeCreacion: obtenerFecha(),
    }


    if(idEditar) {
        
        const index = consolas.findIndex(consola => {
            return consola.id === idEditar
        })
        
        consolas[index] = nuevoProducto;
        //Se detecto la variable en JS-"consola" a editar y es:
        idEditar = undefined;
        
        btn.innerText = "Agregar producto"
        btn.classList.remove("btn-success")
    } else {
        consolas.push(nuevoProducto)
    }
    
    pintarProductos(consolas)
    
    formularioProductoHTML.reset()
    el.tituloName.focus()
})


function pintarProductos(arrayAPintar) {
  tableBodyHTML.innerHTML = "";

  arrayAPintar.forEach(function (conso, index) {
    tableBodyHTML.innerHTML += `<tr>
                <td class="table-image">
                        <img src="${conso.imagen}" alt="${conso.titulo}">
                </td>
                <td class="table-title">${conso.titulo}</td>
                <td class="table-description">${conso.descripcion}</td>
                <td class="table-price">${conso.precio}</td>
                <td class="table-category">${conso.categoria}</td>
                <td >
                    <div class="d-flex gap-1">
                        <button class="btn-delete btn btn-danger btn-sm" onclick="borrarProducto('${conso.id}')">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                        <button class="btn btn-success btn-sm" onclick="editarProducto('${conso.id}')" data-bs-toggle="modal" data-bs-target="#formModal">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                    </div>
                    
                </td>
            </tr>`;
  });
}

//Funcion para filtrar productos:
inputFiltrarHTML.addEventListener('keyup', (evt) => {

    const busqueda = evt.target.value.toLowerCase();
    
    const resultado = consolas.filter((producto) =>  {
        
        const titulo = producto.titulo.toLowerCase()
        
        if( titulo.includes(busqueda)  ) {
            return true
        } 
        return false
    } )
    pintarProductos(resultado)

})


// BOTONES () :

const borrarProducto = (idABuscar) => {
    const indiceEncontrado = consolas.findIndex((productoFindIndex) => {
        if(productoFindIndex.id === idABuscar) {
            return true
        }
        return false
    })
    consolas.splice(indiceEncontrado, 1)
    pintarProductos(consolas)
   
}

// - ACCIONES:
const editarProducto = function(idRecibido) {
    console.log(`Editar elemento ${idRecibido}`)


    // Formula #1 (objeto)
    const productoEditar = consolas.find((prod) => {
        if(prod.id === idRecibido) {
            return true
        }
    })
    if(!productoEditar) return;
    idEditar = productoEditar.id

    // ELEMENTOS A EDITAR:
    const elements = formularioProductoHTML.elements;

    elements.tituloName.value = productoEditar.titulo;
    elements.precio.value = productoEditar.precio;
    elements.descripcion.value = productoEditar.descripcion;
    elements.imagen.value = productoEditar.imagen;
    elements.categoria.value = productoEditar.categoria;
    
    btn.innerText = "Editar Producto"
    btn.classList.add("btn-success")
    
}




function obtenerFecha() {
    const fecha = new Date()
    let mes = fecha.getMonth() + 1;
    if(mes < 10) {
        mes = '0'+ mes
    }
    let dia = fecha.getDate()
    if(dia < 10) {
        dia = '0' + dia
    }
    const year = fecha.getFullYear()

    const fechaFormateada = `${year}-${mes}-${dia}`
    return fechaFormateada
}



