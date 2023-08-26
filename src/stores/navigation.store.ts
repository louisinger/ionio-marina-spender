import { Updater, writable } from 'svelte/store';

export enum Page {
  Home,
  Send,
  Receive,
}

export const navigationStore = writable<Page>(Page.Home);

export const goto = (page: Page): Updater<Page> => () => page;