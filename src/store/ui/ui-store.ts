import { create } from 'zustand'



interface State {
    isSideMenuOpen: boolean;
    openSideMenu: () => void;
    closeSideMenu: () => void;
}

// Esta funcion basicamente me permite abrir y cerrar el menu
export const useUiStore = create<State>()((set) => ({
    isSideMenuOpen: false,

    openSideMenu: () => set({isSideMenuOpen: true}),
    closeSideMenu: () => set({isSideMenuOpen: false}),
}))