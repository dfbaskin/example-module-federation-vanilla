import { registerInteropComponent } from "./useActiveInteropComponents";

const noop = () => {};

export function registerInteropCustomElement(
  tagName: string,
  Component: React.ComponentType<unknown>
) {
  console.log(`Registering ${tagName} component.`);

  class ComponentInteropWrapper extends HTMLElement {
    constructor() {
      super();
      this.deregisterFromActiveInterop = noop;
    }

    deregisterFromActiveInterop: () => void;

    connectedCallback() {
      console.log(`Mounting ${tagName} component.`);
      const mountPoint = document.createElement("div");
      this.appendChild(mountPoint);
      this.deregisterFromActiveInterop = registerInteropComponent(
        <Component />,
        mountPoint
      );
    }

    disconnectedCallback() {
      console.log(`Dismounting ${tagName} component.`);
      this.deregisterFromActiveInterop();
      this.deregisterFromActiveInterop = noop;
    }
  }

  customElements.define(tagName, ComponentInteropWrapper);
}
