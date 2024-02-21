// const mp = new MercadoPago('YOUR_PUBLIC_KEY',{
//     locale: "es-AR"
// });
const callCart = JSON.parse(localStorage.getItem("cart")) || [];
const cartData = new Cart(callCart);
const btnBuyCart = document.getElementById("btnBuyCart");
btnBuyCart.addEventListener("click",()=>{
    myCart.getProducts().forEach(pro=>{
        console.log(pro.id);
    })
})
