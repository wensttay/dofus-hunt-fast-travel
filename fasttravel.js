$('#hintName').addEventListener('change', function() {
    var button = document.createElement("button");
    button.innerHTML = "GO"; 
    button.id = "cords";
    button.style = " font-size: 20px; background-color: #2f2f2f; color: rgb(204, 204, 204); width: 60px; float: right; position: relative; margin-top: -35px; margin-right: 5px; z-index: 100;"
    
    button.addEventListener("click", function() {
        navigator.clipboard.writeText("/travel " 
        + currentSelectedHint.x 
        + " " 
        + currentSelectedHint.y);
    });

    var child = document.getElementById('cords');
    if (child != undefined) {
        child.parentNode.removeChild(child);
        document.getElementById('result').appendChild(button);
    } else { 
        document.getElementById('result').appendChild(button);
    }
});