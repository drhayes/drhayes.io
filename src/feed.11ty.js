const RSS = require('rss');
const { URL } = require('url');

class Feed {
  data() {
    return {
      permalink: '/feed.xml',
      layout: false,
      eleventyExcludeFromCollections: true,
    };
  }

  render(data) {
    const { eleventy, collections, site } = data;
    const feed = new RSS({
      title: site.name,
      description: site.subtitle,
      generator: eleventy.generator,
      feed_url: new URL('/feed.xml', site.host).toString(),
      site_url: site.host,
      image_url: new URL('/img/raven.png', site.host).toString(),
      copyright: site.copyright,
    });

    const allThings = collections.all;

    // Add (almost) all the things to the feed.
    for (const thing of allThings) {
      if (!thing.data.permalink) {
        continue;
      }

      const { title, updated, date } = thing.data;
      feed.item({
        title: title,
        description: thing.templateContent,
        url: new URL(thing.url, site.host).toString(),
        date: updated || date,
      });
    }

    return feed.xml({ indent:true });
  }
}

module.exports = Feed;
