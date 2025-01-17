import { css } from 'lit-element';

export default css`
  :host {
    display: inline-block;
    box-sizing: border-box;
    --canvas-width: var(--tasksistant-canvas--host-canvas-width, 100);
    --canvas-height: var(--tasksistant-canvas--host-canvas-height, 100);
    }

  :host([hidden]), [hidden] {
    display: none !important; }

  *, *:before, *:after {
    box-sizing: inherit;
    font-family: inherit;
  }

  tasksistant-canvas {
    --tasksistant-canvas-canvas-container-width: var(--canvas-width);
    --tasksistant-canvas-canvas-container-height: var(--canvas-height);
    --tasksistant-canvas-tasksistant-canvas-width: var(--canvas-width);
    --tasksistant-canvas-tasksistant-canvas-height: var(--canvas-height);
  }
  `;