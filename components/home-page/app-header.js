class AppHeader extends HTMLElement {
    static get observedAttributes() {
        return ['refreshstatus'];
    }
    cart;
    badge;
    glower;
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
        this.checkLocalStorage();
        this.getElementsByTagName('button')[0].addEventListener('click', () => {
            this.showOrderPage();
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (newValue === 'refresh') {
            this.checkLocalStorage();
        }
    }

    showOrderPage = () => {
        const homePage = document.body.getElementsByClassName('home-page')[0];
        const orderPage = document.body.getElementsByClassName('order-page')[0];
        homePage.classList.add('d-none');
        orderPage.classList.remove('d-none');
        document.body.getElementsByTagName('order-page')[0].setAttribute('showsection', 'order-summary-row');
        document.body.getElementsByTagName('order-summary')[0].setAttribute('refreshstatus', 'refresh');
    }

    checkLocalStorage() {
        let data = localStorage.getItem('selectedItemsInCart');
        if (data) {
            data = JSON.parse(data);
            this.glowCart(data.length);
        } else {
            this.glowCart(0);
        }
        this.setAttribute('refreshstatus', 'refreshed');
    }

    glowCart(totalSelectedItem) {
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
