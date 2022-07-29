import { createPortal } from "react-dom";
import { useActiveInteropComponents } from "./useActiveInteropComponents";
import { CustomElementRootPropsProvider } from "./useCustomElementRootProps";

export function InteropComponents() {
  const activeComponents = useActiveInteropComponents();
  return (
    <>
      {activeComponents.map(([key, children, element]) => {
        const current = Object.fromEntries(
          Array.from(element.attributes).map(({ name, value }) => [name, value])
        );
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
