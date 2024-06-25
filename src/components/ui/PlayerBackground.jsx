import { create } from "zustand";



const PlayerBackground = create((set) => ({
    background: "/lofi-girl.gif",
    artistLink: "https://www.tokyotones.com/",
    bgArtist: "https://lofigirl.com/",
    musicUrl: "https://www.youtube.com/watch?v=Lcdi9O2XB4E",
    setBackground: (background) => set({ background }),
    setBgArtist: (bgArtist) => set({ bgArtist }),
    setMusicUrl: (musicUrl) => set({ musicUrl }),
}));

export default PlayerBackground;