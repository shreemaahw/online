class OrderPage extends HTMLElement {
    static get observedAttributes() {
        return ['showsection'];
    }
    initialized = false;
    constructor() { super(); }

    connectedCallback() {
        this.innerHTML = `
        <div class="row">
            <div class="col">
                <shreemaa-details></shreemaa-details>
            </div>
        </div>

        <div class="row order-summary-row">
            <div class="col">
                <order-summary></order-summary>
            </div>
        </div>
        
        <div class="row user-info-card-row d-none">
            <div class="col">
                <user-info-card></user-info-card>
            </div>
        </div>
        `;
        this.initialized = true;
        this.getElementsByTagName('order-summary')[0].addEventListener('order', () => {
            this.setAttribute('showSection', 'user-info-card-row');
        });
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (this.initialized) {
            oldValue && this.getElementsByClassName(oldValue)[0].classList.add('d-none');
            newValue && this.getElementsByClassName(newValue)[0].classList.remove('d-none');
        }
    }
}

customElements.define('order-page', OrderPage);
