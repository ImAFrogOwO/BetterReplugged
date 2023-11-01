/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undefined */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */

import { Injector, Logger, webpack } from "replugged";
import Filter from './Filter';

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
  getModule(propertyExpression: (module: any) => any, options: any = {}) {
    const expression = (x: any) => {
      if (options.searchExports) {
        return (
          propertyExpression(x?.exports?.ZP) ||
          propertyExpression(x?.exports?.Z) ||
          propertyExpression(x?.exports?.default) ||
          propertyExpression(x?.exports) || propertyExpression(x)
        );
      } else {
        return (propertyExpression(x?.exports?.default) || propertyExpression(x?.exports));
      }
    };
    return webpack.getModule(expression, options);
  },
  getModules(propertyExpression: (module: any) => any,) {
    return webpack.getModule((x) => propertyExpression(x?.exports?.default), { all: true })
  },
  findModuleByProps(...props) {
    return webpack.getByProps(...props)
  },
  Filters: Filter.Filters
}

export default Webpack;
