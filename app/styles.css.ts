import { style } from "@vanilla-extract/css";

export const base = style({
  boxSizing: "border-box",
  fontFamily: "sans-serif",
  margin: 0,
  height: "100vh",
});

export const content = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
});
