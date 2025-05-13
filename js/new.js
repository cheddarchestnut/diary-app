document.getElementById('diaryForm').addEventListener('submit', function(event) {
  event.preventDefault(); 

  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  const date = document.getElementById('date').value;

  const diaryEntry = {
    id: Date.now(),
    title,
    content,
    date
  };

  let entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];

  entries.push(diaryEntry);

  localStorage.setItem('diaryEntries', JSON.stringify(entries));

  window.location.href = 'index.html';
});
