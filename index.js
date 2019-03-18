import { LitElement, html } from 'lit-element';
import { router, routerMixin } from 'lit-element-router';

export default class RouterStylingTest extends routerMixin(LitElement) {
  createRenderRoot() {
    return this;
  }

  static get properties() {
    return {
      route: { type: String },
      params: { type: Object }
    };
  }

  static get routes() {
    return [
      {
        name: 'home',
        pattern: '',
        data: { title: 'Home' }
      },
      {
        name: 'test-light-dom',
        pattern: 'test-light-dom'
      },
      {
        name: 'not-found',
        pattern: '*'
      }
    ];
  }

  constructor() {
    super();
    this.root = this.shadowRoot || this;
    this.route = '';
    this.params = {};
    this.baseUrl = window.location.pathname;
    router(
      [
        {
          name: 'home',
          pattern: this.baseUrl,
          callback: (route, params, query) => {
            console.log('callback', route, params, query);
          },
          guard: () => {
            return true;
          }
        },
        {
          name: 'test-light-dom',
          pattern: `${this.baseUrl}test-light-dom`
        },
        {
          name: 'not-found',
          pattern: '*'
        }
      ],
      (route, params, query, data) => {
        this.route = route;
        this.params = params;
      }
    );
  }

  onRoute(route, params, query, data) {}

  render() {
    return html`
      <h2>Test h2</h2>
      <nav>
        <button><router-link href="${this.baseUrl}">Home</router-link></button>
        <button>
          <router-link href="${this.baseUrl}test-light-dom"
            >TestLightDom</router-link
          >
        </button>
      </nav>
      <router-slot route="${this.route}">
        <div slot="home">Home</div>
        <div slot="test-light-dom">
          <h3>Test h3</h3>
          <p>testing light dom styles</p>
        </div>
        <div slot="not-authorized">Not Authorized</div>
        <div slot="not-found">Not Found</div>
      </router-slot>
    `;
  }
}
customElements.define('router-styling-test', RouterStylingTest);
