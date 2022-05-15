class HomePage extends HTMLElement {
    constructor() { super(); }

    connectedCallback() {
        this.innerHTML = `
        <div class="row">
            <div class="col px-0">
                <app-carousel></app-carousel>
            </div>
        </div>
        <div class="row sticky-top bg-light">
            <div class="col bg-steel-5">
                <app-header></app-header>
            </div>
        </div>
        <div class="row bg-steel-2">
            <div class="col">
                <group-container></group-container>
            </div>
        </div>

        <div class="row error-message d-none">
            <div class="col">
                <div class="d-flex flex-column align-items-center justify-content-center">
                    <div class="position-relative">
                        <i class="icofont-ui-wifi icofont-3x text-primary"></i>
                        <i class="icofont-close icofont-3x position-absolute text-danger" style="left: 0;"></i>
                    </div>
                    <p>No Internet!</p>
                </div>
            </div>
        </div>
        `;
        const groupContainer = this.getElementsByTagName('group-container')[0];
        const errorMsgEle = this.getElementsByClassName('error-message')[0];
        groupContainer.addEventListener('initialized', () => {
            fetch(`https://shreemaahw.github.io/online/data-file.json?random=${Math.random()}`)
                .then(response => response.json())
                .then(data => {
                    errorMsgEle.classList.add('d-none');
                    groupContainer.groupData = data;
                }).catch(e => {
                    errorMsgEle.classList.remove('d-none');
                });
        });
        groupContainer.addEventListener('itemClicked', (event) => {
            document.body.getElementsByTagName('app-header')[0].setAttribute('refreshstatus', 'refresh');
        });
    }
}

customElements.define('home-page', HomePage);
