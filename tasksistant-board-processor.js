export class Processor {
  constructor(mapHeight = 0, mapWidth = 0) {
    //Node data property is node data general model
    this.nodeDataPrototype = {
      type: '',
      figure: '',
      coordinates: [],
      connectedComplements: {
        left: '',
        right: '',
        up: '',
        down: ''
      },
      stripes: {
        left: false,
        right: false,
        up: false,
        down: false
      },
      command: '',
      orderData: ''
    };
    this.directory = new Map();
    this.openNodes = new Map();
    this.rulezForNodes = new Map([
      [
        'type', 
        {
          figure: {
            nextValidType: 'stripe',
            isGlobalLimitRequired: false,
            globalLimit: 0
          },
          stripe: {
            nextValidType: 'figure',
            isGlobalLimitRequired: false,
            globalLimit: 0,
            isLimitPerNodeRequired: true,
            limitPerNode: 0
          }
        }
      ],
      [
        'figure', {
          terminator: {
            nextValidFigures: 'any',
            isGlobalLimitRequired: false,
            globalLimit: 0
          },
          connector: {
            nextValidFigures: 'any',
            isGlobalLimitRequired: false,
            globalLimit: 0
          }
        }
      ],
      [
        'connectedComplements', {
          arrow: {
            isLimitPerNodeRequired: false,
            limitPerNode: 0
          },
          path: {
            isLimitPerNodeRequired: false,
            limitPerNode: 0
          },
          isLimitPerNodeRequired: false,
          limitPerNode: 0
        }
      ],
      [
        'stripes', {
          isLimitPerNodeRequired: false,
          limitPerNode: 2
        }
      ]
    ]);
    this.allNodesCreated = [];
    this.nodesVirtualMap = [];
    this.maxStripesPerNode = 2;
    this.mapHeight = mapHeight;
    this.mapWidth = mapWidth;
    this.initialNodeConfig = {
      type: 'figure',
      figure: 'terminator',
      coordinates: [],
      connectedComplements: {
        left: '',
        right: '',
        up: '',
        down: ''
      },
      stripes: {
        left: false,
        right: false,
        up: false,
        down: false
      },
      command: '',
      orderData: ''
    };
  };

  setInitialNode(coordinates){
    const command = this.createFigureOrder(this.initialNodeConfig);
    const nodeData = {...this.nodeDataPrototype};
    nodeData.type = 'figure';
    nodeData.figure = 'terminator';
    nodeData.command = command; 
    nodeData.coordinates = coordinates;
    return nodeData;
  };

  getValidNeighbors(nodeData) {
    const validCoordinates = this.getValidCoordinates(nodeData.coordinates);
    let validNeighbors = [];
    for (const coordinateSettings of validCoordinates) {
      validNeighbors = [
        ...validNeighbors, 
        this.createValidNeighbor(nodeData, coordinateSettings)];
    };
    return validNeighbors;
  };

  createValidNeighbor(nodeData = {}, neighborCoordinatesSettings = {}) {
    const neighborData = {...this.nodeDataPrototype};
    neighborData.coordinates = neighborCoordinatesSettings.coordinates;
    const currentType = nodeData.type;
    neighborData.type = this.rulezForNodes.get('type')[currentType].nextValidType;
    if(neighborData.type === 'figure'){
      this.setNeighborFigureConfig(neighborData, neighborCoordinatesSettings.direction);
    } else if(neighborData.type === 'stripe'){
      this.setNeighborStripeConfig(neighborData, neighborCoordinatesSettings.direction);
    };
    return neighborData;
  };

  setNeighborStripeConfig(neighbor, direction) {
    switch (direction) {
      case 'left':
        neighbor.stripes.left = true;
        break;
      case 'right':
        neighbor.stripes.right = true;
        break;
      case 'up':
        neighbor.stripes.up= true;
        break;
      case 'down':
        neighbor.stripes.down = true;
    };
  };

  setNeighborFigureConfig(neighbor, direction) {
    switch (direction) {
      case 'left':
        neighbor.connectedComplements.right = 'arrow';
        break;
      case 'right':
        neighbor.connectedComplements.left = 'arrow';
        break;
      case 'up':
        neighbor.connectedComplements.down = 'arrow';
        break;
      case 'down':
        neighbor.connectedComplements.up = 'arrow';
    };
  };

  getValidCoordinates(coordinates){
    let x = coordinates[1];
    let y = coordinates[0];
    let setOfCoordinates = [];
    if(x + 1 < this.mapWidth){
      const yAxis = x + 1;
      setOfCoordinates = [
        ...setOfCoordinates,
        {
          coordinates: [x, yAxis],
          direction: 'right'
        }
      ];
    };

    if(x - 1 >= 0){
      const yAxis = x - 1;
      setOfCoordinates = [
        ...setOfCoordinates,
        {
          coordinates: [x, yAxis],
          direction: 'left'
        }
      ];
    };

    if(y + 1 < this.mapHeight){
      const xAxis = y + 1;
      setOfCoordinates = [
        ...setOfCoordinates,
        {
          coordinates: [xAxis, y],
          direction: 'up'
        }
      ];
    };

    if(y - 1 >= 0){
      const xAxis = y - 1;
      setOfCoordinates = [
        ...setOfCoordinates,
        {
          coordinates: [xAxis, y],
          direction: 'down'
        }
      ];
    };
    return setOfCoordinates;
  };

  setBodyNode(previousNode, newNode){
    let nodesStates = {}
    if(previousNode.type === 'figure'){
      this.setStripeBodyNode(previousNode, newNode);
    } else if(previousNode.type === 'stripe'){
      this.setFigureBodynode(previousNode, newNode);
    };
    nodesStates = {previousNode, newNode};
    return nodesStates;
  };

  setStripeBodyNode(previousNode, newNode) {
    const allCoordinates = [newNode.coordinates[0] - previousNode.coordinates[0], newNode.coordinates[1] - previousNode.coordinates[1],];
    switch (true) {
      case allCoordinates[0] === -1:
        newNode.stripes.left = true;
        previousNode.connectedComplements.right = 'path'
        'left'
        break;
      case allCoordinates[0] === 1:
        newNode.stripes.right = true;
        previousNode.connectedComplements.left = 'path'
        'right'
        break;
      case allCoordinates[1] === -1:
        newNode.stripes.down = true;
        previousNode.connectedComplements.up = 'path'
        'down'
        break
      case allCoordinates[1] === 1:
        newNode.stripes.up = true;
        previousNode.connectedComplements.down = 'path'
        'up'
        break
      default:
        break;
    };
    newNode.command = this.createStripeOrder(newNode);
    previousNode.command = this.createFigureOrder(previousNode);
  };

  setFigureBodyNode(previousNode, newNode) {
    const allCoordinates = [newNode.coordinates[0] - previousNode.coordinates[0], newNode.coordinates[1] - previousNode.coordinates[1],];
    switch (true) {
      case allCoordinates[0] === -1:
        previousNode.left = true;
        newNode.right = 'arrow'
        'left'
        break;
      case allCoordinates[0] === 1:
        previousNode.right = true;
        newNode.left = 'arrow'
        'right'
        break;
      case allCoordinates[1] === -1:
        previousNode.down = true;
        newNode.up = 'arrow'
        'down'
        break
      case allCoordinates[1] === 1:
        previousNode.up = true;
        newNode.down = 'arrow'
        'up'
        break
      default:
        break;
    };
  };

  createFigureOrder(orderData) {
    let command = `figure ${orderData.figure}`
    const complements = orderData.connectedComplements;
    for (const complement in complements) {
      if(complements[complement] !== '' && complements[complement] !== undefined){
        command = `${command} ${complement} ${complements[complement]}`
      };
    };

    return command;
  };

  createStripeOrder(orderData) {
    let command = 'stripe';
    const sides = orderData.stripes;
    for(const side in sides){
      if(sides[side]){
        command = `${command} ${side}`
      };
    };
    return command;
  };
};