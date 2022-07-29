import { createContext, useContext } from "react";

type ElementRootPropsContextValue = Record<string, unknown>;

const ElementRootPropsContext = createContext<ElementRootPropsContextValue>({});

interface Props {
  current: Record<string, unknown>;
  children: React.ReactNode;
}

export function CustomElementRootPropsProvider({ current, children }: Props) {
  return (
    <ElementRootPropsContext.Provider value={current}>
      {children}
    </ElementRootPropsContext.Provider>
  );
}

export function useCustomElementRootProps<T extends Record<string, unknown>>() {
  return useContext(ElementRootPropsContext);
}
