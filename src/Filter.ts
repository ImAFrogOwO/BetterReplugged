/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { webpack } from "replugged";
import WebpackModules from './Webpack';

const Filters =
{
  byStoreName(filters) {
    return webpack.getByStoreName(filters)
  },
  byProps(filters) {
    return webpack.getByProps(filters)
  },
  byKeys(filters) {
    return webpack.getByProps(filters)
  },
  byValue(filters) {
    return webpack.getByValue(filters)
  },
  byStrings: (filters) => (module) => {
    const moduleString = module?.toString?.() || '';
    return filters.every(s => moduleString.includes(s));
  }
}

export default { Filters }
