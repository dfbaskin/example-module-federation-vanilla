import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { InteropComponents } from './app/interopComponents';

import "./app/componentCatalog";

const bodyElem = document.querySelector('body') as HTMLBodyElement;
const rootElem = document.createElement('div') as HTMLDivElement;
rootElem.style.display = "none";
bodyElem.appendChild(rootElem);

const root = ReactDOM.createRoot(rootElem);
root.render(
  <StrictMode>
    <InteropComponents />
  </StrictMode>
);
