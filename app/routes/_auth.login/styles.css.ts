import { style } from "@vanilla-extract/css";
import { buttonBase } from "../../components/base.css";

const spacer = style({
  marginTop: "0.5rem",
});

export const btnGoogle = style([
  buttonBase,
  {
    backgroundColor: "#dd4b39",
  },
]);

export const btnPasskey = style([
  buttonBase,
  spacer,
  {
    backgroundColor: "#0066ff",
  },
]);
