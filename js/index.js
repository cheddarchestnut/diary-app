window.onload = function () {
  const entriesList = document.getElementById('entriesList');
  const searchInput = document.getElementById('searchInput');
  let entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];

  function displayEntries(filteredEntries) {
    entriesList.innerHTML = '';

    if (filteredEntries.length === 0) {
      entriesList.innerHTML = "<p>No matching entries found.</p>";
      return;
    }

    filteredEntries.forEach(entry => {
      const div = document.createElement('div');
      div.classList.add('entry');

      div.innerHTML = `
        <h3><a href="detail.html?id=${entry.id}">${entry.title}</a></h3>
        <p><strong>Date:</strong> ${entry.date}</p>
        <div>
          <button onclick="deleteEntry(${entry.id})">Delete</button>
          <a href="edit.html?id=${entry.id}"><button>Edit</button></a>
        </div>
        <hr>
      `;

      entriesList.appendChild(div);
    });
  }

  displayEntries(entries);

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const keyword = this.value.toLowerCase();
      const filtered = entries.filter(entry =>
        entry.title.toLowerCase().includes(keyword)
      );
      displayEntries(filtered);
    });
  }
};

function deleteEntry(id) {
  if (!confirm("Are you sure you want to delete this entry?")) return;

  let entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
  entries = entries.filter(entry => entry.id !== id);
  localStorage.setItem('diaryEntries', JSON.stringify(entries));
  location.reload();
}
