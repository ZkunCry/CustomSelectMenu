import { Select } from "./select.js";
let arr = [1, 2, 3, 4];

const select = new Select("#select", {
  placeholder: "Default value",
  data: [{ value: "Angular" }, { value: "JavaScript" }, { value: "NodeJs" }],
  selectedId: "1",
});
