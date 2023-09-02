function aside(text, title) {
  let id = '';
  if (title === 'Table of Contents') {
    id = 'id="toc" ';
  } else if (title === 'Syndicated Elsewhere') {
    id = 'id="posse" ';
  }
  return `<aside ${id}class="box stack">
  <h4>${title}</h4>
  ${text}
</aside>`;
}

module.exports = aside;
