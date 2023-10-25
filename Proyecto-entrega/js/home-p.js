const productos = JSON.parse(localStorage.getItem("productos")) || []
const cardContainer = document.getElementById("card-container");
productos.forEach((prod) => {

    cardContainer.innerHTML += `
            <article class="card">
             <div class="card-header">
             <figure>
                        <img src="${prod.imagen}" alt="${prod.titulo}">
                    </figure>

                    <div class="card-img-info">

                        <h2>Poco stock</h2>
                    </div>

                </div>

                <div class="card-main">
                    <h2>${prod.titulo}</h2>
                    <div class="card-description">
                        <p>${prod.descripcion}</p>
                         <a href="/pages/product/description.html?identificador=${prod.id}" class="btn mr-2">
                    </div>

                 
                </div>

                <div class="card-footer">
                    <button class="card-details">Ver detalles</button>
                    <button class="card-buy">Comprar</button>
                </div>
            </article>
`;


})






