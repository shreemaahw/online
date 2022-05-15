(() => {
    [
        './components/app-root.js',
        './components/home-page/home-page.js',
        './components/home-page/app-carousel.js',
        './components/home-page/app-header.js',
        './components/home-page/group-container.js',
        './components/home-page/item-card.js',
        './components/home-page/item-group.js',
        './components/order-page/order-page.js',
        './components/order-page/shreemaa-details.js',
        './components/order-page/user-info-card.js',
        './components/order-page/order-summary.js',
    ].forEach(path => {
        var s = document.createElement('script');
        s.setAttribute('src', path);
        document.head.appendChild(s);
    });
})();
