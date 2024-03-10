import EditorData from "./EditorData";
import { createLine } from "./utils";

export function handlePrintable (currentChar: string) {
  EditorData.currentLine!.textContent += currentChar;
  EditorData.caretPosition.stringIndex += 1;

  EditorData.updateCaretPosition();
}
export function handleBackspace () {
  const content = EditorData.currentLine!.textContent;
  EditorData.currentLine!.textContent = content?.substring(0, content.length - 1) || null;
  EditorData.caretPosition.stringIndex = (EditorData.caretPosition.stringIndex - 1 < 0) ? 0 : EditorData.caretPosition.stringIndex - 1;
}
export function handleFirstLineCreation () {
  const newLine = createLine();
  EditorData.addLineAtPosition(newLine, 0);
}
export function handleEnter () {
  const newLine = createLine();
  EditorData.addLineAtPosition(newLine, EditorData.currentLineIndex + 1);
}
export function handlePaste () {
  if (navigator.clipboard) {
    navigator.clipboard.readText()
    .then((data) => {
      data.split('').forEach((character) => {
        if (character === '\n') {
          handleEnter();
        }
        else {handlePrintable(character);}
      })
    });
  }
}
