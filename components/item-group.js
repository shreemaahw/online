class ItemGroup extends HTMLElement {
    itemGroup
    set itemData(value) { this._itemData = value; this.render(); }
    get itemData() { return this._itemData; }
    constructor() { super(); }

    connectedCallback() {
        this.innerHTML = `
        <h5 class="item-group-title"></h5>
        <div class="d-flex overflow-auto item-group">
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
                this.itemGroup.appendChild(itemCard);
            });
        }
    }
}

customElements.define('item-group', ItemGroup);
