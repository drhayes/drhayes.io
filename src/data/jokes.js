const Airtable = require('airtable');

const jokesBase = Airtable.base('appufjgM8PLuLwDHx');

module.exports = function() {
  return new Promise(function(resolve, reject) {
    const jokes = [];

    jokesBase('Gold').select({
      pageSize: 100,
      sort: [{
        field: 'Name',
        direction: 'desc',
      }],
    })
    .eachPage(function page(records, fetchNextPage) {
      records.forEach(function(record) {
        jokes.push({
          title: record.get('Name'),
          body: record.get('Body'),
          nsfw: record.get('NSFW?'),
        });
      });

      fetchNextPage();
    }, function done(err) {
      if (err) {
        reject(err);
      }
      resolve(jokes);
    });
  });
}
