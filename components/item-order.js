class ItemOrder extends HTMLElement {
    itemGroup
    set itemData(value) { this._itemData = value; this.render(); }
    get itemData() { return this._itemData; }
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
        `;
        this.itemGroup = this.getElementsByClassName('item-group')[0];
        this.dispatchEvent(new CustomEvent('initialized'));
    }

    render() {
        if (this.itemGroup) {
            this.getElementsByClassName('item-group-title')[0].innerText = this._itemData.groupName;
            this.itemGroup.innerHTML = '';
            this._itemData.itemList.forEach(cardInfo => {
                const itemCard = document.createElement('item-card');
                itemCard.addEventListener('initialized', () => {
                    itemCard.itemData = cardInfo;
                });
                itemCard.addEventListener('itemClicked', (event) => {
                    this.dispatchEvent(new CustomEvent('itemClicked', { detail: event.detail }));
                });
                this.itemGroup.appendChild(itemCard);
            });
        }
    }
}

customElements.define('item-order', ItemOrder);
