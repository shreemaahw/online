class AppRoot extends HTMLElement {
    constructor() { super(); }
    connectedCallback() {
        this.innerHTML = `
        <div class="container home-page">
            <div class="row">
                <div class="col">
                    <home-page></home-page>
                </div>
            </div>
        </div>
        <div class="container order-page d-none">
            <div class="row">
                <div class="col">
                    <order-page></order-page>
                </div>
            </div>
        </div>
        `;
    }
}

customElements.define('app-root', AppRoot);
