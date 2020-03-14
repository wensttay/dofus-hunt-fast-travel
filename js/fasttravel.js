var switchDiv = document.createElement('div');
switchDiv.classList.add('switch-box');

var switchLabel = document.createElement('label');
switchLabel.id = 'switch';
switchLabel.classList.add('switch');
switchLabel.title = chrome.i18n.getMessage("switch");

var switchInput = document.createElement('input');
switchInput.type = 'checkbox';
switchInput.checked = false;

var switchSpan = document.createElement('span');
switchSpan.classList.add('slider');
switchSpan.classList.add('round');

switchLabel.appendChild(switchInput);
switchLabel.appendChild(switchSpan);
switchDiv.appendChild(switchLabel);

switchInput.addEventListener('change', function() {
    copyToClipboard();
})

document.getElementById('secondLine').addEventListener('click', function(){
    copyToClipboard();
});

document.getElementById('hint').appendChild(switchDiv);
document.getElementById('hintName').addEventListener('change', function() {
    copyToClipboard();
});

// The extension doesn't have access to page variables
// [TODO]: Search a better way to do that
function copyToClipboard() {
    let cords = document.getElementById('secondLine')
        .innerHTML
        .split("<span>").join("")
        .split("</span>").join("")
        .split(" ").join("");
        
    if (switchInput.checked) {
        cords = cords.split("[").join("")
            .split("]").join("")
            .split(";").join(" ");
        cords = "/travel " + cords;
    } else {
        cords = cords.split(";").join(",");
    }

    let end = cords.indexOf('<labelclass="tooltiptext">');
    if (end != -1) {
        navigator.clipboard.writeText(cords.substring(0, end));
    } else {
        navigator.clipboard.writeText(cords);
    }
};
