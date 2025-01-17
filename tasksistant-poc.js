import { LitElement, html } from "lit-element";
import "./Components/tasksistant-cell-component";
import "./Components/tasksistant-item-component";
import figures from './tasksistant-chart-figures';
import styles from "./tasksistant-poc-styles";

export class TasksistantPoc extends LitElement {
  /**
   * Instance of the element is created/upgraded. Useful for initializing
   * state, set up event listeners, create shadow dom.
   * @constructor
   */
  constructor() {
    super();
    this.numberOfRows = 0;
    this.numberOfColumns = 0;
    this.boardSpace = [];
    this.boardDirectory = new Map();
    this.currentNode = {};
    this.figures = figures;
  };

  /**
   * Object describing property-related metadata used by Polymer features
   */
  static get properties() {
    return {
      numberOfRows: { type: Number },
      numberOfColumns: { type: Number },
      boardSpace: { type: Array },
      boardDirectory: { type: Array },
      currentNode: { type: Object },
    };
  };

  static get styles() {
    return styles;
  };

  removeCurrentNodeActiveStyle() {
    this.currentNode.cell.classList.remove("focused");
  };

  addCurrentNodeActiveStyle() {
    this.currentNode.cell.classList.add("focused");
  };

  focusCurrentNode() {
    this.currentNode.cell.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  };

  navigateFromCurrentNodeTo(direction) {
    if (this.currentNode.cell.sides[direction].reference.cell) {
      this.removeCurrentNodeActiveStyle();
      const xAxis = this.currentNode.coordinates[0];
      const yAxis = this.currentNode.coordinates[1];
      switch (direction) {
        case "left":
          this.currentNode = this.boardSpace[xAxis][yAxis - 1];
          break;
        case "right":
          this.currentNode = this.boardSpace[xAxis][yAxis + 1];
          break;
        case "top":
          this.currentNode = this.boardSpace[xAxis - 1][yAxis];
          break;
        case "bottom":
          this.currentNode = this.boardSpace[xAxis + 1][yAxis];
          break;
      };
      this.addCurrentNodeActiveStyle();
      this.focusCurrentNode();
      this.dispatchEvent(
        new CustomEvent("tasksistant-board-current-node-changed", {
          detail: {
            currentNode: this.currentNode,
          },
        })
      );
    } else {
      this.dispatchEvent(new CustomEvent("tasksistant-board-new-node-missing"));
    };
  };

  getNeighborOfCurrentNode(direction){
    return this.currentNode.cell.sides[direction].reference;
  };

  setCellStateByCoordinates(xAxis = 0, yAxis= 0, state = {}) {
    const cell = this.getCellByCoordinates(xAxis, yAxis);
    cell.cell.setNodeContent(state);
  };

  getCellStateByCoordinates(){
    const cell = this.getCellByCoordinates(xAxis, yAxis);
    return cell.cell.getNodeContent();
  }

  getCellByCoordinates(xAxis = 0, yAxis = 0) {
    if(xAxis + 1 && yAxis + 1 && xAxis < parseInt(this.numberOfRows) && yAxis < parseInt(this.numberOfColumns)){
      return this.boardSpace[xAxis][yAxis];
    };
  };

  getFigures() {
    return this.figures;
  };

  linkHTMLElements(){
    this.boardSpace = Array.from( { length: this.numberOfRows }, (v, row) => {
      return Array.from({ length: this.numberOfColumns }, (v2, column) => {
        return this.generateCell(row, column);
      });
    });
  };

  generateCell(row, column) {
    const cell = {
      cell: this.shadowRoot.getElementById(`tasksistant-cell-${row}-${column}`),
      item: this.shadowRoot.getElementById(`tasksistant-item-${row}-${column}`),
      coordinates: [row, column],
    };
    return cell;
  };

