import { LitElement, html } from "lit-element";
import { Processor } from "./tasksistant-board-processor";
import "./Components/tasksistant-board-component";
import styles from "./tasksistant-poc-styles";

export class TasksistantPoc extends LitElement {
  /**
   * Instance of the element is created/upgraded. Useful for initializing
   * state, set up event listeners, create shadow dom.
   * @constructor
   */
  constructor() {
    super();
    this.board = {};
    this.previousNode = {};
    this.currentNode = {};
    this.currentNodeValidNeighbors = [];
    this.buttonMessage = '';
    this.reload = false;
    this.rowsNumber = 0;
    this.columnsNumber = 0;
    this.order = 'figure terminator';
    this.processor = {};
    this.itemsButtons = [];
  };

  /**
   * Object describing property-related metadata used by Polymer features
   */
  static get properties() {
    return {
      board: { type: Object },
      previousNode: {type: Object },
      currentNode: {type: Object },
      currentNodeValidNeighbors: {type: Object},
      bottonMessage: { type: String },
      rowsNumber: { type: Number },
      columnsNumber: { type: Number },
      order: { type: String },
      processor: { type: Object },
      itemsButtons: { type: Array },
    };
  };

  static get styles() {
    return styles;
  };

  firstUpdated() {
    this.board = this.shadowRoot.querySelector('tasksistant-board-component');
    this.buttonMessage = 'Load';
  };

  loadBoard() {
    this.processor = new Processor(this.rowsNumber, this.columnsNumber);
    this.board.linkBoardSpace();
    this.buttonMessage = 'Reload';
    this.reload = true;
  };

  reloadBoard() {
    this.board.boardSpace = [];
    this.board.linkBoardSpace();
  };

  setBoardSpace(e) {
    const dimension = e.target.name;
    if (dimension === 'rows') {
      this.rowsNumber = e.target.value;
    } else if (dimension === 'columns') {
      this.columnsNumber = e.target.value;
    };
  };

  _moveCurrentNodeToDirection(e) {
    const direction = e.target.getAttribute('value');
    this.board.navigateFromCurrentNodeTo(direction);
  };

  _createItemButton(neighborData){
    const canvasTitle = `${neighborData.type} ${neighborData.figure}`
    const canvasProperties ={
      canvasMargin: 20,
      canvasHeight: 100,
      canvasWidth: 100,
      figureProperties: {
        figure: neighborData.figure,
        sides: {
          left: '',
          right: '',
          down: '',
          up: ''
        }
      },
      stripes:  neighborData.stripes
    };
    const value = 'none';
    const buttonTitle = canvasTitle;
    return {canvasTitle, canvasProperties, value, buttonTitle};
  };

  _fillCell() {
    let nodeData = {};
    this.currentNode = this.board.currentNode.cell.getNodeContent();
    this._giveLifeToCurrentCell();
    this._giveLifeToNeighboringCells();
    if(this.setBodyNodes){
      const fullData = this.processor.setBodyNode(this.previousNode, this.currentNode);
      nodeData = fullData.newNode;
      this.previousNode = nodeData.previousNode;
    } else {
      nodeData = {...this.processor.setInitialNode(this.board.currentNode.coordinates)};
      this.previousNode = {...nodeData};
      this.setBodyNodes = true;
    };
    this.order = nodeData.command;
    this.board.executeOrderOnCurrentNode(this.order);
    this.board.currentNode.cell.setNodeContent({...nodeData});
    this._analyze({...nodeData});
  };
  
  _analyze(nodeData) {
    this.itemsButtons = [];
    const validNeighbors = this.processor.getValidNeighbors(nodeData);
    for (const neighborData of validNeighbors) {
      const xAxis = neighborData.coordinates[0];
      const yAxis = neighborData.coordinates[1];
      this.board.setCellStateByCoordinates(xAxis, yAxis, neighborData);
      this.itemsButtons = [...this.itemsButtons, this._createItemButton(neighborData)];
    };
    this.currentNodeValidNeighbors =  validNeighbors;
  };

  _giveLifeToCurrentCell(){
    this.board.currentNode.cell.cellIsDead = false;
    this.board.currentNode.cell.classList.add('alive');
  };

  _giveLifeToNeighboringCells(){
    const currentNodeCoordinates = this.board.currentNode.coordinates;
    [
      [currentNodeCoordinates[0] + 1, currentNodeCoordinates[1]],
      [currentNodeCoordinates[0] - 1, currentNodeCoordinates[1]],
      [currentNodeCoordinates[0], currentNodeCoordinates[1] + 1],
      [currentNodeCoordinates[0], currentNodeCoordinates[1] - 1]
    ].map(neighbourCoordinates => {
      const cellFromBoard = this.board.getCellByCoordinates(neighbourCoordinates[0], neighbourCoordinates[1]);
      if(cellFromBoard) {
        cellFromBoard.cell.classList.add('alive');
      };
    });
  };

  render() {
    return html`
      <div id="main-container">
        <div id="screen-container">
          <tasksistant-board-component
            .numberOfRows="${this.rowsNumber}"
            .numberOfColumns="${this.columnsNumber}"
          ></tasksistant-board-component>
        </div>
        <div id="control-container">
          <label for="rows">Number of rows</label>
          <input
            id="rows"
            type="number"
            placeholder="Insert a number for rows"
            name="rows"
            value="0"
            @input="${this.setBoardSpace}"
          />
          <label for="columns">Number of columns</label>
          <input
            id="columns"
            type="number"
            placeholder="Insert a number for columns"
            name="columns"
            value="0"
            @input="${this.setBoardSpace}"
          />
          ${this.reload ? html`
          <button @click="${this.reloadBoard}">
            ${this.buttonMessage}
          </button>
          ` : html`
          <button @click="${this.loadBoard}">
            ${this.buttonMessage}
          </button>`}
          <div id="control-pad">
            <div id="up-section">
              <div
                id="arrow-up"
                value="top"
                @click="${this._moveCurrentNodeToDirection}"
              ></div>
            </div>
            <div id="middle-section">
              <div
                id="arrow-left"
                value="left"
                @click="${this._moveCurrentNodeToDirection}"
              ></div>
              <div id="circle-container">
                <div
                  id="circle"
                  @click="${this._fillCell}"
                ></div>
              </div>
              <div
                id="arrow-right"
                value="right"
                @click="${this._moveCurrentNodeToDirection}"
              ></div>
            </div>
            <div id="bottom-section">
              <div
                id="arrow-down"
                value="bottom"
                @click="${this._moveCurrentNodeToDirection}"
              ></div>
            </div>
          </div>
        </div>
        <div id="buttons-container">
          ${this.itemsButtons.map(
            (itemProperties) => html`
              <div id="canvas-title">
                <h3>${itemProperties.canvasTitle}</h3>
              </div>
              <div id="canvas-container">
                <tasksistant-item-component
                  .figures="${this.board.figures}"
                  .canvasProperties="${itemProperties.canvasProperties}"
                >
                </tasksistant-item-component>
              </div>
              <div id="canvas-button-container">
                <button command="${itemProperties.value}">
                  ${itemProperties.buttonTitle}
                </button>
              </div>
            `
          )}
        </div>
      </div>
    `;
  }
}
customElements.define("tasksistant-poc", TasksistantPoc);
