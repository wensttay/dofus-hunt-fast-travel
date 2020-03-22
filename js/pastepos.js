var posRegex = new RegExp(/-?([1-9][0-9][0-9]|[1-9][0-9]|[0-9])/g);
var x = document.getElementById('x');
var y = document.getElementById('y');

x.addEventListener('paste', (event) => {
    event.preventDefault();
    updatePos(getPos((event.clipboardData || window.clipboardData).getData('text'))); 
});


y.addEventListener('paste', (event) => {
    event.preventDefault();
    updatePos(getPos((event.clipboardData || window.clipboardData).getData('text'))); 
});

function updatePos(xy){
    x.value = xy[0];
    y.value = xy[1];
}

function getPos(text) {
    if (isPos(text)) {
        let x = getMatch(text, posRegex, 0);
        let y = getMatch(text, posRegex, 1);
        return [x, y];
    }

    return [0,0];
}

function isPos(text) {
    return text.match(posRegex).length >= 2;
}

function getMatch(text, regex, index) {
    return text.match(regex)[index];
}
