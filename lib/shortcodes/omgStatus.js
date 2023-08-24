function omgStatus(status) {
  return `<section class="stack box omg-status" style="--space: 1em;">
  <div class="with-sidebar">
    <p class="omg-emoji">${status.emoji}</p>
    <div class="stack">
      <p>${status.content}</p>
      <div>
        <a href="https://${status.address}.status.lol/${status.id}">View status &raquo;</a>
      </div>
    </div>
  </div>
</section>`;
}

module.exports = omgStatus;
