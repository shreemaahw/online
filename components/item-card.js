class ItemCard extends HTMLElement {
    itemNameEle;
    itemPriceEle;
    set itemData(value) { this._itemData = value; this.render(); }
    get itemData() { return this._itemData; }
    constructor() { super(); }

    connectedCallback() {
        this.innerHTML = `
        <div class="rounded bg-primary m-2 shop-card">
            <div class="rounded d-flex small-item-card">
                <div class="d-flex flex-column w-100 text-light justify-content-center">
                    <p class="shop-name d-flex justify-content-center mb-1 item-name">শ্যামের পাতি</p>
                    <p class="mb-2 d-flex justify-content-center align-items-center">
                        <i class="icofont-rupee"></i><span class="item-price">98</span>/-
                    </p>
                </div>
            </div>
        </div>
        `;
        this.itemNameEle = this.getElementsByClassName('item-name')[0];
        this.itemPriceEle = this.getElementsByClassName('item-price')[0];
        this.dispatchEvent(new CustomEvent('initialized'));
    }

    render() {
        if (this.itemNameEle && this.itemPriceEle) {
            this.itemNameEle.innerText = this._itemData.itemName;
            this.itemPriceEle.innerText = this._itemData.currentPrice;
        }
    }
}

customElements.define('item-card', ItemCard);
