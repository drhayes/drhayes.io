const italic = /\/\/([\w\d\s,;]+)\/\//gi;
const bold = /''([\w\d\s,;]+)''/gi;

function twText(text) {
  if (!text) {
    return text;
  }

  console.log(text);

  const withItalics = text.replaceAll(italic, '<em>$1</em>');
  const withBold = withItalics.replaceAll(bold, '<b>$1</b>');

  return withBold;
}

module.exports = twText;
