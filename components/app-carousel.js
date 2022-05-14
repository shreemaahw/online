class AppCarousel extends HTMLElement {
    constructor() { super(); }
    connectedCallback() {
        this.innerHTML = `
        <div class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img class="d-block w-100 img img-fluid" src="./img/shree_maa.jpg">
                    <div class="carousel-caption d-block">
                        <h5>First slide</h5>
                        <p>First slide</p>
                    </div>
                </div>
                <div class="carousel-item">
                    <img class="d-block w-100 img img-fluid" src="./img/shree_maa.jpg">
                    <div class="carousel-caption d-block">
                        <h5>Second slide</h5>
                        <p>Second slide</p>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
}

customElements.define('app-carousel', AppCarousel);
