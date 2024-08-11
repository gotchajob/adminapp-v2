"use client";

import { useState } from "react";

// third-party
import dynamic from "next/dynamic";

import { EditorState as EditorType, EditorProps } from "react-draft-wysiwyg";
import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  EditorState,
} from "draft-js";
const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
import "./react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

// ==============================|| EDITOR ||============================== //

const ReactDraftWysiwyg = ({
  blogDetail,
  setBlogDetail,
}: {
  blogDetail: string;
  setBlogDetail: (data: string) => void;
}) => {
  const [editorState, setEditorState] = useState(() => {
    const blocks = convertFromHTML(blogDetail);
    return EditorState.createWithContent(
      ContentState.createFromBlockArray(blocks.contentBlocks, blocks.entityMap)
    );
  });

  const onEditorStateChange = (editor: EditorType) => {
    setEditorState(editor);
    setBlogDetail(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  };

  return (
    <Editor
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={onEditorStateChange}
    />
  );
};

export default ReactDraftWysiwyg;
