import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

type GameState = {
  blockCount: number;
  blockSeed: number;
  phase: string;
  start: () => void;
  restart: () => void;
  end: () => void;
  startTime: number;
  endTime: number;
};

export default create<GameState>()(
  subscribeWithSelector((set) => ({
    blockCount: 5,
    blockSeed: 0,

    phase: "ready",
    startTime: 0,
    endTime: 0,
    start: () => {
      set((state: { phase: string }) => {
        if (state.phase === "ready") {
          return { phase: "playing", startTime: Date.now() };
        }
        return {};
      });
    },
    restart: () => {
      set((state: { phase: string }) => {
        if (state.phase === "ended" || state.phase === "playing") {
          return { phase: "ready", blockSeed: Math.random() };
        }
        return {};
      });
    },
    end: () => {
      set((state) => {
        if (state.phase === "playing") {
          return { phase: "ended", endTime: Date.now() };
        }
        return {};
      });
    },
  }))
);
