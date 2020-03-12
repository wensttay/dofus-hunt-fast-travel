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

    navigator.clipboard.writeText(cords);
};
