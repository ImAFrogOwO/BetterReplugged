/* eslint-disable no-undefined */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */

import WebpackModules from './Webpack';

const UIConst =
{
  showToast(message, toastType = 1) {
    const { createToast } = WebpackModules.getModule(x => x.createToast);
    const { showToast } = WebpackModules.getModule(x => x.showToast);
    showToast(createToast(message || "Success !", [0, 1, 2, 3, 4, 5].includes(toastType) ? toastType : 1)); // showToast has more then 3 toast types?
    // uhmm.. aschtually waht is 4.
  }
}

export default UIConst;
