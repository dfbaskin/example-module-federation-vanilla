import { registerActiveInteropComponent } from "./useActiveInteropComponents";

const noop = () => {};

export function registerInteropCustomElement(
  tagName: string,
  Component: React.ComponentType<unknown>
) {
  console.log(`Registering ${tagName} component.`);

  class ComponentInteropWrapper extends HTMLElement {
    public static observedAttributes = ['id'];

    constructor() {
      super();
      this.deregisterFromActiveInterop = noop;
    }

    deregisterFromActiveInterop: () => void;

    connectedCallback() {
      console.log(`Mounting ${tagName} component (${this.id}).`);
      const mountPoint = document.createElement("div");
      this.appendChild(mountPoint);
      this.deregisterFromActiveInterop = registerActiveInteropComponent(
        <Component />,
        mountPoint
      );
    }

    disconnectedCallback() {
      console.log(`Dismounting ${tagName} component (${this.id}).`);
      this.deregisterFromActiveInterop();
      this.deregisterFromActiveInterop = noop;
    }
  }

  customElements.define(tagName, ComponentInteropWrapper);
}
