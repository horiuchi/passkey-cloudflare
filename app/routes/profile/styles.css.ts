import { style } from "@vanilla-extract/css";
import { buttonBase } from "../../components/base.css";

export const userInfo = style({
  fontSize: "1.2rem",
});

export const row = style({
  display: "flex",
  alignItems: "center",
});

export const userIcon = style({
  width: "2rem",
  height: "2rem",
  borderRadius: "50%",
  boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.2)",
  marginLeft: "0.5rem",
});

export const btnLogout = style([buttonBase, { marginTop: "1rem" }]);