  linkByDirection(direction, coordinates) {
    const row = coordinates[0];
    const column = coordinates[1];
    const nodeOrigin = this.boardSpace[row][column];
    let nodeDestiny = [];
    switch (direction) {
      case "left":
        nodeDestiny = this.boardSpace[row][column - 1];
        nodeOrigin.cell.setNewReference(direction, nodeDestiny);
        nodeDestiny.cell.setNewReference("right", nodeOrigin);
        break;
      case "right":
        nodeDestiny = this.boardSpace[row][column + 1];
        nodeOrigin.cell.setNewReference(direction, nodeDestiny);
        nodeDestiny.cell.setNewReference("left", nodeOrigin);
        break;
      case "top":
        nodeDestiny = this.boardSpace[row - 1][column];
        nodeOrigin.cell.setNewReference(direction, nodeDestiny);
        nodeDestiny.cell.setNewReference("bottom", nodeOrigin);
        break;
      case "bottom":
        nodeDestiny = this.boardSpace[row + 1][column];
        nodeOrigin.cell.setNewReference(direction, nodeDestiny);
        nodeDestiny.cell.setNewReference("top", nodeOrigin);
        break;
    };
  };

  linkBoardCells() {
    for (const row of this.boardSpace) {
      for (const cell of row) {
        if (cell.coordinates[0] < this.numberOfRows - 1) {
          this.linkByDirection("bottom", cell.coordinates);
        };
        if (cell.coordinates[1] < this.numberOfColumns - 1) {
          this.linkByDirection("right", cell.coordinates);
        };
      };
    };
  };

  linkBoardSpace() {
    this.linkHTMLElements();
    this.linkBoardCells();
    this.currentNode = this.boardSpace[0][0];
    this.addCurrentNodeActiveStyle();
  };

  resetBoard() {
    this.numberOfRows = 0;
    this.numberOfColumns = 0;
  };

  executeOrderOnCurrentNode(order){
    const splitedOrder = order.split(' ');
    if(splitedOrder[0] === 'figure') {
      this.figureOrder(splitedOrder);
    } else if(splitedOrder[0] === 'stripe') {
      this.stripeOrder(splitedOrder);
    };
  };

  figureOrder(splitedOrder) {
    const complements = {
      up: '',
      down: '',
      left: '',
      right: ''
    };
    this.currentNode.item.setCanvasFigure(splitedOrder[1]);
    for (let index = 2; index < splitedOrder.length; index += 2) {
      complements[splitedOrder[index]] = splitedOrder[index + 1];
    };
    this.currentNode.item.setCanvasFigureComplements(complements.left, complements.right, complements.up, complements.down);
  };

  stripeOrder(splitedOrder) {
    const stripes = {
      left: false,
      right: false,
      down: false,
      up: false
    };
    for (let index = 1; index < splitedOrder.length; index++) {
      stripes[splitedOrder[index]] = true;
    };
    this.currentNode.item.setStripes(stripes.left, stripes.right, stripes.up, stripes.down);
  };

  createTable() {
    if (this.numberOfRows > 0 && this.numberOfColumns > 0) {
      let boardTemplate = html``;
        for (let row = 0; row < this.numberOfRows; row++) {
          boardTemplate = html`
            ${boardTemplate}
            <tr id="board-row-${row}" class="taksistant-table-row">
              ${this.createRow(row)}
            </tr>
          `;
        };
      return boardTemplate;
    } else {
      return html`
        ${this.numberOfRows === 0
          ? html`<h2>Not enough rows</h2>`
          : this.numberOfColumns === 0
          ? html`<h2>Not enough columns</h2>`
          : this.numberOfColumns}
      `;
    }
  }

  createRow(row) {
    let boardRow = html``;
      for (let column = 0; column < this.numberOfColumns; column++) {
        boardRow = html`
          ${boardRow}
          <td class="tasksistant-table-cell">
            <tasksistant-cell-component
              id="tasksistant-cell-${row}-${column}"
                class="dead">
              <div slot="node-slot">
                <tasksistant-item-component
                  .figures="${this.figures}"
                  id="tasksistant-item-${row}-${column}">
                </tasksistant-item-component>
              </div>
            </tasksistant-cell-component>
          </td>
        `;
      };
    return boardRow;
  };

  render() {
    return html`
      <div id="main-container">
        <table id="board-table">
          ${this.createTable()}
        </table>
      </div>
    `;
  };
};
customElements.define("tasksistant-poc", TasksistantPoc);
