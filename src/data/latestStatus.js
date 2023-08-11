const fetch = require('@11ty/eleventy-fetch');

async function latestStatus() {
  const statusUrl = 'https://api.omg.lol/address/drhayes/statuses/latest';

  try {
    const statusResponse = await fetch(statusUrl, {
      duration: '4h',
      type: 'json',
      directory: '/tmp/.11ty-cache',
    });
    if (statusResponse.request.status_code !== 200) {
      return;
    }
    return statusResponse.response.status;
  } catch (error) {
    console.error('Error fetching latest status.lol', error);
  }
}

module.exports = latestStatus;
