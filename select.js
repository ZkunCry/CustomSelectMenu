function generateTemplate(data = [], placeholder, selectedId = "") {
  let placheolderText = placeholder ?? "Default placeholder";
  console.log(data);
  const items = data.map((item) => {
    let selectedClass = "";
    if (item.id == selectedId) {
      placheolderText = item.value;
      selectedClass = "selected";
    }
    return `<li class="select__item ${selectedClass}" data-id="${item.id}" data-type = "item">${item.value}</li>`;
  });

  return `<div class="select__input" data-type = "input">
          <span data-type = "value">${placheolderText}</span>
          <i class="fa fa-angle-up arrow" aria-hidden="true"></i>
        </div>
          <div class="select__menu">
            <ul class="select__list">
              ${items.join("")}
            </ul>
          </div>`;
}

export class Select {
  constructor(selector, options) {
    this.elem = document.querySelector(selector);
    this.options = options;
    this.selectedId = options.selectedId;
    this.#addId();
    this.#render();
    this.#setup();
  }
  #addId() {
    let index = 1;
    this.options.data.forEach((value) => {
      value.id = index++;
    });
  }
  #render() {
    const { data, placeholder } = this.options;
    this.elem.innerHTML = generateTemplate(data, placeholder, this.selectedId);
  }
  #setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.value = this.elem.querySelector('[data-type="value');
    this.elem.addEventListener("click", this.clickHandler);
  }
  clickHandler(event) {
    const { type } = event.target.dataset;
    if (type === "input") this.toggle();
    else if (type === "item") {
      const id = event.target.dataset.id;
      this.select(id);
    }
  }
  get isOpen() {
    return this.elem.classList.contains("open");
  }
  toggle() {
    this.isOpen ? this.close() : this.open();
  }
  open() {
    this.elem.classList.add("open");
  }
  get currentitem() {
    return this.options.data.find((el) => el.id == this.selectedId);
  }
  select(id) {
    this.selectedId = id;
    this.value.textContent = this.currentitem.value;
    this.elem.querySelectorAll('[data-type="item"]').forEach((el) => {
      el.classList.remove("selected");
    });
    this.elem
      .querySelector(`[data-id="${this.selectedId}"]`)
      .classList.add("selected");
    this.close();
  }
  close() {
    this.elem.classList.remove("open");
  }
  destroy() {
    this.elem.parentNode.removeChild(this.elem);
    this.elem.removeEventListener("click", this.clickHandler);
  }
}
