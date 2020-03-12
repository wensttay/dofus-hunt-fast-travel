// Adding tooltip on Switch Fast Travel
addTooltip(document.getElementById('switch'), chrome.i18n.getMessage("switch"));

// Adding tooltip on input X
var x = document.getElementById('x');
var xPrevious = x.previousSibling;
var xNext = x.nextSibling;
var xDiv = document.createElement('div');
xDiv.appendChild(xPrevious);
xDiv.appendChild(x);
xDiv.appendChild(xNext);

// Adding tooltip on input Y
var y = document.getElementById('y');
var yPrevious = y.previousSibling;
var yNext = y.nextSibling;
var yDiv = document.createElement('div');
yDiv.appendChild(yPrevious);
yDiv.appendChild(y);
yDiv.appendChild(yNext);

addTooltip(xDiv, chrome.i18n.getMessage("pastepos"));
addTooltip(yDiv, chrome.i18n.getMessage("pastepos"));

var separator = document.getElementById('semiColon');
separator.parentNode.insertBefore(xDiv, separator);
separator.parentNode.insertBefore(yDiv, separator.nextSibling);

function addTooltip(element, text) {
    element.classList.add('tooltip');

    let tooltipText = document.createElement('label');
    tooltipText.classList.add('tooltiptext');
    tooltipText.innerHTML = text;

    element.appendChild(tooltipText);
}
