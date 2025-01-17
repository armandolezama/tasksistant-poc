const goToNodeComponent = direction => {
  const component = document.querySelector("tasksistant-poc");
  component.navigateFromCurrentNodeTo(direction);
};

const setBoardSpace = () => {
  const component = document.querySelector("tasksistant-poc");
  component.numberOfRows = document.getElementById('rows-count').value;
  component.numberOfColumns = document.getElementById('columns-count').value;
};

const linkSpaceBoard = () => {
  const component = document.querySelector("tasksistant-poc");
  component.linkBoardSpace();
};
