function generateIdentifier() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

let identifier = generateIdentifier()

const devScript = `const className = "counter-123";

        const props = {
            heading: String(""),
            count: Number(0)
        };

        const heading_onChange = (comp, newValue) => {
            comp.q("h3").textContent = newValue;
        };

        const count_onChange = (comp, newValue) => {
            comp.q("button").textContent = "Count is: " + newValue;
        };

        const onMount = (comp) => {
            comp.q('button').onclick = (e) => {
                comp.count++;
            };
        };`




console.log(`(() => {
    HTMLElement.prototype.q = function (selector) {
        return this.querySelector(selector);
    };

    HTMLElement.prototype.on = function (type, listener, options) {
        this.addEventListener(type, listener, options);
    };

    function type(props, key) {
        switch(typeof props[key]) {
            case 'string': return 'String';
            case 'number': return 'Number';
            case 'boolean': return 'Boolean';
        }
    }

    (() => {

        ${devScript}

        let propKeys = Object.keys(props)

        class Counter extends HTMLElement {
            static get observedAttributes() {
                return ${propKeys};
            }

            ${propKeys.reduce((accum, curr) => {
                return accum += `#${curr} = props.${curr}; `
            })}

            constructor() {
                super();
                const template = document.querySelector(template.${className});
                this.append(template.content);
            }

            attributeChangedCallback(name, oldValue, newValue) {
                if (oldValue === newValue) { return; }
                switch (name) {
                    ${propKeys.reduce((accum, curr) => {
                        return accum += `case '${curr}': this.${curr} = newValue; break; `
                    })}
                    default:
                        console.warn("Prop not found.");
                }
            }

            ${propKeys.reduce((accum, curr) => {
                return accum += `get ${curr}() { return this.#${curr}; }
            set ${curr}(value) {
                value = ${type(props, curr)}(value);
                this.#${curr} = value;
                ${curr}_onChange(this, value);
            }`
            })}

            connectedCallback() {
                onMount(this);
            }
        }
        customElements.define("${className}", Counter);
    })();

})();`)