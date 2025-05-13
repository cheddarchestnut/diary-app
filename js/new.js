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

window.onload = function () {
  const avatar = localStorage.getItem('userAvatar');
  const header = localStorage.getItem('userHeader');

  if (avatar) {
    const avatarImg = document.getElementById('avatar');
    if (avatarImg) avatarImg.src = avatar;
  }

  if (header) {
    const headerDiv = document.getElementById('headerBg');
    if (headerDiv) headerDiv.style.backgroundImage = `url(${header})`;
  }
};

function handleImageUpload(inputId, storageKey, targetId, type = 'src') {
  const input = document.getElementById(inputId);
  const target = document.getElementById(targetId);

  if (!input || !target) return;

  input.addEventListener('change', function () {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function () {
      const base64 = reader.result;
      localStorage.setItem(storageKey, base64);

      if (type === 'src') {
        target.src = base64;
      } else if (type === 'bg') {
        target.style.backgroundImage = `url(${base64})`;
      }
    };
    reader.readAsDataURL(file);
  });
}

handleImageUpload('avatarUpload', 'userAvatar', 'avatar', 'src');
handleImageUpload('headerUpload', 'userHeader', 'headerBg', 'bg');

document.getElementById('avatar')?.addEventListener('click', function () {
  document.getElementById('avatarUpload').click();
});

document.getElementById('headerBg')?.addEventListener('click', function () {
  document.getElementById('headerUpload').click();
});
