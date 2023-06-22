class Card extends HTMLElement {
    constructor() {
      super();
  
      // Create a shadow root
      this.attachShadow({ mode: 'open' });
  
      // Define the template
      this.shadowRoot.innerHTML = `
      <li class="card ${this.getAttribute('type')} ${this.getAttribute('selected')}" id="${this.getAttribute('id')}">
        <img class="cardimg" src="${this.getAttribute('src')}" alt="${this.getAttribute('alt')}">
        <div class="cardname text-dark">${this.getAttribute('text')}</div>
      </li>`;
    }
  
    connectedCallback() {
      // Add event listeners or additional behavior here
    }
  }
  
  // Define your custom element
  customElements.define('filter-card', Card);
  