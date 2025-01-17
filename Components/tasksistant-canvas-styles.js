import { css } from 'lit-element';

export default css`

  :host {
    margin: 0;
  }

  #main-container {
    display: inline-flex;
  }

  #canvas-container {
    align-items: center;
    justify-content: center;
    width: var(--tasksistant-canvas-canvas-container-width, 300px);
    height: var(--tasksistant-canvas-canvas-container-height, 300px);
  }

  #tasksistant-canvas {
    width: var(--tasksistant-canvas-tasksistant-canvas-width, 300px);
    height: var(--tasksistant-canvas-tasksistant-canvas-height, 300px);
  }
`;