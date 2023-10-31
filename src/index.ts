/* eslint-disable @typescript-eslint/no-invalid-this */

/* eslint-disable @typescript-eslint/require-await */

import { Injector, Logger, webpack, settings } from "replugged";
import { LOwOgger } from './Globals';
import { React, ReactDOM } from "replugged/common";
import WebpackModules from './Webpack';
import Data from './Data';
import Patcher from './Patcher';
import ContextMenu from "./ContextMenu";
import UI from './UI';

const BDCompat =
{
  Plugins: {},
  Webpack: WebpackModules, // Filter will exist. At some point // BdApi.Webpack.Filters
  Patcher,
  ContextMenu,
  Data,
  UI,
  Net: {},
  alert: () => { }, // This should be a function.
  findModuleByProps: WebpackModules.findModuleByProps,
  React: WebpackModules.getModule(x => x?.createElement) ?? React, // "budddi, fac you" - tharki
  ReactDOM: WebpackModules.findModuleByProps("render", "findDOMNode") ?? ReactDOM
}

export async function start(): Promise<void> {
  window.BdApi = BDCompat
  const User = WebpackModules.getModule(x => x?.getCurrentUser)?.getCurrentUser()
  LOwOgger.log(`Hey!! I have started. Welcome to the party!! As an approach to copy discord, ${User.username} I hope you brought pizza!`);
}

export function stop(): void {
  LOwOgger.log('Hey... Can I have a slice before you go.. :((');
  delete window.BdApi;
}
