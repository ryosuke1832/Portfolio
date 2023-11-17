
document.addEventListener('DOMContentLoaded', () => {
  // アニメーションを適用する要素を取得
  const countElement = document.querySelector('.participant-count');
  const nameElement = document.querySelector('.participant-name');
  const descriptionElement = document.querySelector('.participant-description');
  const imageElement = document.querySelector('.participant-image');

  // アニメーションクラスを追加
  countElement.classList.add('fade-in');
  nameElement.classList.add('fade-in');
  descriptionElement.classList.add('fade-in');
  imageElement.classList.add('fade-in-image');
});
