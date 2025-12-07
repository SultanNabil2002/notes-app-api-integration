class FooterBar extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>
        footer {
          background-color: #f7f3e9;
          text-align: center;
          padding: 20px 0;
        }
      </style>
      <footer>1 April, 2024 &copy; Sultan Nabil F1946YB117</footer>
    `;
  }
}

customElements.define('footer-bar', FooterBar);
