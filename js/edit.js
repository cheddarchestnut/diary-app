window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  const entryId = params.get('id');
  const titleInput = document.getElementById('title');
  const contentInput = document.getElementById('content');
  const dateInput = document.getElementById('date');
  const form = document.getElementById('editForm');

  let entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
  const entry = entries.find(item => item.id.toString() === entryId);

  if (!entry) {
    alert("Entry not found!");
    window.location.href = "index.html";
    return;
  }

  titleInput.value = entry.title;
  contentInput.value = entry.content;
  dateInput.value = entry.date;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    entry.title = titleInput.value;
    entry.content = contentInput.value;
    entry.date = dateInput.value;

    const updatedEntries = entries.map(item =>
      item.id.toString() === entryId ? entry : item
    );

    localStorage.setItem('diaryEntries', JSON.stringify(updatedEntries));

    window.location.href = `detail.html?id=${entryId}`;
  });
};
