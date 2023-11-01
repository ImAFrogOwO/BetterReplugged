/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { settings } from "replugged";

const DataConfig = await settings.init("BDCompactData");

const Data =
{
  load(name, key) {
    return DataConfig.get(name, {})?.[key];
  },
  save(name, key, value) {
    const Settings = DataConfig.get(name, {}) ?? {};
    Settings[key] = value;
    DataConfig.set(name, Settings);
  }
}

export default Data;
