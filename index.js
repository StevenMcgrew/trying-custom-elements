class ModalBox extends HTMLElement {
    connectedCallback() {
        const childHTML = this.innerHTML
        this.innerHTML = ""

        const template = document.querySelector("template.modal-box");
        this.append(template.content);

        const childSlot = this.querySelector(".childBox");
        childSlot.innerHTML = childHTML
    }
}
customElements.define("modal-box", ModalBox);


class Question extends HTMLElement {
    connectedCallback() {
        const childHTML = this.innerHTML
        this.innerHTML = ""

        const template = document.querySelector("template.ques-tion");
        this.append(template.content);

        const childSlot = this.querySelector(".childBox");
        childSlot.innerHTML = childHTML
    }
}
customElements.define("ques-tion", Question);