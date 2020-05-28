window.addEventListener('blur',function(){
    if (document.activeElement.id == 'aswift_0'){
        setCookie("adClicked", true, 30);
    }
});

// SWITCH
var switchDivAd = document.createElement('div');
switchDivAd.classList.add('switch-box');
switchDivAd.classList.add('switch-box-ad');

var switchLabelAd = document.createElement('label');
switchLabelAd.id = 'switchAd';
switchLabelAd.classList.add('switch');
switchLabelAd.title = chrome.i18n.getMessage("switch_ad");

var switchInputAd = document.createElement('input');
switchInputAd.type = 'checkbox';
switchInputAd.checked = adWasClicked() && switchWasChecked();

var switchSpanAd = document.createElement('span');
switchSpanAd.classList.add('slider');
switchSpanAd.classList.add('round');

switchLabelAd.appendChild(switchInputAd);
switchLabelAd.appendChild(switchSpanAd);
switchDivAd.appendChild(switchLabelAd);

document.getElementById('bottomBox').appendChild(switchDivAd);
toggleAd();

switchInputAd.addEventListener('change', function() {
    if (adWasClicked()) {
        setCookie("switchInputAdChecked", switchInputAd.checked, 30);
        toggleAd();   
    } else {
        switchInputAd.checked = false;
        alert(chrome.i18n.getMessage("switch_ad_alert"));
    }
});

function toggleAd() {
    let display = switchInputAd.checked ? 'display: none;' : 'display: block;';
    document.getElementById('bottomBoxBackground').style = display;
    document.getElementById('bottomBoxContent').style = display;
    document.getElementById('donate').style = display;
}

function adWasClicked() {
    let adClicked = getCookie("adClicked");
    return adClicked != null && adClicked;
}

function switchWasChecked() {
    let switchInputAdChecked = getCookie("switchInputAdChecked");
    return switchInputAdChecked != null && switchInputAdChecked;
}