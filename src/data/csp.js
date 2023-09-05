const defaultGoesFirst = (a, b) => {
  if (a === 'default') {
    return -1;
  }
  if (b === 'default') {
    return 1;
  }
  return a < b ? -1 : 1;
};

function cspPolicy(configData) {
  const csp = {
    default: 'none',
    child: ['self', 'itch.io', 'www.youtube-nocookie.com'],
    font: 'self',
    frame: [
      'itch.io',
      'www.youtube-nocookie.com',
      'youtube-nocookie.com',
      'youtube.com',
      'www.youtube.com',
    ],
    img: ['*', 'data:', 'media.social.lol', 'webmention.io'],
    manifest: 'self',
    media: 'self',
    object: 'self',
    script: ['self'],
    style: ['self', 'data:', 'unsafe-inline'],
    worker: 'self',
  };

  if (configData.global.isDev) {
    csp.default = ['self', configData.global.baseUrl];
    csp.script.push('unsafe-inline');
  }

  const cspPolicyLine = Object.keys(csp)
    .toSorted(defaultGoesFirst)
    .map((key) => {
      let value = csp[key];
      if (!Array.isArray(value)) {
        value = [value];
      }
      value = value
        .map((v) => {
          if (v == 'self' || v == 'none' || v == 'unsafe-inline') {
            return `'${v}'`;
          }
          return v;
        })
        .join(' ');
      return { key, value };
    })
    .map(({ key, value }) => `${key}-src ${value}`)
    .join('; ');

  return cspPolicyLine;
}

module.exports = cspPolicy;
