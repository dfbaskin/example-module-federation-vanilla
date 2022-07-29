import { lazy, Suspense } from "react";
import { registerInteropCustomElement } from "./componentInteropWrapper";

const CustomRed = lazy(() => import("./customRed"));
const CustomBlue = lazy(() => import("./customBlue"));
const CustomGreen = lazy(() => import("./customGreen"));

function ComponentLoader({
  Component,
}: {
  Component: React.ComponentType<unknown>;
}) {
  return (
    <Suspense fallback={<div>...</div>}>
      <Component />
    </Suspense>
  );
}

function registerComponent(
  tagName: string,
  Component: React.ComponentType<unknown>
) {
  registerInteropCustomElement(tagName, () => (
    <ComponentLoader Component={Component} />
  ));
}

registerComponent("custom-red", CustomRed);
registerComponent("custom-blue", CustomBlue);
registerComponent("custom-green", CustomGreen);
