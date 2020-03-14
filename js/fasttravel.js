// SWITCH
var switchDiv = document.createElement('div');
switchDiv.classList.add('switch-box');

var switchLabel = document.createElement('label');
switchLabel.id = 'switch';
switchLabel.classList.add('switch');
switchLabel.title = chrome.i18n.getMessage("switch");

var switchInput = document.createElement('input');
switchInput.type = 'checkbox';
var switched = getCookie("switchChecked");
switchInput.checked = switched != null ? switched : false;

var switchSpan = document.createElement('span');
switchSpan.classList.add('slider');
switchSpan.classList.add('round');

switchLabel.appendChild(switchInput);
switchLabel.appendChild(switchSpan);
switchDiv.appendChild(switchLabel);





// COPY POS EVENTS
switchInput.addEventListener('change', function() {
    setCookie("switchChecked", switchInput.checked, 30);
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





// COOKIES
function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
};

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
};

function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
};