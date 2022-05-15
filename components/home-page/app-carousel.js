class AppCarousel extends HTMLElement {
    constructor() { super(); }
    connectedCallback() {
        this.innerHTML = `
        <div class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img class="d-block w-100 img img-fluid" src="./img/shreemaa.jpg">
                </div>
                <div class="carousel-item">
                    <img class="d-block w-100 img img-fluid" src="./img/shyam-1.jpg">
                </div>
                <div class="carousel-item">
                    <img class="d-block w-100 img img-fluid" src="./img/srmb-1.jpg">
                    <div class="carousel-caption d-block">
                        <h5>SRMB</h5>
                        <p>Second slide</p>
                    </div>
                </div>
                <div class="carousel-item">
                    <img class="d-block w-100 img img-fluid" src="./img/shyam-2.jpg">
                </div>
                <div class="carousel-item">
                    <img class="d-block w-100 img img-fluid" src="./img/srmb-2.jpg">
                    <div class="carousel-caption d-block">
                        <h5>SRMB</h5>
                        <p>Second slide</p>
                    </div>
                </div>
                <div class="carousel-item">
                    <img class="d-block w-100 img img-fluid" src="./img/shyam-3.jpg">
                </div>
                <div class="carousel-item">
                    <img class="d-block w-100 img img-fluid" src="./img/srmb-3.jpg">
                    <div class="carousel-caption d-block">
                        <h5>SRMB</h5>
                        <p>Second slide</p>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
}

customElements.define('app-carousel', AppCarousel);
