/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { Injector, Logger, webpack } from "replugged";

const Webpack =
{
  getModule(filters, options = {}) {
    return webpack.getModule(filters, options)
  },
  getModules(filters) {
    return webpack.getModule(filters, { all: true })
  },
  findModuleByProps(...props) {
    return this.getModule(_ => props.every(prop => typeof _[prop] !== 'undefined'))
  }
}

export default { Webpack }
