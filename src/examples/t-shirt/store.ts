import { create } from "zustand";

interface State {
  intro: boolean;
  colors: (
    | "#ccc"
    | "#EFBD4E"
    | "#80C670"
    | "#726DE8"
    | "#EF674E"
    | "#353934"
  )[];
  decals: ("react" | "three2" | "pmndrs")[];
  color: "#ccc" | "#EFBD4E" | "#80C670" | "#726DE8" | "#EF674E" | "#353934";
  decal: "react" | "three2" | "pmndrs";
  toggleIntro: () => void;
  setColor: (
    color: "#ccc" | "#EFBD4E" | "#80C670" | "#726DE8" | "#EF674E" | "#353934"
  ) => void;
  setDecal: (decal: "react" | "three2" | "pmndrs") => void;
}

export const useStore = create<State>()((set) => ({
  intro: true,
  colors: ["#ccc", "#EFBD4E", "#80C670", "#726DE8", "#EF674E", "#353934"],
  decals: ["react", "three2", "pmndrs"],
  color: "#EFBD4E",
  decal: "three2",
  toggleIntro: () => set((state) => ({ intro: !state.intro })),
  setColor: (
    color: "#ccc" | "#EFBD4E" | "#80C670" | "#726DE8" | "#EF674E" | "#353934"
  ) => set({ color }),
  setDecal: (decal: "react" | "three2" | "pmndrs") => set({ decal }),
}));
