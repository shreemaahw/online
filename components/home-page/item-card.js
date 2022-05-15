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
                    স্টক:<span class="pl-1 item-stock"></span>
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
            if (this.itemData.stock !== '0') {
                this.toggleItemToLocal();
                this.dispatchEvent(new CustomEvent('itemClicked'));
            } else {
                // this.getElementsByClassName('text-danger')[0].style.fontSize = '20px';
            }
        });
    }

    render() {
        if (this.itemNameEle && this.currentPriceEle && this.oldPriceEle) {
            this.itemNameEle.innerText = this.itemData.itemName;
            this.currentPriceEle.innerText = this.itemData.currentPrice;
            this.oldPriceEle.innerText = this.itemData.lastPrice;
            if (this.itemData.stock !== '0') {
                this.itemStockEle.innerText = this.itemData.stock + ' ' + this.itemData.unit;
            } else {
                this.itemStockEle.innerHTML = '<span class="text-danger">No stock</span>';
            }
            this.isItemInLocalStorage() ? this.itemCardEle.classList.add('opacity-50')
                : this.itemCardEle.classList.remove('opacity-50');
        }
    }

    isItemInLocalStorage() {
        let selectedItemsInCart = localStorage.getItem('selectedItemsInCart');
        if (selectedItemsInCart) {
            selectedItemsInCart = JSON.parse(selectedItemsInCart);
            for (let index = 0; index < selectedItemsInCart.length; index++) {
                if (selectedItemsInCart[index]['itemId'] === this.itemData['itemId']) {
                    return true;
                }
            }
            return false;
        } else {
            return false;
        }
    }

    toggleItemToLocal() {
        let itemPoped = false;
        let selectedItemsInCart = localStorage.getItem('selectedItemsInCart');
        if (selectedItemsInCart) {
            selectedItemsInCart = JSON.parse(selectedItemsInCart);
            for (let index = 0; index < selectedItemsInCart.length; index++) {
                if (selectedItemsInCart[index]['itemId'] === this.itemData['itemId']) {
                    selectedItemsInCart.splice(index, 1);
                    this.itemCardEle.classList.remove('opacity-50');
                    itemPoped = true;
                    break;
                }
            }
            if (itemPoped) {
                (selectedItemsInCart.length === 0) ?
                    localStorage.removeItem('selectedItemsInCart') :
                    localStorage.setItem('selectedItemsInCart', JSON.stringify(selectedItemsInCart));
            } else {
                selectedItemsInCart.push(this.itemData);
                this.itemCardEle.classList.add('opacity-50');
                localStorage.setItem('selectedItemsInCart', JSON.stringify(selectedItemsInCart));
            }
        } else {
            this.itemCardEle.classList.add('opacity-50');
            localStorage.setItem('selectedItemsInCart', JSON.stringify([this.itemData]));
        }
    }
}

customElements.define('item-card', ItemCard);
