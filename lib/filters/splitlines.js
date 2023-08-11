// https://bnijenhuis.nl/notes/automatically-generate-open-graph-images-in-eleventy/
// via https://github.com/sophiekoonin/localghost/
const MAX_CHARACTERS_PER_LINE = 40;

module.exports = function (text) {
  // Split by word.
  const words = text.split(' ');
  // Split into lines of at most length MAX_CHARACTERS_PER_LINE.
  const lines = words.reduce(function (linesSoFar, currentWord) {
    if (!linesSoFar.length) {
      return [currentWord];
    }

    let lastLine = linesSoFar[linesSoFar.length - 1];

    if (lastLine.length + currentWord.length > MAX_CHARACTERS_PER_LINE) {
      // Too long, start new line.
      return [...linesSoFar, currentWord];
    }

    // Add to the last line since we're under the length limit.
    linesSoFar[linesSoFar.length - 1] = lastLine + ' ' + currentWord;

    return linesSoFar;
  }, []);

  return lines;
};
