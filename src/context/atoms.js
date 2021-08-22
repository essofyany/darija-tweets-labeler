import { atom } from "recoil";

export const tweetsAtom = atom({
  key: "tweetsAtom",
  default: {
    chunk: [],
    chunckIndifier: [],
  },
});

export const todoListAtom = atom({
  key: "todoListAtom",
  default: [],
});

export const todoListFilterAtom = atom({
  key: "todoListFilterAtom",
  default: "Show All",
});
