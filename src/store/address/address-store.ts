
import { create } from "zustand";
import { persist } from "zustand/middleware";



interface State {
    address: {
        firstName: string;
        lastName: string;
        address: string;
        address2?: string;
        postalCode: string;
        city: string;
        country: string;
        phone: string;
        // rememberAddress: boolean;
        // Funcion realizada solo para chile
        region?: string;
        comuna?: string;
    };

    setAddress: (address: State['address']) => void

}


export const useAddressStore = create<State>()(

    persist(
        (set, get) => ({
            address: {
                firstName: '',
                lastName: '',
                address: '',
                address2: '',
                postalCode: '',
                city: '',
                country: '',
                phone: '',
                // rememberAddress: boolean;
                // Funcion realizada solo para chile
                region: '',
                comuna: '',

            },
            setAddress: (address) => {
                set({address});
            }
        }),
        {
            name: 'address-storage'
        }
    )

)