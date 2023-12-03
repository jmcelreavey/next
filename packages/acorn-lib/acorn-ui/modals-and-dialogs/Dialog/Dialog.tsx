import type { ReactElement } from "react";
import { makeAcornComponent } from "../../utility/makeAcornComponent";

export enum DialogStretch {
  NotStretched = "",
  Horizontally = "+stretch-x",
  Vertically = "+stretch-y",
  FullyStretched = "+stretch",
}

export interface DialogProps {
  stretch?: DialogStretch;
}

export type DialogIcon = ReactElement<SVGElement> | ReactElement<HTMLImageElement> | string;

const DialogFrame = makeAcornComponent("ac-dialog__frame");
const DialogBody = makeAcornComponent("ac-dialog__body");
const DialogFoot = makeAcornComponent("ac-dialog__foot");
const DialogHead = makeAcornComponent("ac-dialog__head");

export const Dialog = Object.assign(
  makeAcornComponent<DialogProps, {}, "dialog", HTMLDialogElement>(
    "ac-dialog",
    undefined,
    "dialog",
    ["stretch"]
  ),
  {
    Frame: DialogFrame,
    Head: DialogHead,
    Body: DialogBody,
    Foot: DialogFoot,
  }
);
