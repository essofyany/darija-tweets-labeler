import { atom } from "recoil";

export const tweetsAtom = atom({
  key: "tweetsAtom",
  default: {
    chunk: [],
    chunckIndifier: [],
  },
});
