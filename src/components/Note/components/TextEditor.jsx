import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextEditor = ({ content, setContent }) => {
  return <ReactQuill theme="snow" value={content} onChange={setContent} />;
};

export default TextEditor;
