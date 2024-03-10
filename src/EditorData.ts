import React from "react";
import { getFont } from "./utils";

export type t_Line = null | HTMLSpanElement;
export type t_Lines = t_Line[];
export type t_LineRef = { current:  null | HTMLSpanElement };
export type t_EditorRef = null | React.RefObject<HTMLDivElement>;
export type t_CaretPosition = {
  stringIndex: number
};
export type t_CaretTextArea = null | HTMLTextAreaElement;

class EditorData {
  lines: t_Lines;
  currentLineIndex: number;
  currentLine: t_Line;
  editorRef: t_EditorRef;
  caretPosition: t_CaretPosition;
  caretTextArea: t_CaretTextArea;

  constructor () {
    this.currentLine = null;
    this.editorRef = null;
    this.lines = [];
    this.currentLineIndex = -1;
    this.caretPosition = { stringIndex: 0 };

    this.caretTextArea = null;
  }

  setCurrentLineIndex (index: number) {
    if (index < 0 || index > this.lines.length) { return; }
    this.currentLineIndex = index;
    this.currentLine = this.lines[this.currentLineIndex];
  }

  addLineAtPosition (line: t_Line, index: number) {
    if (index < 0 || index > this.lines.length || !line) { return; }
    this.lines.splice(index, 0, line);
    this.setCurrentLineIndex(index);
    this.editorRef?.current?.replaceChildren(...this.lines.map((line) => line || ''));
  }

  updateCaretPosition () {
    let measureText;
    const { stringIndex } = this.caretPosition;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const font = getFont(
      window.getComputedStyle(this.currentLine!).getPropertyValue('font-style'),
      window.getComputedStyle(this.currentLine!).getPropertyValue('font-weight'),
      window.getComputedStyle(this.currentLine!).getPropertyValue('font-size'),
      window.getComputedStyle(this.currentLine!).getPropertyValue('line-height'),
      window.getComputedStyle(this.currentLine!).getPropertyValue('font-family')
    );
    let width = 16 * this.caretPosition.stringIndex, height = 16 * this.currentLineIndex;
    if (context?.font) {
      context.font = font || "";
      measureText = context.measureText(
        this.currentLine?.textContent?.substring(0, stringIndex) || ""
      )
      width = measureText.width;
      height = (measureText.actualBoundingBoxAscent + measureText.actualBoundingBoxDescent) * this.currentLineIndex;
    }
    this.caretTextArea!.style.left = `${width}px`;
    this.caretTextArea!.style.top = `${height}px`;
  }
}

export default new EditorData();
