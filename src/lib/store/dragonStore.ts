"use client";

import { create } from "zustand";

export type FlightState = "IDLE_GLIDE" | "ACCELERATE_SPRINT" | "BANKING_TURN" | "CARD_INVESTIGATE";

interface DragonStore {
  targetPos: [number, number, number];
  mouseSpeed: number;
  flightState: FlightState;
  enabled: boolean;
  setTargetPos: (pos: [number, number, number]) => void;
  setMouseSpeed: (speed: number) => void;
  setFlightState: (state: FlightState) => void;
  toggleEnabled: () => void;
}

export const useDragonStore = create<DragonStore>((set) => ({
  targetPos: [0, 0, 0],
  mouseSpeed: 0,
  flightState: "IDLE_GLIDE",
  enabled: true,
  setTargetPos: (pos) => set({ targetPos: pos }),
  setMouseSpeed: (speed) => set({ mouseSpeed: speed }),
  setFlightState: (flightState) => set({ flightState }),
  toggleEnabled: () => set((state) => ({ enabled: !state.enabled })),
}));
