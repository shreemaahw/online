class UserInfoCard extends HTMLElement {
    constructor() { super(); }

    connectedCallback() {
        this.innerHTML = `
        <div class="card">
            <div class="card-header">
                <h5>User Info</h5>
            </div>
            <div class="card-body">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">নাম</span>
                    </div>
                    <input type="text" class="form-control" placeholder="পুরো নাম লিখুন">
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">মোবাইল</span>
                    </div>
                    <input type="number" class="form-control" placeholder="10 সংখ্যার মোবাইল নম্বর দিন">
                </div>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">ঠিকানা</span>
                    </div>
                    <input type="text" class="form-control" placeholder="এড্রেস লিখুন">
                </div>
            </div>
        </div>
        `;
    }
}

customElements.define('user-info-card', UserInfoCard);
