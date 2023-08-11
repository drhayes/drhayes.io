const fs = require('fs');
const path = require('path');
const Image = require('@11ty/eleventy-img');

const OPEN_GRAPH_IMAGES_DIR = 'og-images';

function ogImageGenerate({ dir }) {
  const outputPath = path.join(dir.output, OPEN_GRAPH_IMAGES_DIR);
  fs.readdir(outputPath, function (err, files) {
    if (err) {
      console.error(err);
      return;
    }

    files
      .filter((filename) => filename.endsWith('.svg'))
      .map((filename) => path.join(dir.output, OPEN_GRAPH_IMAGES_DIR, filename))
      .forEach((filename) => {
        Image(filename, {
          formats: ['jpeg'],
          outputDir: path.dirname(filename),
          filenameFormat: function (id, src, width, format, options) {
            const outputFilename = path.basename(filename, '.svg');
            console.log(`Generating ${outputFilename}.${format}`);
            return `${outputFilename}.${format}`;
          },
        });
      });
  });
}

module.exports = {
  ogImageGenerate,
};
