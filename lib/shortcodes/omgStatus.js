function omgStatus(status) {
  return `<article class="stack box omg-status">
  <div class="stack">
    <div class="with-sidebar">
      <p class="align-self:center font-size:s3">${status.emoji}</p>
      <h2 class="omg-status-text">${status.content}</h2>
    </div>
    </div>
    <div class="text-align:right">
      <a href="https://${status.address}.status.lol/${status.id}">View status &raquo;</a>
    </div>
  </div>
</article>`;
}

module.exports = omgStatus;
