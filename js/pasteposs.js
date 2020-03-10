var possRegex = new RegExp(/\[-?([1-9]|[1-9][0-9]|[1-1][0-0][0-0]),-?([1-9]|[1-9][0-9]|[1-1][0-0][0-0])\]/g);
var x = document.getElementById('x');
var y = document.getElementById('y');

x.addEventListener('paste', (event) => {
    event.preventDefault();
    updatePoss(getPoss((event.clipboardData || window.clipboardData).getData('text'))); 
});


y.addEventListener('paste', (event) => {
    event.preventDefault();
    updatePoss(getPoss((event.clipboardData || window.clipboardData).getData('text'))); 
});

function updatePoss(xy){
    x.value = xy[0];
    y.value = xy[1];
}

function getPoss(text) {
    text = cleanSpaces(text);

    if (isPoss(text)) {
        let xy = getMatch(text, possRegex, 0);
        let x = getMatch(xy, /-?([1-9]|[1-9][0-9]|[1-1][0-0][0-0])/g, 0);
        let y = getMatch(xy, /-?([1-9]|[1-9][0-9]|[1-1][0-0][0-0])/g, 1);
        return [x, y];
    }
}

function cleanSpaces(text) {
    return text.replace(/\s/g,'');
} 

function isPoss(text) {
    return possRegex.test(text);
}

function getMatch(text, regex, index) {
    return text.match(regex)[index];
}
