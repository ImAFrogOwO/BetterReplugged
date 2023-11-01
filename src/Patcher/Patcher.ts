import { Logger, webpack } from "replugged";
import { InjectOwOr } from "../Globals";

const Uninjector = {};
const Patcher =
{
  before: (_, a, b, c) => {
    Uninjector[_] ??= [];
    const uninj = InjectOwOr.before(a, b, function (...all) { return c(all[1], all[0]) });
    Uninjector[_].push(uninj);
    return uninj;
  },
  instead: (_, a, b, c) => {
    Uninjector[_] ??= [];
    const uninj = InjectOwOr.instead(a, b, function (...all) { return c(all[2], all[0], all[1]) });
    Uninjector[_].push(uninj);
    return uninj;
  },
  after: (_, a, b, c) => {
    Uninjector[_] ??= [];
    const uninj = InjectOwOr.after(a, b, function (...all) { return c(all[1], all[0]) });
    Uninjector[_].push(uninj);
    return uninj;
  },
  unpatchAll: (_) => {
    Uninjector[_].forEach(r => r?.());
    Uninjector[_] = [];
  }
}

export default Patcher;
