import { LitElement, html } from "lit-element";
import styles from "./tasksistant-controls-styles";

class TasksistantControls extends LitElement {

  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor() {
    super();
    this.buttonMessage = '';
    this.reload = false;
  }

  static get properties() {
    return {
      buttonMessage: { type: String },
     };
  };

  static get styles() {
    return styles;
  }

  firstUpdated() {
    this.buttonMessage = 'Load';
  };

  sendBoardData(e){

    const axis = e.target.getAttribute('name');
    const value = e.target.value;

    this.dispatchEvent(
      new CustomEvent("tasksistant-controls-board-data-changed", {
        detail: {[axis] : value}
    }))
  }

  nodeNavigation(e){
    const direction = e.target.getAttribute('value');
    this.dispatchEvent(new CustomEvent('tasksistant-controls-node-navigation', {
      detail: {
        direction,
      }
    }));
  }

  centralButtonClick(){
    this.dispatchEvent(new CustomEvent('tasksistant-controls-central-button-clicked'));
  }

  loadBoard(){
    this.dispatchEvent(new CustomEvent('tasksistant-controls-load-board'));
  }

  render() {
    return html`
        <div id="control-container">
          <label for="rows">Number of rows</label>
          <input
            id="rows"
            type="number"
            placeholder="Insert a number for rows"
            name="rows"
            value="0"
            @input="${this.sendBoardData}"
          />
          <label for="columns">Number of columns</label>
          <input
            id="columns"
            type="number"
            placeholder="Insert a number for columns"
            name="columns"
            value="0"
            @input="${this.sendBoardData}"
          />
          <button @click="${this.loadBoard}">
            ${this.buttonMessage}
          </button>
          <div id="control-pad">
            <div id="up-section">
              <div
                id="arrow-up"
                value="top"
                @click="${this.nodeNavigation}"
              ></div>
            </div>
            <div id="middle-section">
              <div
                id="arrow-left"
                value="left"
                @click="${this.nodeNavigation}"
              ></div>
              <div id="circle-container">
                <div
                  id="circle"
                  @click="${this.centralButtonClick}"
                ></div>
              </div>
              <div
                id="arrow-right"
                value="right"
                @click="${this.nodeNavigation}"
              ></div>
            </div>
            <div id="bottom-section">
              <div
                id="arrow-down"
                value="bottom"
                @click="${this.nodeNavigation}"
              ></div>
            </div>
          </div>
        </div>
    `
  }
}

customElements.define("tasksistant-controls", TasksistantControls);