// 画像の読み込みが完了してからJSが動くように修正
const img = document.querySelector('.img-responsive');

img.onload = function() {
    startAnimations();
};

// 画像がキャッシュされていてすでに読み込みが完了している場合も考慮
if (img.complete) {
    startAnimations();
}

function startAnimations() {
    // main-titleのテキストを1文字ずつ分離し、アニメーションを実行
    const title = document.querySelector('.main-title');
    const text = title.textContent;
    title.innerHTML = '';
    const chars = Array.from(text).map((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.display = 'inline-block';
        span.style.transform = 'translateY(-1em)';
        span.style.opacity = '0';
        span.style.transition = 'transform 0.2s ease-out, opacity 0.2s ease-out';
        title.appendChild(span);
        return span;
    });

    // 各文字にアニメーションを適用
    chars.forEach((char, index) => {
        const delay = index * 50;
        setTimeout(() => {
            char.style.transform = 'translateY(0)';
            char.style.opacity = '1';
        }, delay);
    });

    // 最後の文字のアニメーションが終わったら、写真の動作を開始
    const totalDelayForTitle = chars.length * 50 + 200; // 200msはアニメーション時間を考慮して追加
    setTimeout(() => {
        initializeObserver();
    }, totalDelayForTitle);

    function initializeObserver() {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    const img = entry.target.querySelector('.img-responsive');
                    const cover = entry.target.querySelector('.img-cover');
                    cover.style.height = `${img.offsetHeight}px`;

                    // スライドが開始する1秒後に、NameとCountをVisibleにする
                    const memberName = entry.target.querySelector('.member-name');
                    const memberCount = entry.target.querySelector('.member-count');
                    setTimeout(() => {
                        memberName.style.visibility = 'visible';
                        memberCount.style.visibility = 'visible';
                    }, 1000);
                }
            });
        });

        document.querySelectorAll('.member-item').forEach(item => {
            observer.observe(item);
        });
    }
}
