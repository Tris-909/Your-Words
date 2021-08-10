import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./TextEditor.scss";

const TextEditor = ({ content, setContent }) => {
  return (
    <ReactQuill
      theme="snow"
      value={content}
      onChange={setContent}
      className="ql-editor"
    />
  );
};

export default TextEditor;
