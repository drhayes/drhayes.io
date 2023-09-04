function aside(text, title) {
  let id = '';
  if (title === 'Table of Contents') {
    id = 'id="toc" ';
  } else if (title === 'Syndicated Elsewhere') {
    id = 'id="posse" ';
  }
  let titleElement = '';
  if (title) {
    titleElement = `<h4>${title}</h4>
`;
  }
  return `<aside ${id}class="box stack">
  ${titleElement}${text}
</aside>`;
}

module.exports = aside;
