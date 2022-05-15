class OrderSummary extends HTMLElement {
    itemList
    set itemList(value) { this._itemList = value; this.render(); }
    get itemList() { return this._itemList; }
    constructor() { super(); }

    connectedCallback() {
        this.innerHTML = `
        <div class="card">
            <div class="card-header">
                <h5> Order details </h5>
            </div>
            <div class="card-body">
                <div class="order-item input-group mb-3">
                    <div class="input-group-text w-100">
                        <span>
                            শ্যামের পাতি (Rs. 98.5/-)
                        </span>
                        <i class="icofont-close-line-squared-alt icofont-2x ml-auto"></i>
                    </div>
                    <input type="number" class="form-control w-100" placeholder="পরিমান">
                </div>
                <div class="order-item input-group mb-3">
                    <div class="input-group-text w-100">
                        <span>
                            শ্যামের এঙ্গেল (Rs. 96/-)
                        </span>
                        <i class="icofont-close-line-squared-alt icofont-2x ml-auto"></i>
                    </div>
                    <input type="number" class="form-control w-100" placeholder="পরিমান">
                </div>
                <div class="order-item input-group mb-3">
                    <div class="input-group-text w-100">
                        <span>
                            শ্যামের Z (Rs. 88/-)
                        </span>
                        <i class="icofont-close-line-squared-alt icofont-2x ml-auto"></i>
                    </div>
                    <input type="number" class="form-control w-100" placeholder="পরিমান">
                </div>
            </div>
        </div>
        <div class="row my-4">
            <div class="col">
                <button class="btn btn-primary btn-block d-flex justify-content-center align-items-center" style="box-shadow: 1px 1px 5px black;">
                    <i class="icofont-whatsapp text-light icofont-2x"></i>
                    হোয়াটস্ অ্যাপে অর্ডার করুন
                    <i class="icofont-whatsapp text-light icofont-2x"></i>
                </button>
            </div>
        </div>
        `;
        this.getElementsByTagName('button')[0].addEventListener('click', () => {
            // this.sendToWhatsapp();
        });
    }

    render() {
    }

    // {
    //     name: 'সুখেন্দু পড়ুয়া',
    //     address: 'উকিলের বাজার',
    //     mobile: '7798986540'
    // }
    getUserDetailsFormLocal() {
        let userDetails = localStorage.getItem('userInfo');
        if (userDetails) {
            const missingInfo = [];
            userDetails = JSON.parse(userDetails);
            !userDetails['name'] && (missingInfo.push('name'));
            !userDetails['mobile'] && (missingInfo.push('mobile'));
            !userDetails['address'] && (missingInfo.push('address'));
            if (missingInfo.length > 0) {
                this.dispatchEvent(new CustomEvent('userDetailsError', { detail: missingInfo.toString() }));
                return undefined;
            } else {
                return userDetails;
            }
        } else {
            this.dispatchEvent(new CustomEvent('userDetailsError', { detail: 'name,mobile,address' }));
        }
    }

    sendToWhatsapp() {
        const userDetails = this.getUserDetailsFormLocal();
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
}

customElements.define('order-summary', OrderSummary);
