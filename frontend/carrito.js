const d = document;
const cartCount = d.getElementById("cartCount");
const modalContent = d.getElementById("contentModal");
const btnModalOpen = d.getElementById("btnModalO");
const payTotalCart = d.getElementById("payTotal");

const contentProducts = d.getElementById("contentProducts");
const inputSearch = d.getElementById("iptSearch");
const selectCategory = d.getElementById("selectCategory");

const loadCart = JSON.parse(localStorage.getItem("cart")) || [];
const myCart = new Cart(loadCart);
cartCount.innerText = myCart.getCount();
/*
renderizar por categorias ✅
filtrar a traves de fetch ✅
crear maquetacion de la pagina del carrito ✅
renderizar en tabla los productos con api local ✅
agregar opcion de eliminar del carrito y localstorage ✅
otptimizar el codigo y return el api fetch local
agregar botones para sumar y restar cantidad ✅
 */

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
        const mId = e.target.id;
       confirmAddToCart(confirm,mId);
      });
}
const confirmAddToCart=(response,pId)=>{
    const endPoint = "/apiLocal/data.json";
    fetch(endPoint).then(resolve => resolve.json())
    .then(res =>{
        const productsArray = res.productos;
        if(response){
            const getProduct = productsArray.find(item => item.id == pId);
            myCart.addToCart(getProduct);
            loadDataCart();
        }
    })
    .catch(()=>{
        Swal.fire({
            icon: "error",
            title: "Ocurrio un error",
          });
        })
}
const renderizarCart =(productsArray)=>{
    modalContent.innerHTML = "";
    productsArray.forEach(p => {
        modalContent.innerHTML +=//html
        `<tr>
            <td class="imgName"><img src="${p.img}" alt="${p.name}" class="imgTable"></td>
            <td> ${p.name} </td>
            <td> <span class="btnModal restar" id="${p.id}">-</span> ${p.quantity} <span class="btnModal sumar" id="${p.id}" >+</span></td>
            <td>$${p.price}</td>
            <td>$${p.quantity * p.price}</td>
            <td> <span class="btnDelete" id="${p.id}">X</span></td>
        </tr> `
    });
    const btns = d.querySelectorAll(".btnDelete");
    btns.forEach(b=> b.addEventListener("click",deleteToCart));

    const btnMore = d.querySelectorAll(".sumar");
    btnMore.forEach(b=>b.addEventListener("click",moreToCart));
    const btnLess = d.querySelectorAll(".restar");
    btnLess.forEach(b=>b.addEventListener("click",lessToCart));
}
deleteToCart=(e)=>{
    const myId = e.target.id;
    myCart.deleteToCart(myId);
    loadDataCart();
}
moreToCart=(e)=>{
    const myId = e.target.id;
    myCart.changeQuantity(myId,"more");
    loadDataCart();
}
lessToCart=(e)=>{
    const myId = e.target.id;
    myCart.changeQuantity(myId,"less");
    loadDataCart();
}

inputSearch.addEventListener("input",(e)=>{
    const search = e.target.value;
    const endPoint = "/apiLocal/data.json";
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
    const endPoint = "/apiLocal/data.json";
    fetch(endPoint).then(resolve => resolve.json())
    .then(res=>{
        const productsJson = res.productos;
        const listProductos = productsJson.filter(p=>p.category == typeCategory);
        listProductos.length >= 1? renderizarProducts(listProductos): renderizarProducts(productsJson);
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
const loadDataCart = ()=>{
    cartCount.innerText = myCart.getCount();
    payTotalCart.innerText = myCart.getSum();
    renderizarCart(myCart.getProducts());
    if(  myCart.getProducts().length >=1){
        d.querySelector(".ancla").classList.add("off");
        d.querySelector(".contentTable").classList.remove("off");
    }   
    else{
        d.querySelector(".ancla").classList.remove("off");
        d.querySelector(".contentTable").classList.add("off");

    }
}
const stateLoader=(value)=>{
    if(value === 1){
        d.getElementById("load").classList.remove("off");
    }
    else if(value === 0){
        d.getElementById("load").classList.add("off");
    }
}
const getApiLocal = ()=>{
    // stateLoader(1);
    const endPoint = "/apiLocal/data.json";
    fetch(endPoint).then(res => res.json())
    .then(r =>{
        const {productos, categorys} = r;
        renderizarProducts(productos);
        renderCategory(categorys);
        loadDataCart();

    }).catch(error => {
        Swal.fire({
            icon: "error",
            title: "Ocurrio un error",
          });
    })
    .finally(()=>{
        stateLoader(0);
    })
}
stateLoader(1);
setTimeout(getApiLocal,100);
