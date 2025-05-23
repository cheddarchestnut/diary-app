document.getElementById('diaryForm').addEventListener('submit', function (event) {
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

function handleImageUpload(inputId, storageKey, targetId, type = 'src') {
  const input = document.getElementById(inputId);
  const target = document.getElementById(targetId);
  if (!input || !target) return;

  input.addEventListener('click', () => {
    input.value = null;
  });

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

    input.value = '';
  });
}

window.addEventListener('DOMContentLoaded', function () {
  const avatar = localStorage.getItem('userAvatar');
  const header = localStorage.getItem('userHeader');

  const avatarImg = document.getElementById('avatar');
  const headerDiv = document.getElementById('headerBg');

  if (avatar && avatarImg) {
    avatarImg.src = avatar;
  }

  if (header && headerDiv) {
    headerDiv.style.backgroundImage = `url(${header})`;
  }

  handleImageUpload('avatarUpload', 'userAvatar', 'avatar', 'src');
  handleImageUpload('headerUpload', 'userHeader', 'headerBg', 'bg');

  if (avatarImg) {
    avatarImg.addEventListener('click', () => {
      document.getElementById('avatarUpload').click();
    });
  }

  if (headerDiv) {
    headerDiv.addEventListener('click', () => {
      document.getElementById('headerUpload').click();
    });
  }

  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  if (hamburger && sidebar) {
    hamburger.addEventListener('click', function () {
      sidebar.classList.toggle('show');
    });
  }
});
