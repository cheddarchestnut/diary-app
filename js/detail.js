window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  const entryId = params.get('id');
  const entryDetail = document.getElementById('entryDetail');

  const entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
  const entry = entries.find(item => item.id.toString() === entryId);

  if (!entry) {
    entryDetail.innerHTML = "<p>Entry not found.</p>";
    return;
  }

  entryDetail.innerHTML = `
    <h3>${entry.title}</h3>
    <p><strong>Date:</strong> ${entry.date}</p>
    <p>${entry.content}</p>
  `;
};
