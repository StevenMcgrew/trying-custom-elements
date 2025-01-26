(() => {
    HTMLElement.prototype.q = function (selector) {
        return this.querySelector(selector);
    };

    HTMLElement.prototype.on = function (type, listener, options) {
        this.addEventListener(type, listener, options);
    };

    // class ModalBox extends HTMLElement {
    //     constructor() {
    //         super();
    //         // With a <slot> tag use this code
    //         const childHTML = this.innerHTML;
    //         this.innerHTML = "";
    //         const template = document.querySelector("template.modalbox-456-0");
    //         this.append(template.content);
    //         const childSlot = this.querySelector("modalbox-456 slot");
    //         childSlot.innerHTML = childHTML;
    //     }
    //     connectedCallback() {


    //     }
    // }
    // customElements.define("modalbox-456", ModalBox);


    // const props = {
    //     text: {
    //         value: String(),
    //         onChange(newValue) {
    //             this.q("p").textContent = newValue;
    //         }
    //     }
    // };


    // class Question extends HTMLElement {
    //     static get observedAttributes() {
    //         return ["text"];
    //     }
    //     constructor() {
    //         super();
    //         // Without slot
    //         const template = document.querySelector("template.question-321-0");
    //         this.append(template.content);
    //     }

    //     attributeChangedCallback(name, oldValue, newValue) {
    //         if (newValue === oldValue) {
    //             return;
    //         }
    //         switch (name) {
    //             case "text":
    //                 props.text.onChange(newValue);
    //         }
    //     }
    // }

    // customElements.define("question-321", Question);


    // EXAMPLE of using attributes and properties "in sync"
    (() => {

        const selector = "template.counter-123";

        const props = {
            heading: String(""),
            count: Number(0)
        };

        const heading_onChange = (comp, newValue) => {
            comp.q("h3").textContent = newValue;
        }

        const count_onChange = (comp, newValue) => {
            comp.q("button").textContent = `Count is: ${newValue}`;
        }

        const onMount = (comp) => {
            // Define event handlers
            comp.q('button').onclick = (e) => {
                comp.count++
            };
        };

        class Counter extends HTMLElement {
            static get observedAttributes() {
                return Object.keys(props);
            }

            #heading = props.heading
            #count = props.count

            constructor() {
                super();
                // Without slot
                const template = document.querySelector(selector);
                this.append(template.content);
            }

            attributeChangedCallback(name, oldValue, newValue) {
                if (oldValue === newValue) { return; }
                switch (name) {
                    case 'heading': this.heading = newValue;
                        break;
                    case 'count': this.count = newValue;
                        break;
                    default:
                        console.warn(`Prop named "${name}" was not found.`);
                }
            }

            get heading() { return this.#heading; }
            set heading(value) {
                value = String(value);
                this.#heading = value;
                heading_onChange(this, value)
                // this.setAttribute('heading', value);
            }

            get count() { return this.#count; }
            set count(value) {
                value = Number(value);
                this.#count = value;
                count_onChange(this, value)
                // this.setAttribute('count', value);
            }

            connectedCallback() {
                onMount(this);
            }
        }
        customElements.define("counter-123", Counter);
    })();


})();