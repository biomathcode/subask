import { styled } from "@stitches/react";
import Image from "next/image";

const FooterContainer = styled("footer", {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
});

function Footer() {
  return (
    <FooterContainer>
      <p>Powered by </p>
      <div className="flex ">
        <Image
          src="/linode_logo.png"
          height="40px"
          width="100px"
          alt="linode_logo"
        />
        <Image
          src="/hashnode_logo.jpg"
          height="40px"
          width="40px"
          alt="hashnode_logo"
        />
      </div>
    </FooterContainer>
  );
}

export default Footer;
