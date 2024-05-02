const md = require('../markdown');

function omgStatus(status) {
  return `<article class="stack box omg-status">
  <div class="stack">
    <div class="with-sidebar">
      <p class="omg-status-icon">${status.emoji}</p>
      <section class="stack omg-status-text">${md.render(status.content)}</section>
    </div>
    </div>
    <div class="text-align:right">
      <a href="https://${status.address}.status.lol/${
    status.id
  }">View status &raquo;</a>
    </div>
  </div>
</article>`;
}

module.exports = omgStatus;
