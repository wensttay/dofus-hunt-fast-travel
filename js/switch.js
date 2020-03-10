var switchDiv = document.createElement('div');
switchDiv.classList.add('switch-box');

var switchLabel = document.createElement('label');
switchLabel.id = 'switch';
switchLabel.classList.add('switch');
switchLabel.title = chrome.i18n.getMessage("switch");

var switchInput = document.createElement('input');
switchInput.type = 'checkbox';
switchInput.checked = true;

var switchSpan = document.createElement('span');
switchSpan.classList.add('slider');
switchSpan.classList.add('round');

switchLabel.appendChild(switchInput);
switchLabel.appendChild(switchSpan);
switchDiv.appendChild(switchLabel);