import { create } from "zustand";

export const UseThemeStore = create(( set ) =>({
    theme : localStorage.getItem('theme') || 'dark',

    changeTheme: (theme) =>{
        localStorage.setItem('theme', theme);
        set({ theme })
    }
}))