document.getElementById('hint').appendChild(switchDiv);
document.getElementById('hintName').addEventListener('change', function() {
    if (switchInput.checked) {
        copyToClipboard();
    }
});

// The extension doesn't have access to page variables
// [TODO]: Search a better way to do that
function copyToClipboard() {
    let cords = document.getElementById('secondLine')
        .innerHTML
        .split("[").join("")
        .split("]").join("")
        .split("<span>").join("")
        .split("</span>").join("")
        .split(" ").join("")
        .split(";").join(" ");

    navigator.clipboard.writeText("/travel " + cords);
};
