const isDev = require('./isDev');

const siteData = {
  "name": "drhayes.io",
  "subtitle": "The personal site of David Hayes.",
  "host": "https://drhayes.io",
  "domain": "drhayes.io",
  "language": "en",
  "author": {
    "name": "David Hayes",
    "email": "hi@drhayes.io",
    "link": "https://drhayes.io",
    "avatar": "https://drhayes.io/img/raven.png"
  },
  "copyright": "This work is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License.",
  "googleSiteVerification": "62OprotnkXjdlu5isXeGX010S3smwpIK4aHKez_WBJU",
  "badRobots": [
    "ChatGPT-User",
    "GPTBot",
    "Googlebot",
    "Googlebot-Image",
    "bingbot",
    "redditbot",
    "yandex"
  ]
};

if (isDev) {
  siteData.host = "http://localhost:3000";
}

module.exports = siteData;
