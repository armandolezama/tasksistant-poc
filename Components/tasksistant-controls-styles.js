import { css } from "lit-element";

export default css`

  #control-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 20vw;
  }

  #circle-container {
    width: 120px;
    height: 120px;
    align-items: center;
  }

  #arrow-up {
    width: 0; 
    height: 0; 
    border-left: 60px solid transparent;
    border-right: 60px solid transparent;
    border-bottom: 60px solid #bbb;
  }

  #arrow-down {
    width: 0; 
    height: 0; 
    border-left: 60px solid transparent;
    border-right: 60px solid transparent;
    
    border-top: 60px solid #bbb;
  }

  #arrow-right {
    width: 0; 
    height: 0; 
    border-top: 60px solid transparent;
    border-bottom: 60px solid transparent;
    
    border-left: 60px solid #bbb;
  }

  #arrow-left {
    width: 0; 
    height: 0; 
    border-top: 60px solid transparent;
    border-bottom: 60px solid transparent; 
    
    border-right:60px solid #bbb; 
  }

  #circle {
    height: 100px;
    width: 100px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
  }

  input, button, label {
    display: inline-flex;
  }

  #up-section ,
  #middle-section,
  #bottom-section,
  #circle-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;