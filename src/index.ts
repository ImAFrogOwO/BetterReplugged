/* eslint-disable @typescript-eslint/no-invalid-this */

/* eslint-disable @typescript-eslint/require-await */

import { Injector, Logger, webpack, settings } from "replugged";
import { React, ReactDOM } from "replugged/common";
import WebpackModules from './Webpack';
import Data from './Data';
import Patcher from './Patcher';
import Filters from './Filter';
const LOwOgger = Logger.plugin('BetterDiscordCompat')
const BDCompat =
{
  Plugins: {},
  Webpack: WebpackModules.Webpack, // Filter will exist. At some point
  Patcher,
  ContextMenu: {},
  Data,
  Net: {},
  alert: () => { }, // This should be a function.
  findModuleByProps: WebpackModules.Webpack.findModuleByProps,
  React: WebpackModules.Webpack.getModule(x => x?.exports?.default?.createElement) ?? React, // "budddi, fac you" - tharki
  ReactDOM: WebpackModules.Webpack.findModuleByProps("render", "findDOMNode") ?? ReactDOM
}

export async function start(): Promise<void> {
  window.BdApi = BDCompat
  const User = WebpackModules?.Webpack?.getModule(x => x?.exports?.default?.getCurrentUser)?.getCurrentUser()
  LOwOgger.log(`Hey!! I have started. Welcome to the party!! As an approach to copy discord, ${User.username} I hope you brought pizza!`);
}

export function stop(): void {
  LOwOgger.log('Hey... Can I have a slice before you go.. :((');
  delete window.BdApi;
}
