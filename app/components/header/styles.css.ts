import { style } from "@vanilla-extract/css";
import { buttonBase } from "../base.css";

export const header = style({
  backgroundColor: "#333",
  color: "#fff",
  display: "flex",
  justifyContent: "space-between",
  padding: "1rem 1.5rem",
  position: "fixed",
  top: 0,
  left: 0,
  width: "calc(100% - 3rem)",
  zIndex: 100,
});

export const logo = style({
  color: "#fff",
  textDecoration: "none",
  fontSize: "1.5rem",
  fontWeight: "bold",
});

export const user = style({
  fontWeight: "bold",
});

export const button = style([
  buttonBase,
  {
    border: "solid 1px #fff",
    backgroundColor: "#fff3",
    textDecoration: "none",
  },
]);
