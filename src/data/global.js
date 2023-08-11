module.exports = {
  baseUrl: process.env.BASE_URL || 'https://drhayes.io',

  isDev() {
    return process.env.NODE_ENV !== 'production';
  },
};
