const { Feed } = require('feed');
const { URL } = require('url');
const { getNewestCollectionItemDate } = require("@11ty/eleventy-plugin-rss");

class MyFeed {
  data() {
    return {
      permalink: '/feed.xml',
      layout: false,
      eleventyExcludeFromCollections: true,
    };
  }

  render(data) {
    const { eleventy, collections, site } = data;

    function urlize(path) {
      return new URL(path, site.host).toString();
    }

    const allThings = collections.all;

    const feed = new Feed({
      title: site.name,
      description: site.subtitle,
      id: site.host,
      link: site.host,
      language: 'en',
      image: urlize('/img/raven.png'),
      favicon: urlize('/favicon.ico'),
      copyright: site.copyright,
      updated: getNewestCollectionItemDate(allThings),
      generator: eleventy.generator,
      feedLinks: {
        atom: urlize('/feed.xml'),
      },
      author: site.author,
    });


    // Add (almost) all the things to the feed.
    for (const thing of allThings) {
      if (!thing.url) {
        continue;
      }

      const { title, updated  } = thing.data;
      feed.addItem({
        title: title,
        id: urlize(thing.url),
        link: urlize(thing.url),
        description: thing.description,
        content: thing.templateContent,
        url: urlize(thing.url),
        date: updated || thing.date,
      });
    }

    return feed.atom1();
  }
}

module.exports = MyFeed;
