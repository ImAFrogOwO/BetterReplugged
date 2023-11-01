import { filters } from "replugged/dist/renderer/modules/webpack"

/* eslint-disable @typescript-eslint/no-unnecessary-condition */
const Filters =
{
  byStoreName(filters) {
    return (c) => c?.getName?.() == filters
  },
  byProps(filters) {
    return filters.byProps(filters)
  },
  byKeys(filters) {
    return filters.byProps(filters)
  },
  byValue(filters) {
    return filters.byValue(filters)
  },
  byStrings: (...filter) => {
    return (module) => {
      return filter.every(s => filters.bySource(s)(module)); // THIS DOESNT WORK YET. NONE DO
    }
  }
}

export default { Filters }
