class Cart{
    constructor(list=[]){
        this.cart = list;
        console.log("Hola desde el constructor");
    }

    addToCart(p){
        const myId = p.id;
        const index = this.cart.findIndex(product => product.id == myId);
        if(index == -1){
            this.cart.push(p);
        }
        else{
            this.cart[index].quantity++;
        }

        localStorage.setItem("cart",JSON.stringify(this.cart));
    }
    getProducts(){
        return this.cart;
    }
    getCount(){
        const count = this.cart.reduce((cont,item)=>{return cont + item.quantity},0);
        return count;
    }
    getSum(){
        const total = this.cart.reduce((cont,item)=>{return cont + (item.quantity * item.price)},0);
        return total;
    }
}