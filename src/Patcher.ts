import { Injector, Logger, webpack } from "replugged";

const OwOPatcher = new Injector();
const Uninjector = {};
const Patcher =
{
  before: (_, a, b, c) => {
    Uninjector[_] ??= [];
    const uninj = OwOPatcher.before(a, b, function (...all) { return c(all[1], all[0]) });
    Uninjector[_].push(uninj);
    return uninj;
  },
  instead: (_, a, b, c) => {
    Uninjector[_] ??= [];
    const uninj = OwOPatcher.instead(a, b, function (...all) { return c(all[2], all[0], all[1]) });
    Uninjector[_].push(uninj);
    return uninj;
  },
  after: (_, a, b, c) => {
    Uninjector[_] ??= [];
    const uninj = OwOPatcher.after(a, b, function (...all) { return c(all[1], all[0]) });
    Uninjector[_].push(uninj);
    return uninj;
  },
  unpatchAll: (_) => {
    Uninjector[_].forEach(r => r?.());
    Uninjector[_] = [];
  }
}

export default Patcher;
