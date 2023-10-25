
let consolas = JSON.parse(localStorage.getItem("productos")) || consolasPrimerInicio


// !Si nunca hemos guardado en el localStorage un item productos lo creamos en este if
if(  JSON.parse(localStorage.getItem("productos")) === null  ) {

    localStorage.setItem("productos", JSON.stringify(consolas))
    
}



let idEditar;
const btn = document.querySelector('button.btn[type="submit"]')
const tableBodyHTML = document.querySelector("#table-body")



// Pintamos productos al cargar nuestro script por primera vez
pintarProductos(consolas)



const inputFiltrarHTML = document.getElementById("filtrar")

const formularioProductoHTML = document.getElementById("formularioProducto")

// !LISTENER EVENTO FORMULARIO
formularioProductoHTML.addEventListener('submit', (evt) => {

    evt.preventDefault()

    const el = formularioProductoHTML.elements;

    // let id = idEditar === undefined ? crypto.randomUUID() : idEditar
    let id;

    //Definimos si el producto lo estamos editando la propiedad id no la modificamos sin embargo si NO estamos editando le genero un Id con crypto
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
        //Busco el indice del elemento que quiero editar
        const index = consolas.findIndex(consola => {
            return consola.id === idEditar
        })
        //Remplazo el producto encontrado directamente en el array
        consolas[index] = nuevoProducto;
        //Reseteo la variable editar
        idEditar = undefined;
        //Vuelvo el botón a su estado normal
        btn.innerText = "Agregar producto"
        btn.classList.remove("btn-success")
    } else {
        consolas.push(nuevoProducto)
    }


    Swal.fire({
        icon: 'success',
        title: 'Producto agregado/modificado correctamente',
        text: 'El producto se actualizo o modifico correctamente!',
      })


    pintarProductos(consolas)

    localStorage.setItem("productos", JSON.stringify(consolas))
    
    formularioProductoHTML.reset()
    el.tituloName.focus()
})




// - PINTAR PRODUCTOS
function pintarProductos(arrayAPintar) {

    tableBodyHTML.innerHTML = "";

    arrayAPintar.forEach(function(conso, index) {
        tableBodyHTML.innerHTML += 
            `<tr>
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
            </tr>`
    })
}


//Funcion para filtrar productos
inputFiltrarHTML.addEventListener('keyup', (evt) => {

    const busqueda = evt.target.value.toLowerCase();
    
    const resultado = consolas.filter((producto) =>  {
        //Iterar cada producto
        const titulo = producto.titulo.toLowerCase()
        //Vamor a mirar si la busqueda coincide con el titulo
        if( titulo.includes(busqueda)  ) {
            return true
        } 
        return false
    } )
    pintarProductos(resultado)

})





//#Opción recomendada pero más compleja de borrar elementos
// function obtenerBotones() {
//     const deleteButtons = document.querySelectorAll(".btn-delete")

//     deleteButtons.forEach((btn, index) => {
//         btn.addEventListener("click", () => {
//             borrarProducto(index)
//         })
//     })
// }
// obtenerBotones()

const borrarProducto = (idABuscar) => {
    Swal.fire({
        title: 'Desea borrar producto',
        icon: 'error',
        text: 'Realmente desea elminar el producto?',
        showCloseButton: true,
        showCancelButton: true,
        cancelButtonText: 'Cancelar' ,
        confirmButtonText: 'Borrar',
      }).then((result) => {

        if(result.isConfirmed) {
            const indiceEncontrado = consolas.findIndex((productoFindIndex) => {
                if(productoFindIndex.id === idABuscar) {
                    return true
                }
                return false
            })
            consolas.splice(indiceEncontrado, 1);

            pintarProductos(consolas)

            localStorage.setItem("productos", JSON.stringify(consolas)   )


            Swal.fire('Borrado!', 'Producto borrado correctamente', 'success')
        }
    })
    // obtenerBotones()
}

