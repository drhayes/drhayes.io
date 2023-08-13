const { Feed } = require('feed');
const { URL } = require('url');
const { getNewestCollectionItemDate } = require('@11ty/eleventy-plugin-rss');

class MyFeed {
  data() {
    return {
      permalink: '/feed.xml',
      layout: false,
      eleventyExcludeFromCollections: true,
    };
  }

  render(data) {
    const { eleventy, collections, site, global } = data;

    function urlize(path) {
      return new URL(path, global.baseUrl).toString();
    }

    const allThings = collections.allTheWriting;
    // Put more recent things first.
    allThings.sort((a, b) => {
      const aDate = a.data.updated || a.date;
      const bDate = b.data.updated || b.date;
      return bDate - aDate;
    });

    const feed = new Feed({
      title: site.name,
      description: site.subtitle,
      id: global.baseUrl,
      link: global.baseUrl,
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

      const { title, updated, description } = thing.data;
      let excerpt = thing.page.excerpt?.trim();
      if (!excerpt) {
        excerpt = thing.excerpt;
      }
      if (!excerpt) {
        excerpt = description;
      }

      feed.addItem({
        title: title || site.name,
        id: urlize(thing.url),
        link: urlize(thing.url),
        description: excerpt,
        content: thing.templateContent,
        url: urlize(thing.url),
        date: updated || thing.date,
      });
    }

    const theFeed = feed.atom1();
    const lines = theFeed.split('\n');
    lines.splice(
      1,
      0,
      '<?xml-stylesheet type="text/xsl" href="/feedStyle.xsl"?>'
    );
    return lines.join('\n');
  }
}

module.exports = MyFeed;
