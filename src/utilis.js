const clearElement = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

module.exports = clearElement;
export default clearElement;
