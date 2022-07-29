import { lazy } from "react";
import { registerInteropCustomElement } from "./componentInteropWrapper";
import { InteropComponent } from "./interopComponent";

const CustomRed = lazy(() => import("./customRed"));
const CustomBlue = lazy(() => import("./customBlue"));
const CustomGreen = lazy(() => import("./customGreen"));

registerInteropCustomElement("custom-red", () => (
  <InteropComponent Component={CustomRed} />
));
registerInteropCustomElement("custom-blue", () => (
  <InteropComponent Component={CustomBlue} />
));
registerInteropCustomElement("custom-green", () => (
  <InteropComponent Component={CustomGreen} />
));
