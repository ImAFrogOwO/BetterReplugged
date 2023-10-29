/* eslint-disable no-undefined */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { Injector, Logger, webpack } from "replugged";
import Filters from './Filter';
const Webpack =
{
  require: window.webpackChunkdiscord_app.push([
    [Symbol('OwO')],
    {},
    (require) => require
  ]),
  getStore(string) {
    return webpack.getByStoreName(string)
  },
  getModule(filters, options = {}) {
    return webpack.getModule(filters, options)
  },
  getModules(filters) {
    return webpack.getModule(filters, { all: true })
  },
  findModuleByProps(...props) {
    return webpack.getByProps(...props)
  }

}

export default { Webpack, Filters }
