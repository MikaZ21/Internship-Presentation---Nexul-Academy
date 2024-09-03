// Optional: Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

function smoothScroll(target) {
    const element = document.querySelector(target);
    const elementPosition = element.getBoundingClientRect().top; // スライドの位置を取得
    const startPosition = window.scrollY; // 現在のスクロール位置を取得（window.pageYOffsetの代わりにwindow.scrollYを使用）
    const distance = elementPosition; // 現在位置から目標位置までの距離
    const duration = 1000; // アニメーションの持続時間（ミリ秒）
    let start = null;

    function animationScroll(currentTime) {
        if (start === null) start = currentTime; // アニメーションの開始時刻を設定
        const timeElapsed = currentTime - start;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run); // 現在の位置にスクロール

        if (timeElapsed < duration) requestAnimationFrame(animationScroll); // アニメーションを続ける
    }

    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animationScroll);
}

document.addEventListener('scroll', function() {
    const scrollUpButton = document.querySelector('.scroll-up-button'); // ボタンの要素を取得
    const slide3 = document.getElementById('slide3'); // スライド3の要素を取得
    
    // スライド3の中間位置を計算
    const middleOfSlide3 = slide3.offsetTop + (slide3.offsetHeight / 2);
    
    // 現在のスクロール位置
    const scrollPosition = window.scrollY + window.innerHeight;
    
    // スクロール位置がスライド3の中間を超えた場合
    if (scrollPosition > middleOfSlide3) {
        scrollUpButton.style.opacity = '1'; // ボタンを表示
    } else {
        scrollUpButton.style.opacity = '0'; // ボタンを非表示
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// slide.5
function showTooltip(event) {
    const tooltip = document.getElementById("codeTooltip");
    
    // クリックした要素の位置を取得
    const rect = event.target.getBoundingClientRect();
    
    // ツールチップの位置を調整して表示
    tooltip.style.left = `${rect.left}px`;
    tooltip.style.top = `${rect.bottom + window.scrollY}px`;
    tooltip.style.display = "block";
}

function hideTooltip() {
    document.getElementById("codeTooltip").style.display = "none";
}

// 外側をクリックするとツールチップを非表示にする
window.onclick = function(event) {
    const tooltip = document.getElementById("codeTooltip");
    if (!event.target.matches('.clickable-code') && !tooltip.contains(event.target)) {
        hideTooltip();
    }
};