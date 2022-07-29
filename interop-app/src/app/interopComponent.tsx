import { Suspense } from "react";

interface Props {
  Component: React.ComponentType<unknown>;
}

export function InteropComponent({ Component }: Props) {
  return (
    <Suspense fallback={<div>...</div>}>
      <Component />
    </Suspense>
  );
}

export default InteropComponent;
