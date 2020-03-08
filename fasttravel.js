document.getElementById('hintName').addEventListener('change', function() {
    var button = document.createElement('button');
    button.innerHTML = 'GO'; 
    button.id = 'cords';
    button.style = ' font-size: 20px; background-color: #2f2f2f; color: rgb(204, 204, 204); width: 60px; float: right; position: relative; margin-top: -35px; margin-right: 10px; z-index: 100;'
    
    // The extension doesn't have access to page variables
    // [TODO]: Search a better way to do that
    button.addEventListener('click', function() {
        var cords = document.getElementById('secondLine')
            .innerHTML
            .split("[").join("")
            .split("]").join("")
            .split("<span>").join("")
            .split("</span>").join("")
            .split(" ").join("")
            .split(";").join(" ");

        navigator.clipboard.writeText("/travel " + cords);
    });

    var child = document.getElementById('cords');
    if (child != undefined) {
        child.parentNode.removeChild(child);
        document.getElementById('result').appendChild(button);
    } else { 
        document.getElementById('result').appendChild(button);
    }
});

