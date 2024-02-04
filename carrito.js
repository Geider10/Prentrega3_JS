const d = document;
const cartCount = d.getElementById("cartCount");
const modal = d.getElementById("conteinerModal");
const btnModalOpen = d.getElementById("btnModalO");
const btnModalClose  = d.getElementById("btnModalC");

const contentProducts = d.getElementById("contentProducts");
const inputSearch = d.getElementById("iptSearch");
const btnOrder = d.getElementById("btnOrder");

btnModalOpen.addEventListener("click",()=>{modal.classList.remove("off")})
btnModalClose.addEventListener("click",()=>{modal.classList.add("off")})


const createProducts=(productsArray)=>{
    // contentProducts ="";
    productsArray.forEach(element => {//llenar el html con cada producto del array
        contentProducts.innerHTML +=//html 
        `<div class="card">
            <img src="${element.img}" alt="${element.name}">
            <h2>${element.name}</h2>
            <h3>${element.price}</h3>
            <button id="${element.id}" class="btn buy btnAdd">Agregar</button>
        </div>`
    });
    
    const btnsCart = d.querySelectorAll(".btnAdd");
    btnsCart.forEach(btn => btn.addEventListener("click",addToCart))
}
const addToCart =(e)=>{
    const id = e.target.id;
    const getProduct = productos.find(item => item.id == id);
    console.log(getProduct);
}
