import { LitElement, html } from "lit-element";
import styles from "./tasksistant-cell-component-styles";

export class TasksistantCellComponent extends LitElement {
  /**
   * Instance of the element is created/upgraded. Useful for initializing
   * state, set up event listeners, create shadow dom.
   * @constructor
   */
  constructor() {
    super();
    this.nodeContent = {};
    this.isNodeContentFilled = false;
    this.cellIsDead = false;
    this.sidePrototype = {
      reference: {},
      status: "empty"
    }
    this.sides = {
      left: {...this.sidePrototype},
      right: {...this.sidePrototype},
      top: {...this.sidePrototype},
      bottom: {...this.sidePrototype}
    };
    this.nodeInnerText = '';
    this.vitalSign = 'alive';
  };

  /**
   * Object describing property-related metadata used by Polymer features
   */
  static get properties() {
    return {
      nodeContent: { type: Object },
      isNodeContentFilled: { type: Boolean },
      cellIsDead: {type: Boolean},
      sidePrototype: { type: Object },
      sides: { type: Object },
      nodeInnerText: {type: String}
    };
  };

  static get styles() {
    return styles;
  };

  set cellIsDead(value) {
    let oldValue = this._cellIsDead;
    if(value){
      this.lookDead();
    } else {
      this.lookAlive();
    };
    this._cellIsDead = value;
    this.requestUpdate('cellIsDead', oldValue);
  }

  setNodeInnerText(innerText) {
    if (typeof innerText === "string") {
      this.nodeInnerText = innerText;
    };
  };

  setNodeContent(nodeNewContent = {}) {
    this.nodeContent = {...nodeNewContent};
    this.isNodeContentFilled = true;
    this.dispatchEvent(new CustomEvent('tasksistant-cell-component-node-content-added', {
      detail: {
        nodeContent: this.nodeContent,
        isNodeFilled: this.isNodeContentFilled
      }
    }));
  };

  getNodeContent() {return this.nodeContent};

  setNewReference(direction, reference){
    this.sides[`${direction}`].reference = reference;
    this.sides[`${direction}`].status = "filled";
    this.dispatchEvent(new CustomEvent('tasksistant-cell-component-new-reference-added', {
      detail: { side: direction }
    }));
  };

  cleanNodeContent(){
    this.nodeContent = {};
    this.isNodeContentFilled = false;
    this.dispatchEvent(new CustomEvent('tasksistant-cell-component-node-content-deleted', {
      detail: {
        nodeContent: this.nodeContent,
        isNodeFilled: this.isNodeContentFilled
      }
    }));
  };

  lookDead(){
    this.vitalSign = 'dead';
    this.requestUpdate();
  };

  lookAlive(){
    this.vitalSign = 'alive';
    this.requestUpdate();
  };

  render() {
    return html`
      <div id="main-container" class="cell-${this.vitalSign}">
        <div id="node-inner-text">${this.nodeInnerText}</div>
        <div id="node-slot">
          <slot name="node-slot"> </slot>
        </div>
      </div>
    `;
  };
}
customElements.define("tasksistant-cell-component", TasksistantCellComponent);
