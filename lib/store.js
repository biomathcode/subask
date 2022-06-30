import { atom } from "recoil";

const SelectTag = atom({
  key: "selectTag",
  default: {
    id: 0,
    name: "all",
  },
});

export default SelectTag;
