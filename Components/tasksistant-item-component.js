import { LitElement, html } from 'lit-element';
import './tasksistant-canvas';
import styles from './tasksistant-item-component-styles';

export class TasksistantItemComponent extends LitElement {

  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor() {
    super();
    this.canvasProperties = {
      canvasMargin: 20,
      canvasHeight: 100,
      canvasWidth: 100,
      figureProperties: {
        figure: '',
        sides: {
          left: '',
          right: '',
          down: '',
          up: ''
        }
      },
      stripes: {
        left: false,
        right: false,
        down: false,
        up: false
      }
    };
    this.figures = {};
  };

  /**
    * Object describing property-related metadata used by Polymer features
    */
  static get properties() {
    return {
      canvasProperties: {type: Object},
      figures: {type: Object}
    };
  };

  static get styles() {
    return styles;
  };

  setCanvasFigure(newFigure) {
    this.canvasProperties.figureProperties.figure = newFigure;
    this.deleteStripes();
    this.requestUpdate();
  };

  setCanvasFigureComplements(left = '', right = '', up = '', down = '') {
    this.canvasProperties.figureProperties.sides.left = left;
    this.canvasProperties.figureProperties.sides.right = right;
    this.canvasProperties.figureProperties.sides.down = down;
    this.canvasProperties.figureProperties.sides.up = up;
    this.requestUpdate();
  }

  deleteFigure(){
    this.canvasProperties.figureProperties.figure = '';
    this.deleteComplements();
  };

  deleteComplements() {
    this.canvasProperties.figureProperties.validStripes = undefined;
    this.requestUpdate();
  };

  setStripes(left = false, right =false, up = false, down = false) {
    this.canvasProperties.stripes.up = up;
    this.canvasProperties.stripes.down = down;
    this.canvasProperties.stripes.left = left;
    this.canvasProperties.stripes.right = right;
    this.canvasProperties.validStripes = {...this.canvasProperties.stripes};
    this.requestUpdate();
  }

  deleteStripes() {
    this.canvasProperties.validStripes = undefined;
    this.requestUpdate();
  }

  render() {
    return html`
      <tasksistant-canvas
      .canvasEmptyMarginPixels="${this.canvasProperties.canvasMargin}" 
      .canvasHeightPixels="${this.canvasProperties.canvasHeight}" 
      .canvasWidthPixels="${this.canvasProperties.canvasWidth}"
      .figure="${this.canvasProperties.figureProperties.figure}"
      .figureComplements="${this.canvasProperties.figureProperties.sides}"
      .stripes="${this.canvasProperties.validStripes}"
      .setOfFigures="${this.figures}">
      </tasksistant-canvas>`;
  };
};
customElements.define('tasksistant-item-component', TasksistantItemComponent);