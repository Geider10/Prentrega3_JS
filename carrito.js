const d = document;
const cartCount = d.getElementById("cartCount");
const modalIcon = d.getElementById("conteinerModal");
const modalContent = d.getElementById("contentModal");
const btnModalOpen = d.getElementById("btnModalO");
const btnModalClose  = d.getElementById("btnModalC");
const payTotalCart = d.getElementById("payTotal");

const contentProducts = d.getElementById("contentProducts");
const inputSearch = d.getElementById("iptSearch");
const btnOrder = d.getElementById("btnOrder");

const loadCart = JSON.parse(localStorage.getItem("cart")) || [];
const myCart = new Cart(loadCart);
cartCount.innerText = myCart.getCount();
btnModalOpen.addEventListener("click",()=>{
    modalIcon.classList.remove("off");
    const productSelect = myCart.getProducts();
    renderizarCart(productSelect);
    payTotalCart.innerText = myCart.getSum();
})
btnModalClose.addEventListener("click",()=>{modalIcon.classList.add("off")})

const renderizarProducts=(productsArray)=>{
    contentProducts.innerHTML ="";
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
    myCart.addToCart(getProduct);
    cartCount.innerText = myCart.getCount();

}
const renderizarCart =(productsArray)=>{
    modalContent.innerHTML = "";
    productsArray.forEach(p => {
        modalContent.innerHTML +=//html
        `<div class="cartProduct">
           <img src="${p.img}" class="imgModal" alt="${p.name}">
           <h3>${p.name}</h3>
           <p>${p.quantity}</p>
           <p>${p.price}</p>
           <p>${p.price * p.quantity}</p>
           <button class="closeProduct" id="btnCloseProduct">X</button>
        </div>`
    });
}
inputSearch.addEventListener("input",(e)=>{
    const search = e.target.value;
    const productsFilter = productos.filter( pro => pro.name.toLowerCase().includes(search.toLowerCase()));
    renderizarProducts(productsFilter);
})
btnOrder.addEventListener("click",()=>{
    const filter =  productos.sort((a,b)=>{
        if(a.price < b.price){
            return -1
        }
        else{
            return 1
        }
        return 0;
    })
    renderizarProducts(filter);
    btnOrder.setAttribute("disabled",true);
})
renderizarProducts(productos);