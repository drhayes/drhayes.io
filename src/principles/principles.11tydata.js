const twDate = require('../../lib/filters/twDate');

function g(data, field) {
  return (data.pagination && data.pagination.items[0][field]) || '';
}

module.exports = {
  eleventyComputed: {
    title: (data) => data.title || g(data, 'title'),
    date: (data) => data.date || twDate(g(data, 'date')),
    updated: (data) => data.date || twDate(g(data, 'updated')),
    description: (data) => data.description || g(data, 'description'),
    content: (data) => data.content || g(data, 'text'),
  },
};
