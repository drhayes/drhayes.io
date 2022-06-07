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

    for (const thing of allThings) {
      feed.item({
        title: thing.title,
        description: thing.templateContent,
        url: thing.url,
        date: thing.data.updated || thing.data.date,
      });
    }

    return feed.xml({ indent:true });
  }
}

module.exports = Feed;
