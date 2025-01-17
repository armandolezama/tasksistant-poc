import { css } from 'lit-element';

export default css`
  :host {
    margin: 0;
  }

  #main-container {
    display: inline-flex;
    flex-direction: row;
  }

  #screen-container {
    width: 80vw;
    height: 98vh;
    border: solid;
    overflow: scroll;
  }

  #control-container {
    border: solid;
    border-left: none;
    height: 500px;
  }

  #screen-container {
    display: flex;
    flex-direction: row;
  }
`;