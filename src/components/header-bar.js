class HeaderBar extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>
        header {
          background-color: #f7f3e9;
          text-align: center;
          padding: 20px 0;
        }
        h1 {
          margin: 0;
        }
      </style>
      <header>
        <h1>Notes</h1>
      </header>
    `;
  }
}

customElements.define('header-bar', HeaderBar);
