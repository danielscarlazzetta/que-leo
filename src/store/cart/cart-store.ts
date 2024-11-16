import type { CartProduct } from "@/interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";



interface State {
    cart: CartProduct[];

    getTotalItems: () => number;
    getSumaryInformation: () => {
        subsTotal: number;
        tax: number;
        total : number;
        itemsInCart: number;
    };
    addProductToCart: (product: CartProduct) => void;
    updateProductQuantity: (product: CartProduct, quantity: number) => void;
    removeProduct: (product: CartProduct) => void;
    clearCart: () => void;

}

export const useCartStore = create<State>()(

    // persistencia en el carro de compras
    persist(
        (set, get) => ({

            cart: [],

            //metodos

            // 1.Obtener todos los datos
            getTotalItems: () => {
                const { cart } = get();
                return cart.reduce( ( total , item ) => total + item.quantity, 0 );
            },
            
            // 5. Calculo de la orden
            getSumaryInformation: () => {

                const { cart } = get();

                const subsTotal = cart.reduce(
                    (subTotal, producto) =>
                    producto.quantity * producto.price + subTotal
                    , 0);

                const tax = subsTotal * 0.19;
                const total = subsTotal + tax;

                const itemsInCart = cart.reduce( ( total , item ) => total + item.quantity, 0 );

                return {
                    subsTotal,
                    tax,
                    total,
                    itemsInCart,
                };
            },
            
            // 2. Agregar productos
            addProductToCart: (product: CartProduct) => {
                const { cart } = get();
                
                // 1. revisar si existe el producto
                const productInCart = cart.some(
                    (item) => (item.id === product.id && item.size === product.size)
                );

                if (!productInCart) {
                    set({ cart: [...cart, product] })
                    return
                }

                // 2. el producto existe por talla, ahora se incrementa
                const updatedCartProduct = cart.map((item) => {
                    if (item.id === product.id && item.size === product.size) {
                        return { ...item, quantity: item.quantity + product.quantity }
                    }

                    return item;
                });

                set({ cart: updatedCartProduct })
            },


            // 3. Actualizar producto
            updateProductQuantity: (product: CartProduct, quantity: number) => {
                const {cart} = get();

                const updatedCartProducts = cart.map( item => {
                    if( item.id === product.id && item.size === product.size){
                        return{ ...item, quantity : quantity}
                    }
                    return item;
                });

                set({ cart : updatedCartProducts})
            },

            //4. remover producto
            removeProduct: (product: CartProduct) => {
                const { cart } = get();

                const updatedCartProducts = cart.filter(
                    (item) => item.id !== product.id || item.size !== product.size
                );

                set({ cart: updatedCartProducts})

            },

            clearCart:() => {
                set({cart: []})
            },
        })
        ,
        { 
            name: "shopping-cart",
            // skipHydration: true,
        },
    )
)