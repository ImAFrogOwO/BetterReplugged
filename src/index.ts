/* eslint-disable @typescript-eslint/no-invalid-this */

/* eslint-disable @typescript-eslint/require-await */

import { Injector, Logger, webpack, settings } from "replugged";
import { React, ReactDOM } from "replugged/common";
import WebpackModules from './Webpack';
import Data from './Data';
import Patcher from './Patcher';

const BDCompat =
{
  Plugins: {},
  Webpack: WebpackModules.Webpack,
  Patcher,
  ContextMenu: {},
  Data,
  Net: {},
  alert: () => { }, // This should be a function.
  React: WebpackModules.Webpack.getModule(x => x?.createElement) ?? React, // "budddi, fac you" - tharki
  ReactDOM: WebpackModules.Webpack.findModuleByProps("render", "findDOMNode") ?? ReactDOM
}

export async function start(): Promise<void> {
  window.BdApi = BDCompat
}

export function stop(): void {
  delete window.BdApi;
}
