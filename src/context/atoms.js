import { atom } from "recoil";

export const LabeledTweetAtom = atom({
  key: "LabeledTweetAtom",
  default: {},
});

export const todoListAtom = atom({
  key: "todoListAtom",
  default: [],
});

export const todoListFilterAtom = atom({
  key: "todoListFilterAtom",
  default: "Show All",
});
