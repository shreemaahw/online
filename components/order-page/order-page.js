class OrderPage extends HTMLElement {
    constructor() { super(); }

    connectedCallback() {
        this.innerHTML = `
        <div class="row">
            <div class="col">
                <shreemaa-details></shreemaa-details>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <user-info-card></user-info-card>
            </div>
        </div>
        <div class="row my-4">
            <div class="col">
                <order-summary></order-summary>
            </div>
        </div>
        `;
    }
}

customElements.define('order-page', OrderPage);
