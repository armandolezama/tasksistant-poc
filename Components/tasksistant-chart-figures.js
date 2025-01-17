const circleFunction = (context, width, height, margin) => {
  const xAxisStartPoint = width/2;
  const yAxisStartPoint = height/2;
  const radius = (height/2) - margin
  context.beginPath();
  context.arc(xAxisStartPoint, yAxisStartPoint, radius, 0, Math.PI * 2, true);
  context.stroke();
};

const terminatorFunction = (context, width, height, margin) => {
  const basicLength = (width - (margin*2))/4;
  
  const leftSemiCircleOriginXAxis = margin + basicLength;
  const centerSquareLeftTopAngleXAxis = margin + basicLength;

  const leftSemiCircleOriginYAxis = height/2;
  const rightSemiCircleOriginYAxis = height/2;

  const centerSquareLeftTopAngleYAxis = margin + basicLength;
  const centerSquareRightBottomAngleYAxis = height - (margin + basicLength);

  const rightSemiCircleOriginXAxis = width - (basicLength + margin);
  const centerSquareRightBottomAngleXAxis = width - (basicLength + margin);

  context.beginPath();
  context.arc(leftSemiCircleOriginXAxis, leftSemiCircleOriginYAxis, basicLength, Math.PI * 0.5, Math.PI * 1.5);
  context.moveTo(centerSquareLeftTopAngleXAxis, centerSquareLeftTopAngleYAxis);
  context.lineTo(centerSquareRightBottomAngleXAxis, centerSquareLeftTopAngleYAxis);
  context.arc(rightSemiCircleOriginXAxis, rightSemiCircleOriginYAxis, basicLength, Math.PI * 1.5, Math.PI * 0.5);
  context.moveTo(centerSquareRightBottomAngleXAxis, centerSquareRightBottomAngleYAxis);
  context.lineTo(centerSquareLeftTopAngleXAxis, centerSquareRightBottomAngleYAxis);
  context.stroke();
};

const leftArrow = (context, height, margin) => {
  context.beginPath();
  context.moveTo(0, margin);
  context.lineTo(0, height - margin);
  context.lineTo(margin, height/2);
  context.lineTo(0, margin);
  context.fill();
};

const rightArrow = (context, width, height, margin) =>{
  context.beginPath();
  context.moveTo(width, margin);
  context.lineTo(width, height - margin);
  context.lineTo(width - margin, height/2);
  context.lineTo(width, margin);
  context.fill();
};

const upArrow = (context, width, margin) => {
  context.beginPath();
  context.moveTo(margin, 0);
  context.lineTo(width - margin, 0);
  context.lineTo(width/2, margin);
  context.lineTo(margin, 0);
  context.fill();
}

const downArrow = (context, width, height, margin) => {
  context.beginPath();
  context.moveTo(margin, height);
  context.lineTo(width - margin, height);
  context.lineTo(width/2, height -  margin);
  context.lineTo(margin, height);
  context.fill();
}

const leftPath = (context, height, margin) => {
  context.beginPath();
  context.moveTo(0, ((height - margin)/2));
  context.lineTo(margin, (height - margin)/2);
  context.lineTo(margin, (height + margin)/2);
  context.lineTo(0, (height + margin)/2);
  context.lineTo(0, (height - margin)/2);
  context.fill();
};

const rightPath = (context, width, height, margin) => {
  context.beginPath();
  context.moveTo(width, ((height - margin)/2));
  context.lineTo(width - margin, (height - margin)/2);
  context.lineTo(width - margin, (height + margin)/2);
  context.lineTo(width, (height + margin)/2);
  context.lineTo(width, (height - margin)/2);
  context.fill();
};

const upPath = (context, width, margin) => {
  context.beginPath();
  context.moveTo((width - margin)/2, 0);
  context.lineTo((width - margin)/2, margin);
  context.lineTo((width + margin)/2, margin);
  context.lineTo((width + margin)/2, 0);
  context.lineTo((width - margin)/2, 0);
  context.fill();
};

const downPath = (context, width, height, margin) => {
  context.beginPath();
  context.moveTo((width - margin)/2, height);
  context.lineTo((width - margin)/2, height - margin);
  context.lineTo((width + margin)/2, height - margin);
  context.lineTo((width + margin)/2, height);
  context.lineTo((width - margin)/2, height);
  context.fill();
};

const stripePoint = (context, width, height, margin) => {
  const xAxisStartPoint = width/2;
  const yAxisStartPoint = height/2;
  const radius = margin/2;
  context.beginPath();
  context.arc(xAxisStartPoint, yAxisStartPoint, radius, 0, Math.PI * 2, true);
  context.fill();
};

const leftStripe = (context, width, height, margin) => {
  context.beginPath();
  context.moveTo(0, ((height - margin)/2));
  context.lineTo(width/2, (height - margin)/2);
  context.lineTo(width/2, (height + margin)/2);
  context.lineTo(0, (height + margin)/2);
  context.lineTo(0, (height - margin)/2);
  context.fill();
};

const rightStripe = (context, width, height, margin) => {
  context.beginPath();
  context.moveTo(width, ((height - margin)/2));
  context.lineTo(width/2, (height - margin)/2);
  context.lineTo(width/2, (height + margin)/2);
  context.lineTo(width, (height + margin)/2);
  context.lineTo(width, (height - margin)/2);
  context.fill();
};

const downStripe = (context, width, height, margin) => {
  context.beginPath();
  context.moveTo((width - margin)/2, height);
  context.lineTo((width - margin)/2, height/2);
  context.lineTo((width + margin)/2, height/2);
  context.lineTo((width + margin)/2, height);
  context.lineTo((width - margin)/2, height);
  context.fill();
};

const upStripe = (context, width, height, margin) => {
  context.beginPath();
  context.moveTo((width - margin)/2, 0);
  context.lineTo((width - margin)/2, height/2);
  context.lineTo((width + margin)/2, height/2);
  context.lineTo((width + margin)/2, 0);
  context.lineTo((width - margin)/2, 0);
  context.fill();
};

export default new Map([
  ['connector', circleFunction],
  ['terminator', terminatorFunction],
  ['left arrow', leftArrow],
  ['right arrow', rightArrow],
  ['up arrow', upArrow],
  ['down arrow', downArrow],
  ['left path', leftPath],
  ['right path', rightPath],
  ['up path', upPath],
  ['down path', downPath],
  ['stripe point', stripePoint],
  ['left stripe', leftStripe],
  ['right stripe', rightStripe],
  ['down stripe', downStripe],
  ['up stripe', upStripe]
]);