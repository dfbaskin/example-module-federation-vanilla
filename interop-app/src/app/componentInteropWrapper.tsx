import { registerActiveInteropComponent } from "./useActiveInteropComponents";

const noop = () => {};

export function registerInteropCustomElement(
  tagName: string,
  Component: React.ComponentType<unknown>
) {
  console.log(`Registering ${tagName} component.`);

  class ComponentInteropWrapper extends HTMLElement {
    public static observedAttributes = ["id"];

    constructor() {
      super();
      this.deregisterFromActiveInterop = noop;
    }

    deregisterFromActiveInterop: () => void;

    publishEvent = (event: Event) => {
      return this.dispatchEvent(event);
    };

    connectedCallback() {
      console.log(`Mounting ${tagName} component (${this.id}).`);
      this.deregisterFromActiveInterop = registerActiveInteropComponent(
        <Component />,
        this
      );
    }

    disconnectedCallback() {
      console.log(`Dismounting ${tagName} component (${this.id}).`);
    }

    remove() {
      if(this.deregisterFromActiveInterop !== noop) {
        this.deregisterFromActiveInterop();
        this.deregisterFromActiveInterop = noop;
        super.remove();
      }
    }
  }

  customElements.define(tagName, ComponentInteropWrapper);
}
