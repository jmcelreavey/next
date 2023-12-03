import { makeAcornComponent } from "../../utility/makeAcornComponent";

export const ListHead = makeAcornComponent("ac-list__head");
export const ListBody = makeAcornComponent("ac-list__body");
export const ListFoot = makeAcornComponent("ac-list__foot");

export const List = Object.assign(makeAcornComponent("ac-list"), {
  Head: ListHead,
  Body: ListBody,
  Foot: ListFoot,
});
