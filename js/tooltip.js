var x = document.getElementById('x');
var xNext = x.nextSibling;
var xDiv = document.createElement('div');
xDiv.appendChild(x);

var y = document.getElementById('y');
var yNext = y.nextSibling;
var yDiv = document.createElement('div');
yDiv.appendChild(y);

addTooltip(xDiv, chrome.i18n.getMessage("pastepos"));
addTooltip(yDiv, chrome.i18n.getMessage("pastepos"));
addTooltip(document.getElementById('switch'), chrome.i18n.getMessage("switch"));

xNext.parentNode.insertBefore(xDiv, xNext);
yNext.parentNode.insertBefore(yDiv, yNext);

function addTooltip(element, text) {
    element.classList.add('tooltip');

    let tooltipText = document.createElement('label');
    tooltipText.classList.add('tooltiptext');
    tooltipText.innerHTML = text;

    element.appendChild(tooltipText);
}
