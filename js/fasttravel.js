var switchDiv = document.createElement('div');
switchDiv.classList.add('switch-box');

var switchLabel = document.createElement('label');
switchLabel.id = 'switch';
switchLabel.classList.add('switch');
switchLabel.title = 'Active/Disable Fast Travel'

var switchInput = document.createElement('input');
switchInput.type = 'checkbox';
switchInput.checked = true;

var switchSpan = document.createElement('span');
switchSpan.classList.add('slider');
switchSpan.classList.add('round');

switchLabel.appendChild(switchInput);
switchLabel.appendChild(switchSpan);
switchDiv.appendChild(switchLabel);

document.getElementById('hint').appendChild(switchDiv);
document.getElementById('hintName').addEventListener('change', function() {
    if (switchInput.checked) {
        copyToClipboard();
    }
});

// The extension doesn't have access to page variables
// [TODO]: Search a better way to do that
function copyToClipboard() {
    var cords = document.getElementById('secondLine')
        .innerHTML
        .split("[").join("")
        .split("]").join("")
        .split("<span>").join("")
        .split("</span>").join("")
        .split(" ").join("")
        .split(";").join(" ");

    navigator.clipboard.writeText("/travel " + cords);
};