// - Editar producto
const editarProducto = function(idRecibido) {

    console.log(`Editar elemento ${idRecibido}`)
    // Cuando la personas clickea en el botón editar me manda un ID
    // Buscar el producto que posee dicho id
            //#Opcion 1
            // const productoEditar = consolas.filter(prod => {
            //     if(idRecibido === prod.id) {
            //         return true
            //     }
            //     return false
            // })

            // console.log(productoEditar[0])

            //#Opcion 2
            // const prodIndex = consolas.findIndex(prod => {
                
            //     if(prod.id === idRecibido) {
            //         return true
            //     }
            
            // })

            // if(prodIndex < 0) return;

            // const productoEditar = consolas[0]

            //#Opcion 3 - RECOMENDADA
    const productoEditar = consolas.find((prod) => {
        if(prod.id === idRecibido) {
            return true
        }
    })

    // Resguardo si find no encontro nada = undefined
    if(!productoEditar) return;

    idEditar = productoEditar.id

    // Deberíamos rellenar nuestro formulario con los datos del elemento a editar
    const elements = formularioProductoHTML.elements;

    elements.tituloName.value = productoEditar.titulo;
    elements.precio.value = productoEditar.precio;
    elements.descripcion.value = productoEditar.descripcion;
    elements.imagen.value = productoEditar.imagen;
    elements.categoria.value = productoEditar.categoria;
    // Modificar el botón de agregar con uno de editar
    // Luego reemplazar el producto anterior con los datos nuevos

    
    btn.innerText = "Editar Producto"
    btn.classList.add("btn-success")



    
}




/*
    Duplicar array y evitar la misma referencia entre ambos
    array1 = [1,2,3,4]
    #1 Opcion
    array2 = array1.slice()

    #2 Opcion
    array2 = Array.from(array1)

    #3 Opcion
    array2 = array1.map(elem => {
        return elem
    })
    array2 = array1.map(elem => elem)

    #4 Opcion
    array2 = [ ...array1 ]

    #5 Opcion
    - array2 = structuredClone(array1)

    #1 Opcion objetos
    const obj2 = { ...obj1 }

*/















// const delButtons = document.querySelectorAll("[data-delete-id]")

// delButtons.forEach(del => del.addEventListener('click', (event) => {
//     event.preventDefault()
//     console.dir(event.target)
//     const id = event.target.getAttribute('data-delete-id');
//     console.log(event.currentTarget.dataset.deleteId)
// }))

// function borrarProducto(indiceRecibido) {
//     consolas.splice(indiceRecibido, 1)
//     pintarProductos()
// }




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



// 1- Deberiamos obtener el body de mi elemento html tbody
//Deberíamos por cada consola que tenga en mi array consolas debería pintar un tr


/*  <tr>
        <td class="table-image">
                <img src="https://stylewatch.vtexassets.com/arquivos/ids/233580-800-800?v=638188815205330000&width=800&height=800&aspect=true" alt="">
        </td>
        <td class="table-title">PS5</td>
        <td class="table-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae, laudantium.</td>
        <td class="table-price">1000</td>
        <td class="table-category">Consolas</td>
    </tr> */




    // {
    //     id: 'eec389d2-3d56-4b74-ae13-5d387a592048',
    //     descripcion: 'Consola clásica miniaturizada con juegos preinstalados.',
    //     titulo: 'NES Classic Edition',
    //     fechaDeCreacion: '2016-11-10',
    //     precio: 59.99,
    //     imagen: 'https://m.media-amazon.com/images/I/81s7B+Als-L._SL1500_.jpg',
    //     categoria: 'consolas'
    // },
    // {
    //     id: '5732bbf2-fa29-43c5-9acd-8246334ff9ea',
    //     descripcion: 'Consola portátil con dos pantallas, una de ellas táctil.',
    //     titulo: 'Nintendo DS',
    //     fechaDeCreacion: '2004-11-21',
    //     precio: 149.99,
    //     categoria: 'accesorios',
    //     imagen: 'https://assets.stickpng.com/images/585ea26acb11b227491c3509.png'
    // },
    // {
    //     id: 'ade12391-5086-409f-8011-3f04dd897f46',
    //     descripcion: 'Consola de hogar con innovador control en forma de tableta.',
    //     titulo: 'Nintendo Wii U',
    //     fechaDeCreacion: '2012-11-18',
    //     precio: 299.99,
    //     categoria: 'consolas',
    //     imagen: 'https://nucleogamer.com/wp-content/uploads/492448_thumb-1.png',
    // },
    // {
    //     id: '29122478-2e13-41c5-8bbc-8e1a24423c43',
    //     descripcion: 'Consola con gráficos realistas y unidad de Blu-ray.',
    //     titulo: 'PlayStation 4',
    //     fechaDeCreacion: '2013-11-15',
    //     precio: 399.99,
    //     categoria: 'juegos',
    //     imagen: 'https://livingplaystation.com/wp-content/uploads/2018/11/playstation-4-pro.png',
    // },
    // {
    //     id: 'f00f413d-2e20-46f0-914f-0b4538f23599',
    //     imagen: 'https://www.jvgelectronics.in/storage/product/1634471779img2.png',
    //     descripcion: 'Consola de hogar con posibilidad de ver películas en DVD.',
    //     titulo: 'Xbox 360',
    //     fechaDeCreacion: '2005-11-22',
    //     precio: 299.99,
    //     categoria: 'consolas'
    // }