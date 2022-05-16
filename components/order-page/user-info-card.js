class UserInfoCard extends HTMLElement {
    _cardBody;
    _userInputList = [
        { info: 'name', label: 'নাম', placeholder: 'পুরো নাম লিখুন' },
        { info: 'mobile', label: 'মোবাইল', placeholder: '10 সংখ্যার মোবাইল নম্বর দিন' },
        { info: 'address', label: 'ঠিকানা', placeholder: 'এড্রেস লিখুন' }
    ];
    constructor() { super(); }

    connectedCallback() {
        this.innerHTML = `
        <div class="card">
            <div class="card-header"> <h5>আপনার ডিটেলস</h5> </div>
            <div class="card-body"></div>
        </div>
        <div class="row my-4">
            <div class="col">
                <button class="order-button btn btn-primary btn-block d-flex justify-content-center align-items-center">
                    <i class="icofont-whatsapp text-light icofont-2x"></i>
                    হোয়াটস্ অ্যাপে অর্ডার করুন
                    <i class="icofont-whatsapp text-light icofont-2x"></i>
                </button>
            </div>
        </div>
        `;
        this._cardBody = this.getElementsByClassName('card-body')[0];
        this.getElementsByTagName('button')[0].addEventListener('click', () => {
            this.isFormValid() && this.sendToWhatsapp();
        });
        this.render();
    }

    render() {
        let userInfo = localStorage.getItem('userInfo');
        userInfo && (userInfo = JSON.parse(userInfo));
        this._userInputList.forEach(input => {
            const infoItem = this.getElement('div', 'input-group mb-3');
            const inputLabel = this.getElement('div', 'input-group-prepend');
            const inputText = this.getElement('span', 'input-group-text', input['label']);
            const inputTag = this.getElement('input', 'form-control');
            if(input['info'] === 'mobile') {
                inputTag.type = 'number';
                inputTag.addEventListener('input', (e) => {
                    const target = e.target;
                    if (target.value.length > 10) {
                        target.value = target.value.slice(0, 10);
                    }
                });
            } else {
                inputTag.type = 'text';
                inputTag.maxLength = '30';
            }
            inputTag.addEventListener('blur', (e) => {
                this.saveUserInfoToLocal(e.target.value, input['info']);
            });
            inputTag.placeholder = input['placeholder'];
            if (userInfo) {
                inputTag.value = userInfo[input['info']];
            }
            infoItem.appendChild(inputLabel);
            inputLabel.appendChild(inputText);
            infoItem.appendChild(inputTag);
            this._cardBody.appendChild(infoItem);
        });
    }

    saveUserInfoToLocal(value, key) {
        let userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            userInfo = JSON.parse(userInfo);
            userInfo[key] = value;
        } else {
            userInfo = { name: '', mobile: '', address: '' };
            userInfo[key] = value;
        }
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }

    getElement(name, className, innerText) {
        const ele = document.createElement(name);
        className && (ele.className = className);
        innerText && (ele.innerText = innerText);
        ele.appendChild
        return ele;
    }

    sendToWhatsapp() {
        let userDetails = localStorage.getItem('userInfo');
        userDetails && (userDetails = JSON.parse(userDetails));

        let orderDetails = localStorage.getItem('selectedItemsInCart');
        orderDetails && (orderDetails = JSON.parse(orderDetails));

        let text = userDetails['name'] + ' (' + userDetails['mobile'] + ') @' + userDetails['address'] + '%0A%0A';
        orderDetails.forEach(item => {
            text = text + item['itemName'] + ' (' + item['itemId'] + ') ' + item['quantity'] + item['unit'] + '%0A';
        });

        localStorage.removeItem('selectedItemsInCart');

        const a = document.createElement('a');
        a.href = `https://wa.me/7980961274?text=${text}`;
        document.body.appendChild(a);
        a.click();
        a.remove();
    }

    isFormValid() {
        let formValid = true;
        const inputList = Array.from(this.getElementsByTagName('input'));
        inputList.forEach(input => {
            if (!input.value) {
                input.classList.add('required-error-message');
                formValid = false;
            }
        });
        return formValid;
    }
}

customElements.define('user-info-card', UserInfoCard);
