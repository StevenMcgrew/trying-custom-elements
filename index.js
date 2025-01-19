class ModalBox extends HTMLElement {
    constructor() {
        super()
    }
    connectedCallback() {
        const childHTML = this.innerHTML
        this.innerHTML = ""

        const template = document.querySelector("template.modal-box");
        this.append(template.content);

        const childSlot = this.querySelector("modal-box slot");
        childSlot.innerHTML = childHTML
    }
}
customElements.define("modal-box", ModalBox);


class Question extends HTMLElement {
    constructor() {
        super()
    }    connectedCallback() {
        const childHTML = this.innerHTML
        this.innerHTML = ""

        const template = document.querySelector("template.ques-tion");
        this.append(template.content);

        const childSlot = this.querySelector("ques-tion slot");
        childSlot.innerHTML = childHTML
    }
}
customElements.define("ques-tion", Question);