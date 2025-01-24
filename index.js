HTMLElement.prototype.q = function (selector) {
    return this.querySelector(selector);
};

HTMLElement.prototype.on = function (type, listener, options) {
    this.addEventListener(type, listener, options);
};

class ModalBox extends HTMLElement {
    constructor() {
        super();
        // With a <slot> tag use this code
        const childHTML = this.innerHTML;
        this.innerHTML = "";
        const template = document.querySelector("template.modalbox-456-0");
        this.append(template.content);
        const childSlot = this.querySelector("modalbox-456 slot");
        childSlot.innerHTML = childHTML;
    }
    connectedCallback() {


    }
}
customElements.define("modalbox-456", ModalBox);


class Question extends HTMLElement {
    static get observedAttributes() {
        return ["text"];
    }
    constructor() {
        super();
        // Without slot
        const template = document.querySelector("template.question-321-0");
        this.append(template.content);
    }

    connectedCallback() {

    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (newValue === oldValue) {
            return
        }
        let key = ('set'+name[0].toUpperCase()+name.substr(1,name.length))
        this[key](newValue)
    }

    setText(newVal) {
        this.q("p").textContent = newVal
    }
}
customElements.define("question-321", Question);

// EXAMPLE of using attributes and properties "in sync"
// class MyCustomElement extends HTMLElement {
//     static get observedAttributes() {
//       return ['my-attribute'];
//     }
  
//     attributeChangedCallback(name, oldValue, newValue) {
//       if (name === 'my-attribute') {
//         this.myProperty = newValue;
//       }
//     }
  
//     get myProperty() {
//       return this._myProperty;
//     }
  
//     set myProperty(value) {
//       this._myProperty = value;
//       this.setAttribute('my-attribute', value);
//     }
//   }