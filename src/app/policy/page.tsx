"use client";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import ReactDraftWysiwyg from "components/forms/plugins/Wysiwug/ReactDraftWysiwyg";
import { useState } from "react";

export default function Page() {
  const [content, setContent] = useState("");
  const [showContent, setShowContent] = useState(false);
  return (
    <Container maxWidth="lg">
      <Button
        onClick={() => {
          setShowContent(!showContent);
        }}
      >
        Hiển thị html
      </Button>
      {showContent && <>{content}</>}
      <ReactDraftWysiwyg data={content} setData={setContent} />
    </Container>
  );
}
