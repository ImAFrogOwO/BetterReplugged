/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-invalid-this */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable no-duplicate-imports */
/* eslint-disable new-cap */

import { LOwOgger } from './Globals';
import { React, ReactDOM } from "replugged/common";
import WebpackModules from './Webpack/Webpack';
import Data from './Data/Data';
import Patcher from './Patcher/Patcher';
import ContextMenu from "./ContextMenu/ContextMenu";
import UI from './UI/UI';
import { alert, showConfirmationModal, showNotice } from './BdApi/index'
import { StartCustomNotificationCSS } from "./DOM/DOM";
import DOM from "./DOM/DOM";

const BDCompat =
{
  Plugins: {},
  Logger: LOwOgger,
  Webpack: WebpackModules, // Filters exists. Some don't work ~~prob all but 1~~
  Patcher,
  ContextMenu,
  Data,
  UI,
  Net: {},
  showConfirmationModal,
  showNotice,
  alert, // This should be a function.
  findModuleByProps: WebpackModules.findModuleByProps,
  React: WebpackModules.getModule(x => x?.createElement) ?? React, // "budddi, fac you" - tharki
  ReactDOM: WebpackModules.findModuleByProps("render", "findDOMNode") ?? ReactDOM
}


export async function start(): Promise<void> {
  window.BdApi = BDCompat
  const User = WebpackModules.getModule(x => x?.getCurrentUser)?.getCurrentUser()
  LOwOgger.log(`Hey!! I have started. Welcome to the party!! As an approach to copy discord, ${User.username} I hope you brought pizza!`);
  StartCustomNotificationCSS();

}

export function stop(): void {
  LOwOgger.log('Hey... Can I have a slice before you go.. :((');
  DOM.removeStyle('OwOStylesOwO')
  delete window.BdApi;
}
