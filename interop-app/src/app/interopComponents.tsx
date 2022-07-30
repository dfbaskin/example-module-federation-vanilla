import { createPortal } from "react-dom";
import { useActiveInteropComponents } from "./useActiveInteropComponents";
import { CustomElementRootPropsProvider } from "./useCustomElementRootProps";

export function InteropComponents() {
  const activeComponents = useActiveInteropComponents();
  return (
    <>
      {activeComponents.map(([key, children, element]) => {
        const props = Array.from(element.attributes).map(
          ({ name, value }) => [name, value] as [string, unknown]
        );
        if (element.publishEvent) {
          props.push(["publishEvent", element.publishEvent]);
        }
        const current = Object.fromEntries(props);
        return createPortal(
          <CustomElementRootPropsProvider current={current}>
            {children}
          </CustomElementRootPropsProvider>,
          element,
          key
        );
      })}
    </>
  );
}

export default InteropComponents;
