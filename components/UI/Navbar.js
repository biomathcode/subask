import { styled } from "@stitches/react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

const Container = styled("nav", {
  display: "flex",
  fontFamily: "sans-serif",
  flexDirection: "row",
  borderBottom: "2px solid #eee",
  justifyContent: "space-around",
  alignItems: "center",
  alignContent: "center",
  height: "50px",
  width: "100vw",
  position: "fixed",
  // background: "#fff",
  backdropFilter: "blur(8px)",
  zIndex: 1000,
});

const Item = styled("div", {
  fontWeight: "bold",

  color: "#333",
  cursor: "pointer",
});

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <>
      <Container>
        <Link href="/">
          <Item>SubAsk</Item>
        </Link>
        {session ? (
          <Link href="/profile">
            <div className="flex center ">
              <img
                width="20px"
                height="20px"
                style={{ borderRadius: "50%" }}
                src={session.user.image}
                alt={session.user.email}
              />
              <p
                style={{
                  fontSize: "12px",
                  color: "#4b4b4b",
                }}
              >
                {session.user.name}
              </p>
            </div>
          </Link>
        ) : (
          <Item onClick={() => signIn("github")}>Login </Item>
        )}
      </Container>
    </>
  );
};

export default Navbar;
