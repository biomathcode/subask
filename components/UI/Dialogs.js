import React, { useState, useEffect } from "react";
import { styled, keyframes } from "@stitches/react";
import { violet, blackA, mauve, green } from "@radix-ui/colors";
import { Cross2Icon } from "@radix-ui/react-icons";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import Select from "react-select";
import { signIn, useSession } from "next-auth/react";
import useSWR from "swr";
import axiosInstance from "../axios";

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const contentShow = keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
  "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
});

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: blackA.blackA9,
  position: "fixed",
  inset: 0,
  zIndex: "10",

  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },
});

const StyledContent = styled(DialogPrimitive.Content, {
  backgroundColor: "white",
  borderRadius: 6,
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  maxWidth: "450px",
  zIndex: "10",
  maxHeight: "85vh",
  padding: 25,
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },
  "&:focus": { outline: "none" },
});

function Content({ children, ...props }) {
  return (
    <DialogPrimitive.Portal>
      <StyledOverlay />
      <StyledContent {...props}>{children}</StyledContent>
    </DialogPrimitive.Portal>
  );
}

const StyledTitle = styled(DialogPrimitive.Title, {
  margin: 0,
  fontWeight: 500,
  color: mauve.mauve12,
  fontSize: 17,
});

const StyledDescription = styled(DialogPrimitive.Description, {
  margin: "10px 0 20px",
  color: mauve.mauve11,
  fontSize: 15,
  lineHeight: 1.5,
});

// Exports
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogContent = Content;
export const DialogTitle = StyledTitle;
export const DialogDescription = StyledDescription;
export const DialogClose = DialogPrimitive.Close;

// Your app...
const Flex = styled("div", { display: "flex" });
const Box = styled("div", {});

const Button = styled("button", {
  all: "unset",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
  padding: "0 15px",
  fontSize: 15,
  lineHeight: 1,
  fontWeight: 500,
  height: 35,

  variants: {
    variant: {
      violet: {
        backgroundColor: "white",
        color: violet.violet11,
        boxShadow: `0 2px 10px ${blackA.blackA7}`,
        "&:hover": { backgroundColor: mauve.mauve3 },
        "&:focus": { boxShadow: `0 0 0 2px black` },
      },
      green: {
        backgroundColor: green.green4,
        color: green.green11,
        "&:hover": { backgroundColor: green.green5 },
        "&:focus": { boxShadow: `0 0 0 2px ${green.green7}` },
      },
    },
  },

  defaultVariants: {
    variant: "violet",
  },
});

const IconButton = styled("button", {
  all: "unset",
  fontFamily: "inherit",
  borderRadius: "100%",
  height: 25,
  width: 25,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: violet.violet11,
  position: "absolute",
  top: 10,
  right: 10,

  "&:hover": { backgroundColor: violet.violet4 },
  "&:focus": { boxShadow: `0 0 0 2px ${violet.violet7}` },
});

const Fieldset = styled("fieldset", {
  all: "unset",
  display: "flex",
  gap: 20,
  alignItems: "center",
  marginBottom: 15,
});

const Label = styled("label", {
  fontSize: 15,
  color: violet.violet11,
  width: 90,
  textAlign: "right",
});

const Input = styled("input", {
  all: "unset",
  width: "100%",
  flex: "1",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
  padding: "0 10px",
  fontSize: 15,
  lineHeight: 1,
  color: violet.violet11,
  boxShadow: `0 0 0 1px ${violet.violet7}`,
  height: 35,

  "&:focus": { boxShadow: `0 0 0 2px ${violet.violet8}` },
});
const fetchGists = async () => {
  try {
    const result = await axiosInstance.get("/api/gists");

    const files = await result.data.data.data;

    const publicFiles = await files.filter((e) => {
      return e.public === true;
    });

    const newData = await publicFiles.flatMap((el) => {
      const files = Object.values(el.files);

      return files.map((data, i) => {
        return {
          value: el.id + " " + i,
          label: data.filename,
        };
      });
    });
    return newData;
  } catch (e) {
    console.log(e);
    if (e.response.data.status === "Bad credentials") {
      signIn();
    }
  }
};

const DialogDemo = ({ askid }) => {
  const [files, setFiles] = useState();

  const { data: session } = useSession();

  const { data, error } = useSWR(session ? "/api/gists" : null, fetchGists);

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn(); // Force sign in to hopefully resolve error
    }
  }, [session]);

  if (error) {
    return <div>something went wrong</div>;
  }

  const handleSubmit = async () => {
    if (!session) {
      return alert("Please login ");
    }
    const response = await axiosInstance.post("/api/answer", {
      gistId: files.value,
      gistFile: files.label,
      askid,
      authorId: session.user.id,
    });

    if (response) {
      return alert("You answer is Posted!!!");
    }

    console.log(response);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="large">Answer</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Answer</DialogTitle>
        <DialogDescription>
          Choose the Gist which answers the questions.(* Gist should be public)
        </DialogDescription>
        <Flex css={{ margin: "25px 0px", justifyContent: "flex-end" }}>
          <a href="https://gist.github.com" rel="noreferrer" target={"_blank"}>
            <Button as="a">Create Gist</Button>
          </a>
        </Flex>

        {session ? (
          <>
            <Select
              styles={{
                container: (provided, state) => ({
                  ...provided,
                }),
                control: (base) => ({
                  ...base,
                  border: "none",
                }),
              }}
              name="gists"
              value={files}
              placeholder="Choose a gists"
              onChange={(v) => {
                const id = v.value.split(" ")[0];
                setFiles({
                  value: id,
                  label: v.label,
                });
              }}
              options={data}
            />
            <Flex css={{ marginTop: 25, justifyContent: "flex-end" }}>
              <DialogClose asChild>
                <Button onClick={() => handleSubmit()} variant="green">
                  Post
                </Button>
              </DialogClose>
            </Flex>
          </>
        ) : (
          <button onClick={() => signIn("github")} className="btn">
            Login with github
          </button>
        )}

        <DialogClose asChild>
          <IconButton aria-label="Close">
            <Cross2Icon />
          </IconButton>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default DialogDemo;
