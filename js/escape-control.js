const closeFunctions = [];
let escListener = null;

const onDocumentEscape = (evt) => {
  if (evt.key === 'Escape') {

    const index = closeFunctions.length - 1;

    if (closeFunctions[index].condition && !closeFunctions[index].condition()) {
      return;
    }
    closeFunctions[index].closeFn();
    closeFunctions.length = closeFunctions.length - 1;
    if (!closeFunctions.length) {
      escListener = document.removeEventListener('keydown', onDocumentEscape);
    }
  }
};

export const setEscapeControl = (closeFunction, condition = null) => {
  closeFunctions.push({
    closeFn: closeFunction,
    condition
  });

  if (!escListener) {
    escListener = document.addEventListener('keydown', onDocumentEscape);
  }
};

export const removeEscapeControl = () => {
  closeFunctions.length = closeFunctions.length - 1;
  if (!closeFunctions.length) {
    escListener = document.removeEventListener('keydown', onDocumentEscape);
  }
};
