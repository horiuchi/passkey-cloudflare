import { style } from "@vanilla-extract/css";

export const buttonBase = style({
  border: "none",
  borderRadius: "0.5rem",
  color: "#fff",
  backgroundColor: "#333",
  fontSize: "1rem",
  fontWeight: "bold",
  padding: "0.5rem 1rem",
  marginLeft: "1rem",
  cursor: "pointer",
  transition: "all 0.3s ease-in-out",
  ":hover": {
    opacity: 0.8,
  },
});
