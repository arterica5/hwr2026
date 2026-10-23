const button = document.querySelector('#copy-channel');
const status = document.querySelector('#copy-status');
button.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('삼성한우리합창단');
    status.textContent = '채널명을 복사했습니다. 카카오톡에서 검색해 주세요.';
  } catch {
    status.textContent = '카카오톡에서 ‘삼성한우리합창단’을 검색해 주세요.';
  }
});
