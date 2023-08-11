function omgStatus(status) {
  return `<section class="omg-status">
  <p class="omg-emoji">${status.emoji}</p>
  <div class="omg-content">
    <div>${status.content}</div>
    <a href="https://${status.address}.status.lol/${status.id}">View status &raquo;</a>
  </div>
</section>`;
}

module.exports = omgStatus;
