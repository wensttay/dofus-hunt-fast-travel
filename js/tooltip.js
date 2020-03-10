var x = document.getElementById('x');
var xNext = x.nextSibling;
var xDiv = document.createElement('div');
xDiv.appendChild(x);

var y = document.getElementById('y');
var yNext = y.nextSibling;
var yDiv = document.createElement('div');
yDiv.appendChild(y);

addTooltip(xDiv, "You can paste the [x,y] format");
addTooltip(yDiv, "You can paste the [x,y] format");
addTooltip(document.getElementById('switch'), "Turn On/Off Dofus Hunt Tools");

xNext.parentNode.insertBefore(xDiv, xNext);
yNext.parentNode.insertBefore(yDiv, yNext);

function addTooltip(element, text) {
    element.classList.add('tooltip');

    let tooltipText = document.createElement('label');
    tooltipText.classList.add('tooltiptext');
    tooltipText.innerHTML = text;

    element.appendChild(tooltipText);
}
