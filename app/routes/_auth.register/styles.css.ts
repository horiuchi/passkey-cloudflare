import { style } from "@vanilla-extract/css";
import { buttonBase } from "../../components/base.css";

export const container = style({
  display: "flex",
  flexDirection: "column",
});

export const label = style({});

const input = style({
  fontSize: "1.2rem",
  padding: "0.5rem",
  marginTop: "0.5rem",
  border: "none",
  borderRadius: "0.5rem",
});

export const inputText = style([
  input,
  {
    border: "solid 1px #ccc",
  },
]);

export const inputButton = style([
  buttonBase,
  input,
  {
    marginLeft: 0,
    backgroundColor: "#0066ff",
    color: "#fff",
    width: 150,
    alignSelf: "center",
  },
]);
