document.addEventListener('DOMContentLoaded', function () {
    const img = document.querySelector('.img-responsive');

    img.onload = function() {
        startAnimations();
    };

    if (img.complete) {
        img.onload();
    }
});

function startAnimations() {
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

    const totalDelayForTitle = chars.length * 50;

    // 最後の文字のアニメーションが終わったら、写真の動作を開始
    setTimeout(() => {
        initializeObserver();
    }, totalDelayForTitle + 200); // 200msはアニメーション時間を考慮して追加

    function animateOverlayText() {
        const overlayTexts = document.querySelectorAll('.animated-overlay p');
        let totalDelay = 0;

        overlayTexts.forEach(textElement => {
            const chars = Array.from(textElement.textContent);
            textElement.innerHTML = '';
            chars.forEach((char, charIndex) => {
                const span = document.createElement('span');
                span.textContent = char;
                span.style.display = 'inline-block';
                span.style.transform = 'translateY(-1em)';
                span.style.opacity = '0';
                const delayTime = totalDelay + charIndex * 20;
                span.style.transition = `transform 0.2s ease-out ${delayTime}ms, opacity 0.2s ease-out ${delayTime}ms`;
                textElement.appendChild(span);

                setTimeout(() => {
                    span.style.transform = 'translateY(0)';
                    span.style.opacity = '1';
                }, delayTime);
            });
            totalDelay += chars.length * 20 + 200;
        });
    }

    function initializeObserver() {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    const img = entry.target.querySelector('.img-responsive');
                    const cover = entry.target.querySelector('.img-cover');
                    cover.style.height = `${img.offsetHeight}px`;

                    setTimeout(() => {
                        const memberName = entry.target.querySelector('.member-name');
                        const memberCount = entry.target.querySelector('.member-count');
                        memberName.style.visibility = 'visible';
                        memberCount.style.visibility = 'visible';
                    }, 1000);

                    const animatedOverlay = document.querySelector('.animated-overlay');
                    animatedOverlay.style.opacity = '1';
                    animatedOverlay.style.transform = 'translateY(0)';

                    setTimeout(() => {
                        animateOverlayText();
                        const overlayParagraphs = document.querySelectorAll('.animated-overlay p');
                        overlayParagraphs.forEach(p => {
                            p.style.opacity = '1';
                        });
                    }, 1000); // ここのディレイは元のtransitionの時間に合わせて調整
                }
            });
        });

        document.querySelectorAll('.member-item').forEach(item => {
            observer.observe(item);
        });
    }

    chars.forEach((char, index) => {
        const delay = index * 50;
        setTimeout(() => {
            char.style.transform = 'translateY(0)';
            char.style.opacity = '1';
        }, delay);
    });
}
