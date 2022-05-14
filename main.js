(() => {
    [
        './components/app-carousel.js',
        './components/group-container.js',
        './components/item-card.js',
        './components/item-group.js',
    ].forEach(path => {
        var s = document.createElement('script');
        s.setAttribute('src', path);
        document.head.appendChild(s);
    });
})();

(() => {
    fetch('https://shreemaahw.github.io/online/data-file.json')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const groupContainer = document.getElementsByTagName('group-container')[0];
            console.log(groupContainer)
            groupContainer.groupData = data;
        });
})();

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