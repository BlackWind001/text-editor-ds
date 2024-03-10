export function createLine() {
  const span = document.createElement("span");
  span.classList.add("line");

  return span;
}

export function getFont (fontStyle: string, fontWeight: string, fontSize: string, lineHeight: string, fontFamily: string) {
  return `${fontStyle} ${fontWeight} ${fontSize}/${lineHeight} ${fontFamily}`;
}
