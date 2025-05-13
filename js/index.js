window.onload = function() {
  const entriesList = document.getElementById('entriesList');
  const entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];

  if (entries.length === 0) {
    entriesList.innerHTML = "<p>No diary entries yet.</p>";
    return;
  }

  entries.forEach(entry => {
    const div = document.createElement('div');
    div.classList.add('entry');

    div.innerHTML = `
      <h3><a href="detail.html?id=${entry.id}">${entry.title}</a></h3>
      <p><strong>Date:</strong> ${entry.date}</p>
    `;

    entriesList.appendChild(div);
  });
};
<script src="js/index.js"></script>
