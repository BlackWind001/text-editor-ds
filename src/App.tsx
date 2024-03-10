import React from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import EditorData, { t_EditorRef, t_LineRef } from "./EditorData";
import {
  handleBackspace,
  handleEnter,
  handleFirstLineCreation,
  handlePrintable,
} from "./handlers";

function App() {
  const editorRef: t_EditorRef = React.useRef(null);
  const currentLine: t_LineRef = React.useRef(null);
  const textareaRef = React.useRef(null);

  React.useEffect(() => {
    if (!editorRef?.current) {
      return;
    }

    EditorData.editorRef = editorRef;
    EditorData.caretTextArea = textareaRef.current;
    EditorData.currentLine = currentLine.current;

    EditorData.caretTextArea!.style.top = "0";
    EditorData.caretTextArea!.style.left = "0";

    EditorData.editorRef.current?.focus();
  }, []);

  /**
   *
   * @param {KeyboardEvent} event
   */
  const keyDownHandler: React.KeyboardEventHandler<HTMLDivElement> = function (
    event
  ) {
    const code = event.code;
    let currentChar;

    // initialize the current char in case it is printable.
    if (code.startsWith("Key")) {
      currentChar = event.key;
    }

    // ensure that a line exists for the printable character to append to.
    if (EditorData.currentLineIndex < 0 && editorRef.current) {
      handleFirstLineCreation();
    }

    if (EditorData.currentLineIndex >= 0) {
      if (currentChar) {
        handlePrintable(currentChar);
      } else if (code === "Backspace") {
        handleBackspace();
      } else if (code === "Enter") {
        handleEnter();
      }
    }
  };

  return (
    <>
      <div className="container">
        <img src={viteLogo} className="logo" alt="Vite logo" />
        <div className="content-editable-text-editor" contentEditable="true" />
        <div className="text-editor-container">
          <div
            className="text-editor"
            ref={editorRef}
            tabIndex={0}
            onKeyDown={keyDownHandler}
          />
          <textarea tabIndex={-1} className="caret" ref={textareaRef} />
        </div>
      </div>
    </>
  );
}

export default App;
