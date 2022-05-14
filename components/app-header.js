class AppHeader extends HTMLElement {
    cart;
    badge;
    glower;
    _selectedItemList = [];
    set selectedItem(item) { this.toggleItem(item); }
    get selectedItem() { return this._selectedItemList; }
    constructor() { super(); }

    connectedCallback() {
        this.innerHTML = `
        <div class='d-flex position-relative'>
            <h3 class='d-flex justify-content-center w-100 py-3 m-0 shop-title'>শ্রীমা হার্ডওয়্যার</h3>
            <div class='ml-auto position-absolute cart-button-container d-none h-100'>
                <button class='btn position-relative h-100'>
                    <i class='icofont-cart-alt icofont-2x text-light'></i>
                    <span class='badge badge-primary position-absolute'></span>
                </button>
                <div class='spinner-grow text-warning position-absolute d-none' role='status'>
                </div>
            </div>
        </div>
        `;
        this.cart = this.getElementsByClassName('cart-button-container')[0];
        this.badge = this.getElementsByClassName('badge')[0];
        this.glower = this.getElementsByClassName('spinner-grow')[0];
        this.dispatchEvent(new CustomEvent('initialized'));
        this.getDataFromLocal();
        this.updateBadge();
        this.getElementsByTagName('button')[0].addEventListener('click', () => {
            showItemOrderRow();
        });
    }

    toggleItem(item) {
        const itemIndex = this.selectedItem.indexOf(item);
        if (itemIndex > -1) {
            this.selectedItem.splice(itemIndex, 1);
        } else {
            this.selectedItem.push(item);
        }
        this.storeDataInLocal();
        this.updateBadge();
    }

    getDataFromLocal() {
        const data = localStorage.getItem('selectedItemsInCart');
        data && (this._selectedItemList = JSON.parse(data));
    }

    storeDataInLocal() {
        localStorage.setItem('selectedItemsInCart', JSON.stringify(this.selectedItem));
    }

    updateBadge() {
        const totalSelectedItem = this.selectedItem.length;
        this.badge.innerText = totalSelectedItem;
        if (totalSelectedItem > 0) {
            this.cart.classList.remove('d-none');
            this.glower.classList.remove('d-none');
            setTimeout(() => {
                this.glower.classList.add('d-none');
            }, 500);
        } else {
            setTimeout(() => {
                this.cart.classList.add('d-none');
            }, 500);
        }
    }
}

customElements.define('app-header', AppHeader);
