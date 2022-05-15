class ItemCard extends HTMLElement {
    itemCardEle;
    itemNameEle;
    currentPriceEle;
    oldPriceEle;
    itemStockEle;
    set itemData(value) { this._itemData = value; this.render(); }
    get itemData() { return this._itemData; }
    constructor() { super(); }

    connectedCallback() {
        this.innerHTML = `
        <div class="rounded d-flex small-item-card bg-primary m-2">
            <div class="d-flex flex-column w-100 text-light justify-content-center">
                <p class="shop-name d-flex justify-content-center mb-1 item-name text-nowrap"></p>
                <p class="mb-2 d-flex justify-content-center align-items-center">
                <span class="old-price-style"><i class="icofont-rupee"></i><span class="old-price"></span>/-</span>
                    <i class="icofont-rupee"></i><span class="current-price"></span>/-
                </p>
                <p class="shop-name d-flex justify-content-center mb-1 item-name text-nowrap">
                    স্টক:
                    <span class="item-stock"></span>KGs
                </p>
            </div>
        </div>
        `;
        this.itemCardEle = this.getElementsByClassName('small-item-card')[0];
        this.itemNameEle = this.getElementsByClassName('item-name')[0];
        this.oldPriceEle = this.getElementsByClassName('old-price')[0];
        this.currentPriceEle = this.getElementsByClassName('current-price')[0];
        this.itemStockEle = this.getElementsByClassName('item-stock')[0];
        this.dispatchEvent(new CustomEvent('initialized'));
        this.addEventListener('click', () => {
            this.itemCardEle.classList.toggle('opacity-50');
            this.dispatchEvent(new CustomEvent('itemClicked', { detail: this.itemData }));
        });
    }

    render() {
        if (this.itemNameEle && this.currentPriceEle && this.oldPriceEle) {
            this.itemNameEle.innerText = this._itemData.itemName;
            this.currentPriceEle.innerText = this._itemData.currentPrice;
            this.oldPriceEle.innerText = this._itemData.lastPrice;
            this.itemStockEle.innerText = this._itemData.available;
        }
    }
}

customElements.define('item-card', ItemCard);
