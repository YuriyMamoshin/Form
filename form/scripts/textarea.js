const resizingHandle = document.querySelector(".textarea__handle");
const textareaElement = document.querySelector(".textarea");

let initAreaHeight, initCoordY;

function handlePointerDown(event) {
  initAreaHeight = textareaElement.offsetHeight;
  initCoordY = event.clientY;
  resizingHandle.addEventListener("pointermove", handlePointerMove);
  resizingHandle.setPointerCapture(event.pointerId);
}

function handlePointerUp(event) {
  resizingHandle.removeEventListener("pointermove", handlePointerMove);
  resizingHandle.releasePointerCapture(event.pointerId);
}

function handlePointerMove(event) {
  const heightShift = event.clientY - initCoordY;
  const newHeight = initAreaHeight + heightShift;
  textareaElement.style.height = `${newHeight}px`;
}

resizingHandle.addEventListener("pointerdown", handlePointerDown);
resizingHandle.addEventListener("pointerup", handlePointerUp);
