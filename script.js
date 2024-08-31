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

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}