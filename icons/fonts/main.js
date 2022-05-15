(() => {
    const groupContainer = document.body.getElementsByTagName('group-container')[0];
    const errorMsgEle = document.body.getElementsByClassName('error-message')[0];
    groupContainer.addEventListener('initialized', () => {
        fetch(`https://shreemaahw.github.io/online/data-file.json?random=${Math.random()}`)
            .then(response => response.json())
            .then(data => {
                errorMsgEle.classList.add('d-none');
                groupContainer.groupData = data;
            }).catch(e => {
                errorMsgEle.classList.remove('d-none');
            });
    });
    groupContainer.addEventListener('itemClicked', (event) => {
        const appHeader = document.body.getElementsByTagName('app-header')[0];
        appHeader.selectedItem = event.detail;
    });
})();

(() => {
    [
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

showItemOrderRow = () => {
    const groupContainerRow = document.body.getElementsByClassName('group-container-page')[0];
    const itemOrderRow = document.body.getElementsByClassName('order-summary-page')[0];
    groupContainerRow.classList.add('d-none');
    itemOrderRow.classList.remove('d-none');
}

showGroupContainerRow = () => {
    const groupContainerRow = document.body.getElementsByClassName('group-container-page')[0];
    const itemOrderRow = document.body.getElementsByClassName('order-summary-page')[0];
    groupContainerRow.classList.remove('d-none');
    itemOrderRow.classList.add('d-none');
}
