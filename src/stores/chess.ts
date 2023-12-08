import { Game } from "$lib/chess";
import { writable } from "svelte/store";

export const game = writable(new Game());
