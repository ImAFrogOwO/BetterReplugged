/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { webpack } from "replugged";

const Filters =
{
  getByStore(filters) {
    return webpack.getByStoreName(filters)
  },
}

export default { Filters }
