import { registerInteropComponent } from './useActiveInteropComponents';

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
      const mountPoint = document.createElement('div');
      this.appendChild(mountPoint);
      this.deregisterFromActiveInterop = registerInteropComponent(
        <Component />,
        mountPoint
      );
    }

    disconnectedCallback() {
      this.deregisterFromActiveInterop();
      this.deregisterFromActiveInterop = noop;
    }
  }

  customElements.define(tagName, ComponentInteropWrapper);
}
