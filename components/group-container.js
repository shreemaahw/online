class GroupContainer extends HTMLElement {
    groupContainer;
    set groupData(value) {
        this._groupData = value;
        this.render();
    }
    get groupData() {
        return this._groupData;
    }
    constructor() { super(); }

    connectedCallback() {
        this.innerHTML = `
        <div class="row">
            <div class="col group-container">
            </div>
        </div>
        `;
        this.groupContainer = this.getElementsByClassName('group-container')[0];
        this.dispatchEvent(new CustomEvent('initialized'));
    }

    render() {
        if (this.groupContainer) {
            this.groupContainer.innerHTML = '';
            this._groupData.forEach(cardInfo => {
                console.log(cardInfo)
                const row = document.createElement('div');
                row.classList.add('row');
                const col = document.createElement('div');
                col.classList.add('col', 'py-5');
                const itemGroup = document.createElement('item-group');
                itemGroup.addEventListener('initialized', () => {
                    itemGroup.itemData = cardInfo;
                });
                col.appendChild(itemGroup);
                row.appendChild(col);
                this.groupContainer.appendChild(row);
            });
        }
    }
}

customElements.define('group-container', GroupContainer);
