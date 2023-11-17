
/* ーーーーーー画面読み込みーーーーーーーーーーーーーーーーーーーー */

window.addEventListener('load', () => {
    // 読み込み進行度をアニメーションで表示する
    const progress = document.getElementById('loading-progress');
    const percentage = document.getElementById('loading-percentage');
    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            // 進行度が100%に達したら、読み込み画面を非表示にする
            setTimeout(() => {
                document.querySelector('.loading-screen').style.display = 'none';
                // 読み込み画面が非表示になったら、スクロールイベントリスナーを追加
                addScrollEventListener();
            }, 250);
        } else {
            width++;
            progress.style.width = width + '%';
            percentage.textContent = width + '%';
        }
    }, 0.3);
});

/* ーーーーーーブロックのスクロール表示ーーーーーーーーーーーーーーーーーーーー */

function addScrollEventListener() {
    // 各情報ブロックを取得
    const blocks = document.querySelectorAll('.information-block');

    // ウィンドウがスクロールされたときのイベントリスナーを追加
    window.addEventListener('scroll', function() {
        blocks.forEach(block => {
            // ブロックの位置が画面内に入ったかをチェック
            const blockTop = block.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (blockTop <= windowHeight) {
                // 画面内に入ったブロックにvisibleクラスを追加
                block.classList.add('visible');
            }
        });
    });

    // 初期スクロール位置でのチェック
    window.dispatchEvent(new Event('scroll'));
}




/* ーーーーーーチーム分け画面の表示ーーーーーーーーーーーーーーーーーーーー */




document.addEventListener('DOMContentLoaded', function() {
    // 他のコード...

    // チーム分け情報のテキストをクリックしたときのイベントリスナーを追加
    document.getElementById('team-info').addEventListener('click', function() {
        // 詳細情報のコンテナにvisibleクラスをトグル
        document.getElementById('team-detail').classList.toggle('visible');
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const teamInfo = document.getElementById('team-info');
    const arrowIcons = document.querySelectorAll('#arrow-icon'); // 矢印要素を取得

    teamInfo.addEventListener('click', function() {
        const detail = document.getElementById('team-detail');

        if(detail.style.height && detail.style.height !== '0px') {
            arrowIcons.forEach(icon => icon.classList.remove('stop-animation')); // アニメーションを再開
        } else {
            arrowIcons.forEach(icon => icon.classList.add('stop-animation')); // アニメーションを停止
        }
    });
});


