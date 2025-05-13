// ========== 提交表单 ==========
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

// ========== 图像上传处理函数 ==========
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

    // ✨ 关键修复：重置 value 防止重复弹出
    input.value = '';
  });
}

// ========== 页面加载完成后执行 ==========
window.addEventListener('DOMContentLoaded', function () {
  // === 加载头像和背景 ===
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

  // === 注册上传函数 ===
  handleImageUpload('avatarUpload', 'userAvatar', 'avatar', 'src');
  handleImageUpload('headerUpload', 'userHeader', 'headerBg', 'bg');

  // === 点击头像或背景触发上传 ===
  const avatarTrigger = document.getElementById('avatar');
  const headerTrigger = document.getElementById('headerBg');
  if (avatarTrigger) {
    avatarTrigger.addEventListener('click', () => {
      document.getElementById('avatarUpload').click();
    });
  }
  if (headerTrigger) {
    headerTrigger.addEventListener('click', () => {
      document.getElementById('headerUpload').click();
    });
  }

  // === 移动端汉堡菜单功能 ===
  const hamburger = document.getElementById('hamburger');
  const sidebar = document.querySelector('.sidebar');
  if (hamburger && sidebar) {
    hamburger.addEventListener('click', function () {
      sidebar.classList.toggle('show');
    });
  }
});
