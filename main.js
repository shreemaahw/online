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
        './components/app-carousel.js',
        './components/app-header.js',
        './components/group-container.js',
        './components/item-card.js',
        './components/item-group.js',
        './components/item-order.js',
    ].forEach(path => {
        var s = document.createElement('script');
        s.setAttribute('src', path);
        document.head.appendChild(s);
    });
})();

showItemOrderRow = () => {
    const groupContainerRow = document.body.getElementsByClassName('group-container-page')[0];
    const itemOrderRow = document.body.getElementsByClassName('item-order-page')[0];
    groupContainerRow.classList.add('d-none');
    itemOrderRow.classList.remove('d-none');
}

showGroupContainerRow = () => {
    const groupContainerRow = document.body.getElementsByClassName('group-container-page')[0];
    const itemOrderRow = document.body.getElementsByClassName('item-order-page')[0];
    groupContainerRow.classList.remove('d-none');
    itemOrderRow.classList.add('d-none');
}

sendToWhatsapp = () => {
    const userDetails = {
        name: 'সুখেন্দু পড়ুয়া',
        address: 'উকিলের বাজার',
        mobile: '7798986540'
    };
    const cartData = [
        {
            "itemName": "শ্যামের পাতি",
            "amount": "80"
        },
        {
            "itemName": "শ্যামের Z",
            "amount": "70"
        },
        {
            "itemName": "শ্যামের এঙ্গেল",
            "amount": "90"
        },
    ];
    let text = userDetails['name'] + '%0A' + userDetails['address'] + '%0A' + userDetails['mobile'] + '%0A%0A';
    cartData.forEach(item => {
        text = text + item['itemName'] + ' (' + item['amount'] + ')%0A';
    });
    const a = document.createElement('a');
    a.href = `https://wa.me/7980961274?text=${text}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
}