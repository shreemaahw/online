class ShreemaaDetails extends HTMLElement {
    constructor() { super(); }

    connectedCallback() {
        this.innerHTML = `
        <div class="row">
            <div class="col d-flex justify-content-center">
                <div>
                    <h4>Shree Maa Hardwares</h4>
                    <h6><i class="icofont-user-alt-7"></i> Sukumar Manna</h6>
                    <h6><i class="icofont-phone"></i> + <i class="icofont-brand-whatsapp"></i> 9732838451</h6>
                    <h6><i class="icofont-google-map"></i> Rathtala, Kakdwip, 24 PGS(s), 743347</h6>
                </div>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col">
                <button class="btn back-button pl-0">
                    <i class="icofont-arrow-left icofont-2x"></i>
                </button>
            </div>
        </div>
        `;
        this.getElementsByClassName('back-button')[0].addEventListener('click', () => {
            showGroupContainerRow();
        });
    }
}

customElements.define('shreemaa-details', ShreemaaDetails);
