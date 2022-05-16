class OrderSummary extends HTMLElement {
    static get observedAttributes() {
        return ['refreshstatus'];
    }
    _itemContainer;
    _cardFooter;
    _totalAmountEle;
    _selectedItemsInCart;
    constructor() { super(); }

    connectedCallback() {
        this.innerHTML = `
        <div class="card">
            <div class="card-header"><h5>আইটেম ডিটেলস</h5></div>
            <div class="card-body pb-0"></div>
            <div class="card-footer py-0 d-none">
                <div class="order-item input-group">
                    <div class="d-flex w-100">
                        <div class="w-50 d-flex justify-content-end pr-1"><b>Total</b></div>
                        <div class="w-50"><b class="total-amount"></b></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row my-4">
            <div class="col">
                <button class="order-button btn btn-primary btn-block">অর্ডার করুন</button>
            </div>
        </div>
        `;
        this._itemContainer = this.getElementsByClassName('card-body')[0];
        this._cardFooter = this.getElementsByClassName('card-footer')[0];
        this._totalAmountEle = this.getElementsByClassName('total-amount')[0];
        this.getElementsByTagName('button')[0].addEventListener('click', () => {
            this.isFormValid() && this.dispatchEvent(new CustomEvent('order'));
        });
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (newValue === 'refresh') { this.render(); }
    }

    render() {
        this._itemContainer.innerHTML = '';
        this._selectedItemsInCart = localStorage.getItem('selectedItemsInCart');
        if (this._selectedItemsInCart) {
            this._selectedItemsInCart = JSON.parse(this._selectedItemsInCart);
            this._selectedItemsInCart.forEach((item, index) => {
                const orderItem = this.getElement('div', 'order-item input-group mb-3');
                const inputLabel = this.getElement('div', 'input-group-text w-100');
                const itemName = this.getElement('span', '', item.itemName + ' (Rs. ' + item.currentPrice + '/' + item.unit + ')');
                const cancelIcon = this.getElement('i', 'icofont-close-line-squared-alt icofont-2x ml-auto');
                cancelIcon.addEventListener('click', () => {
                    this.cancelSelectedItem(index);
                });
                const inputContainer = this.getElement('div', 'd-flex w-100');
                const input = this.getElement('input', 'form-control border-right-0 w-50');
                input.type = 'number';
                input.placeholder = 'পরিমান';
                input.addEventListener('input', (e) => {
                    this.calculatePrice(e.target, item.currentPrice);
                });
                const subTotal = this.getElement('div', 'sub-total w-50 border-right border-bottom');
                subTotal.addEventListener('click', (e) => {
                    e.target.previousSibling.focus();
                });
                input.addEventListener('blur', (e) => {
                    this.saveInLocal(e.target.value, item);
                    this.calculateTotalPrice();
                });
                inputLabel.appendChild(itemName);
                inputLabel.appendChild(cancelIcon);
                orderItem.appendChild(inputLabel);
                inputContainer.appendChild(input);
                inputContainer.appendChild(subTotal);
                orderItem.appendChild(inputContainer);
                this._itemContainer.appendChild(orderItem);
                if (item['quantity']) {
                    input.value = item['quantity'];
                    this.calculatePrice(input, item.currentPrice);
                }
            });
            this.calculateTotalPrice();
            this.setAttribute('refreshstatus', 'refreshed');
        }
    }

    saveInLocal(quantity, item) {
        item['quantity'] = quantity;
        localStorage.setItem('selectedItemsInCart', JSON.stringify(this._selectedItemsInCart));
    }

    getElement(name, className, innerText) {
        const ele = document.createElement(name);
        className && (ele.className = className);
        innerText && (ele.innerText = innerText);
        ele.appendChild
        return ele;
    }

    calculatePrice(inputEle, currentPrice) {
        const value = inputEle.value;
        inputEle.nextSibling.innerText = '= Rs. ' + (value * currentPrice) + '/-';
    }

    calculateTotalPrice() {
        let localData = localStorage.getItem('selectedItemsInCart');
        if (localData) {
            localData = JSON.parse(localData);
            let totalAmount = 0;
            localData.forEach(item => {
                const quantity = item['quantity'];
                if (quantity) {
                    const currentPrice = item['currentPrice'];
                    totalAmount = totalAmount + (quantity * currentPrice);
                }
            });
            if (totalAmount > 0) {
                this._cardFooter.classList.remove('d-none');
                this._totalAmountEle.innerText = '= Rs. ' + totalAmount + '/-';
            } else {
                this._cardFooter.classList.add('d-none');
            }
        } else {
            this._cardFooter.classList.add('d-none');
        }
    }

    cancelSelectedItem(index) {
        this._selectedItemsInCart.splice(index, 1);
        if (this._selectedItemsInCart.length > 0) {
            localStorage.setItem('selectedItemsInCart', JSON.stringify(this._selectedItemsInCart));
        } else {
            localStorage.removeItem('selectedItemsInCart');
        }
        this.render();
        if (this._itemContainer.children.length === 0) {
            this._itemContainer.innerHTML = '<p>হোম পেজে ব্যাক করে আইটেম সিলেক্ট করুন</p>';
        }
    }

    isFormValid() {
        let formValid = true;
        const inputList = Array.from(this.getElementsByTagName('input'));
        inputList.forEach(input => {
            if (!input.value) {
                input.classList.add('required-error-message');
                input.placeholder = 'পরিমান লিখুন';
                formValid = false;
            }
        });
        return formValid;
    }
}

customElements.define('order-summary', OrderSummary);
