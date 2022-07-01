// floating button that redirects to the ask page

import { styled } from "@stitches/react";

const FloatingButton = styled("a", {
  position: "fixed",
  bottom: "55px",
  right: "50px",
  fontSize: "16px",
  padding: "5px",
  borderRadius: "50%",
  fontWeight: 600,
  width: "50px",
  height: "50px",
  color: "#eee",
  backgroundColor: "#25292f",
  border: "none",
  display: "flex",
  alignContent: "center",
  alignItems: "center",
  justifyContent: "center",
  verticalAlign: "center",
  zIndex: Infinity,
  "&:hover": {
    backgroundColor: "#333",
    color: "#eee",
  },
});

function AskButton() {
  return (
    <FloatingButton as="a" href="/ask">
      +
    </FloatingButton>
  );
}

export default AskButton;
