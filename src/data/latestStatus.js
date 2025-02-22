const fetch = require('@11ty/eleventy-fetch');

async function latestStatus() {
  const statusUrl = 'https://api.omg.lol/address/drhayes/statuses/latest';

  // Help me and Adam to figure out what's going on here.
  try {
    const requestIdResponse = await fetch('https://neatnik.net/inspector/', {
      duration: '4h',
      type: 'text',
    });
    console.log(`Request ID: ${requestIdResponse}`);
  } catch (error) {
    console.error('Error fetching request from inspector', error);
  }

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
