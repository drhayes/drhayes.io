const RSS = require('rss');

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
      feed_url: `${site.host}/feed.xml`,
      site_url: site.host,
      image_url: `${site.host}/img/raven.png`,
      copyright: site.copyright,
    });

    const allThings = collections.all;

    // Add all the things to the feed.
    for (const thing of allThings) {
      const { title, updated, date } = thing.data;
      feed.item({
        title: title,
        description: thing.templateContent,
        url: `${site.host}/${thing.url}`,
        date: updated || date,
      });
    }

    return feed.xml({ indent:true });
  }
}

module.exports = Feed;
