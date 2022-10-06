import {Position, Toaster} from "@blueprintjs/core";

export const AppToaster = Toaster.create({
  position: Position.TOP,
  maxToasts: 3,
  usePortal: true
}, document.getElementById('navbar') ?? document.body );