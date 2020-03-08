chrome.browserAction.onClicked.addListener(function(activeTab){
    var newURL = "https://dofus-map.com/pt/hunt";
    chrome.tabs.create({ url: newURL });
});