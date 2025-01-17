import { css } from "lit-element";

export default css`
  :host {
    background: var(--tasksistant-cell-component-host-background, #ffffff);
    display: var(--tasksistant-cell-component-host-display, inline-flex);
  }

  #main-container {
    display: var(--tasksistant-cell-component-main-container-display, inline-flex);
    flex-direction: var(--tasksistant-cell-component-main-container-flex-direction, column);
    flex-wrap: var(--tasksistant-cell-component-main-containter-flex-wrap, wrap-reverse);
    justify-content: var(--tasksistant-cell-component-main-containter-justify-content, center);
    align-items: var(--tasksistant-cell-component-main-containter-align-items, center);
    border: var(--tasksistant-cell-component-main-container-border, solid);
    width: var(--tasksistant-cell-component-main-container-width, 400px);
    height: var(--tasksistant-cell-component-main-container-height, 400px);
  }

  .cell-alive {
    background: var(--tasksistant-cell-component-cell-alive-background, #ffffff);
  }

  .cell-dead {
    background: var(--tasksistant-cell-component-cell-dead-background, #2a2727dc);
  }

  #node-inner-text {
    background: var(--tasksistant-cell-component-node-inner-text-background, none);
    display: var(--tasksistant-cell-component-node-inner-text-display, inline-flex);
    border: var(--tasksistant-cell-component-node-inner-text-border, solid);
    width: var(--tasksistant-cell-component-node-inner-text-width, 300px);
    height: var(--tasksistant-cell-component-node-inner-text-height, 150px);
  }

  #node-slot {
    background: var(--tasksistant-cell-component-node-slot-background, none);
    display: var(--tasksistant-cell-component-node-slot-display, inline-flex);
    border: var(--tasksistant-cell-component-node-slot-border, solid);
    width: var(--tasksistant-cell-component-node-slot-width, 300px);
    height: var(--tasksistant-cell-component-node-slot-height, 150px);
  }
`;
