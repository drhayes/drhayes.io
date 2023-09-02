const sanitizeHtml = require('sanitize-html');

function makePredicate(propValue) {
  return function (mention) {
    return mention.type === propValue;
  };
}

const isThisUrl =
  (...urls) =>
  (mention) =>
    urls.map((u) => `https://drhayes.io${u}`).includes(mention['wm-target']);
const isValid = (mention) =>
  mention.author &&
  mention.author.name &&
  mention.published &&
  mention.content &&
  // Not sure if this is correct?
  !mention['wm-private'];
const isLike = makePredicate('like-of');
const isMention = makePredicate('mention-of');
const isRepost = makePredicate('repost-of');
const isReply = makePredicate('in-reply-to');
const byPublished = (a, b) => a.published - b.published;

function transform(mention) {
  const newMention = {
    author: mention.author,
    name: mention.name,
    url: mention.url,
    // Interesting that I could use this to find mentions I don't know about yet.
    // e.g. mention[mention['wm-property']] or something.
    // ...but to do what?
    type: mention['wm-property'],
  };
  // Does it have a date? Let's try parsing it.
  const published = mention['published'];
  if (published) {
    try {
      newMention.published = new Date(published);
      // Is our date valid?
      if (isNaN(newMention.published.valueOf())) {
        throw Error(`Invalid date format: ${published}`);
      }
    } catch (e) {
      console.error('Error parsing published date', e);
      // Boy this isn't great. Check to see how often I actually get errors.
      // The isValid check should've guaranteed that I got a published property, but
      // maybe it's not parsing right.
      newMention.published = new Date();
    }
  }
  if (mention.content?.html && mention.content?.html.length > 0) {
    newMention.content = sanitizeHtml(mention.content.html);
  } else if (mention.content?.text) {
    newMention.content = mention.content.text;
  }
  return newMention;
}

function webmentionsByUrl(webmentions, aliases) {
  aliases = aliases || [];
  const data = {
    likes: [],
    reposts: [],
    replies: [],
  };

  if (!webmentions) {
    return data;
  }

  const forThisPage = webmentions
    .filter(isThisUrl(this.page.url, ...aliases))
    .filter(isValid)
    .map(transform);

  data.likes = forThisPage.filter(isLike);
  data.reposts = forThisPage.filter(isRepost).toSorted(byPublished);
  data.replies = forThisPage.filter((m) => isReply(m) || isMention(m));

  return data;
}

module.exports = webmentionsByUrl;
