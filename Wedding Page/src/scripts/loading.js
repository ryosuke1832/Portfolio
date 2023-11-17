
// 読み込みが完了したら読み込み画面を非表示にする
window.addEventListener('load', () => {
  setTimeout(() => {
      document.querySelector('.loading-screen').style.display = 'none';
  }, 250); // 0.5秒後に読み込み画面を非表示にする
});

// 読み込み進行度をアニメーションで表示する
const progress = document.getElementById('loading-progress');
const percentage = document.getElementById('loading-percentage');
let width = 0;
const interval = setInterval(() => {
  if (width >= 100) {
      clearInterval(interval);
  } else {
      width++;
      progress.style.width = width + '%';
      percentage.textContent = width + '%';
  }
}, 0.3); // 進行度バーの更新間隔を20ミリ秒に設定

