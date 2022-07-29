import { Suspense } from "react";
import { useCustomElementRootProps } from "./useCustomElementRootProps";

interface Props {
  Component: React.ComponentType<unknown>;
}

export function InteropComponent({ Component }: Props) {
  const rootProps = useCustomElementRootProps();
  return (
    <Suspense fallback={<div>...</div>}>
      <Component {...rootProps} />
    </Suspense>
  );
}

export default InteropComponent;
