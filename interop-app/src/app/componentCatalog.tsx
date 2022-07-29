import { lazy } from "react";
import { registerInteropCustomElement } from "./componentInteropWrapper";

const CustomRed = lazy(() => import("./customRed"));
const CustomBlue = lazy(() => import("./customBlue"));
const CustomGreen = lazy(() => import("./customGreen"));

registerInteropCustomElement('custom-red', CustomRed);
registerInteropCustomElement('custom-blue', CustomBlue);
registerInteropCustomElement('custom-green', CustomGreen);
