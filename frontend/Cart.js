class Cart{
    constructor(list=[]){
        this.cart = list;
    }
    addToCart(p){
        const myId = p.id;
        const index = this.cart.findIndex(product => product.id == myId);
        index == -1 ? this.cart.push(p):this.cart[index].quantity++;
        localStorage.setItem("cart",JSON.stringify(this.cart));
    }
    deleteToCart(pId){
        const pro = this.cart.findIndex((item) => item.id == pId);
        this.cart.splice(pro,1);
        localStorage.setItem("cart",JSON.stringify(this.cart));//pisamos el string y tenemos nuevo array
    }
    getProducts(){
        return this.cart;
    }
    getCount(){
        return this.cart.reduce((cont,item)=>{return cont + item.quantity},0);
    }
    getSum(){
        return this.cart.reduce((cont,item)=>{return cont + (item.quantity * item.price)},0);
    }
    changeQuantity(myId,change){
        const loadProduct = this.cart.find(item => item.id == myId);
        if(change=="more"){
            loadProduct.quantity++;
            localStorage.setItem("cart",JSON.stringify(this.cart));
        }
        else if(change=="less"){
            if(loadProduct.quantity >1){
                loadProduct.quantity--;
                localStorage.setItem("cart",JSON.stringify(this.cart));
            }
        }
    }

}