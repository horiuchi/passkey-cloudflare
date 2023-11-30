import { style } from "@vanilla-extract/css";
import { buttonBase } from "../../components/base.css";

export const alert = style({
  color: "#ff0000",
  margin: "0.5rem",
});

const spacer = style({
  marginTop: "0.5rem",
});

export const btnGithub = style([
  buttonBase,
  {
    color: "#000000",
    backgroundColor: "#ffffff",
    border: "1px solid #000000",
    marginLeft: "1rem",
  },
]);

export const btnGoogle = style([
  buttonBase,
  spacer,
  {
    backgroundColor: "#dd4b39",
    marginLeft: "1rem",
  },
]);

export const btnPasskey = style([
  buttonBase,
  spacer,
  {
    backgroundColor: "#0066ff",
    marginLeft: "1rem",
  },
]);
