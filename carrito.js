const d = document;
const cartCount = d.getElementById("cartCount");
const modalIcon = d.getElementById("conteinerModal");
const modalContent = d.getElementById("contentModal");
const btnModalOpen = d.getElementById("btnModalO");
const btnModalClose  = d.getElementById("btnModalC");
const payTotalCart = d.getElementById("payTotal");

const contentProducts = d.getElementById("contentProducts");
const inputSearch = d.getElementById("iptSearch");
const selectCategory = d.getElementById("selectCategory");

const loadCart = JSON.parse(localStorage.getItem("cart")) || [];
const myCart = new Cart(loadCart);

/*
renderizar por categorias ✅
filtrar a traves de fetch ✅
crear maquetacion de la pagina del carrito ✅
renderizar en tabla los productos con api local
agregar opcion de eliminar del carrito y localstorage
agregar botones para sumar y restar cantidad
 */
cartCount.innerText = myCart.getCount();
btnModalOpen.addEventListener("click",()=>{
    // modalIcon.classList.remove("off");
    renderizarCart(myCart.getProducts());
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
    Swal.fire({
        title: "Agregar producto",
        imageUrl: "https://img.freepik.com/vector-gratis/carro-compras-realista_1284-6011.jpg?w=740&t=st=1707533483~exp=1707534083~hmac=c548b834be7bef8cddc5e95ddf883b374f4032d38fdb660db92bb789583c744b",
        imageWidth: 200,
        imageHeight: 100,
        imageAlt: "Custom image",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar"
      }).then((result) => {
        const confirm = result.isConfirmed;
        if(confirm){
            const id = e.target.id;
            const getProduct = productos.find(item => item.id == id);
            myCart.addToCart(getProduct);
            cartCount.innerText = myCart.getCount();
        }
      });
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
    const endPoint = "apiLocal/data.json";
    fetch(endPoint).then(resolve => resolve.json())
    .then(res => {
        const productsJson = res.productos;
        const productsFilter = productsJson.filter( pro => pro.name.toLowerCase().includes(search.toLowerCase()));
        renderizarProducts(productsFilter);
        (search !== " " && productsFilter.length >= 1)? d.getElementById("errorTxt").classList.add("off") : d.getElementById("errorTxt").classList.remove("off");
    })
    .catch(()=>{
        Swal.fire({
            icon: "error",
            title: "Ocurrio un error",
        });
    })

  
})
selectCategory.addEventListener("change",(e)=>{
    const option = e.target.value;
    filterCategory(option);

})
const filterCategory =(typeCategory)=>{
    const endPoint = "apiLocal/data.json";
    fetch(endPoint).then(resolve => resolve.json())
    .then(res=>{
        const productsJson = res.productos;
        const listProductos = productsJson.filter(p=>p.category == typeCategory);
        if(listProductos.length >= 1){
            renderizarProducts(listProductos);
        }
        else{
            renderizarProducts(productsJson);
        }
    })
    .catch(()=>{
        Swal.fire({
            icon: "error",
            title: "Ocurrio un error",
          });
    });
}
const renderCategory =(cateList)=>{
    selectCategory.innerHTML="";
    cateList.forEach(c => {
        selectCategory.innerHTML +=//html
        `<option value="${c.nameCategory}">${c.nameCategory}</option>
        `
    });
}
const getApiLocal = ()=>{
    const endPoint = "apiLocal/data.json";
    fetch(endPoint).then(res => res.json())
    .then(r =>{
        const {productos, categorys} = r;
        renderizarProducts(productos);
        renderCategory(categorys);
    }).catch(e => {
        Swal.fire({
            icon: "error",
            title: "Ocurrio un error",
          });
    })
}
getApiLocal();

