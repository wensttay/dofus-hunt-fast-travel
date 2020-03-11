var posRegex = new RegExp(/\[-?([1-9][0-9][0-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9]|[1-9]),-?([1-9][0-9][0-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9]|[1-9])\]/g);
var x = document.getElementById('x');
var y = document.getElementById('y');

x.addEventListener('paste', (event) => {
    if (switchInput.checked) {
        event.preventDefault();
        updatePos(getPos((event.clipboardData || window.clipboardData).getData('text'))); 
    }
});


y.addEventListener('paste', (event) => {
    if (switchInput.checked) {
        event.preventDefault();
        updatePos(getPos((event.clipboardData || window.clipboardData).getData('text'))); 
    }
});

function updatePos(xy){
    if (xy != undefined) {
        x.value = xy[0];
        y.value = xy[1];
    }
}

function getPos(text) {
    text = cleanSpaces(text);

    if (isPos(text)) {
        let xy = getMatch(text, posRegex, 0);
        let x = getMatch(xy, /-?([1-9][0-9][0-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9]|[1-9])/g, 0);
        let y = getMatch(xy, /-?([1-9][0-9][0-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9]|[1-9])/g, 1);
        return [x, y];
    }
}

function cleanSpaces(text) {
    return text.replace(/\s/g,'');
} 

function isPos(text) {
    return posRegex.test(text);
}

function getMatch(text, regex, index) {
    return text.match(regex)[index];
}
