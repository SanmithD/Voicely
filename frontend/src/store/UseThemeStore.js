import { create } from "zustand";

export const UseThemeStore = create(( set ) =>({
    theme: "light",

    changeTheme : (data) =>{
        set({ theme : data });
        localStorage.setItem('theme',data);
    }
}))