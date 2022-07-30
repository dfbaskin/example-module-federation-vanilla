import { lazy } from "react";
import { registerInteropCustomElement } from "./componentInteropWrapper";
import { InteropComponent } from "./interopComponent";

const CustomRed = lazy(
  () => import("./customRed")
) as React.ComponentType<unknown>;
const CustomBlue = lazy(
  () => import("./customBlue")
) as React.ComponentType<unknown>;
const CustomGreen = lazy(
  () => import("./customGreen")
) as React.ComponentType<unknown>;

registerInteropCustomElement("custom-red", () => (
  <InteropComponent Component={CustomRed} />
));
registerInteropCustomElement("custom-blue", () => (
  <InteropComponent Component={CustomBlue} />
));
registerInteropCustomElement("custom-green", () => (
  <InteropComponent Component={CustomGreen} />
));
