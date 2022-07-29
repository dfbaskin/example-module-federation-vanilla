import "./app.element.css";

const nextComponentId = (function () {
  let nextId = 0;
  return () => `components-list-item${++nextId}`;
})();

export class AppElement extends HTMLElement {
  public static observedAttributes = [];

  constructor() {
    super();
  }

  connectedCallback() {
    const title = "webapp";
    this.innerHTML = `
    <div class="app-root">
      <h1>Web Application / React Port Interop Example</h1>
      <div>
        <fieldset>
          <legend>Add Components</legend>
          <div id="add-buttons">
            <button type="button" name="red">Add Red</button>
            <button type="button" name="blue">Add Blue</button>
            <button type="button" name="green">Add Green</button>
          </div>
        </fieldset>
      </div>
      <div id="components-list"></div>
    </div>
      `;

    this.addButtons.addEventListener("click", this.addElement);
  }

  disconnectedCallback() {
    this.addButtons.removeEventListener("click", this.addElement);
  }

  get componentTypeRadioButtons() {
    return Array.from(
      this.querySelectorAll("input[type=radio]")
    ) as HTMLInputElement[];
  }

  get addButtons() {
    return this.querySelector("#add-buttons") as HTMLDivElement;
  }

  addElement = (evt: MouseEvent) => {
    const componentType = (evt.target as HTMLButtonElement | undefined)?.name;
    if (componentType) {
      const component = document.createElement(`custom-${componentType}`);
      component.id = nextComponentId();
      this.querySelector("#components-list")?.appendChild(component);
    }
  };
}

customElements.define("web-app-root", AppElement);
