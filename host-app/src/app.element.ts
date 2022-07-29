import './app.element.css';

export class AppElement extends HTMLElement {
  public static observedAttributes = [];

  constructor() {
    super();
  }

  connectedCallback() {
    const title = 'webapp';
    this.innerHTML = `
    <div class="app-root">
      <h1>Web Application / React Port Interop Example</h1>
      <div>
        <fieldset>
          <legend>Add Component</legend>
          <div>
            <label>
              <input type="radio" name="componentType" value="red" checked>
              <span>Red</span>
            </label>
          </div>
          <div>
            <label>
              <input type="radio" name="componentType" value="blue">
              <span>Blue</span>
            </label>
          </div>
          <div>
            <label>
              <input type="radio" name="componentType" value="green">
              <span>Green</span>
            </label>
          </div>
          <div>
            <button id="add-component-button" type="button">Add</button>
          </div>
        </fieldset>
      </div>
      <div id="components-list"></div>
    </div>
      `;

    this.addComponentButton.addEventListener('click', this.addElement);
  }

  disconnectedCallback() {
    this.addComponentButton.removeEventListener('click', this.addElement);
  }

  get componentTypeRadioButtons() {
    return Array.from(
      this.querySelectorAll('input[type=radio]')
    ) as HTMLInputElement[];
  }

  get addComponentButton() {
    return this.querySelector('#add-component-button') as HTMLButtonElement;
  }

  addElement = () => {
    const componentType = this.componentTypeRadioButtons.find(
      (c) => c.checked
    )?.value;
    if (componentType) {
      const component = document.createElement(`custom-${componentType}`);
      this.querySelector("#components-list")?.appendChild(component);
    }
  };
}

customElements.define('web-app-root', AppElement);
