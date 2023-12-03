import { makeAcornComponent } from "../utility/makeAcornComponent";

export const ModuleHead = makeAcornComponent("ac-module__head");
export const ModuleBody = makeAcornComponent("ac-module__body");
export const ModuleFoot = makeAcornComponent("ac-module__foot");

export const Module = Object.assign(makeAcornComponent("ac-module"), {
  Head: ModuleHead,
  Body: ModuleBody,
  Foot: ModuleFoot,
});
