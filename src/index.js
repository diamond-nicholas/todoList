// eslint-disable-next-line quotes
import { render, renderList, renderTaskCount } from "./app";

document.addEventListener(
  'DOMContentLoaded',
  renderList(),
  renderTaskCount(),
  render(),
);

render();
