var autocompleteDiv = document.createElement('div');
autocompleteDiv.classList.add('autocomplete');

var autocompleteInput = document.createElement('input');
autocompleteInput.type = 'text';
autocompleteInput.name = 'myCountry';
autocompleteInput.id = 'myInput';
autocompleteInput.autocomplete = 'off';
autocompleteInput.disabled = true;
autocompleteInput.placeholder = document.getElementById('hintName').options[0].text;

autocompleteDiv.appendChild(autocompleteInput);

document.getElementById('hint').appendChild(autocompleteDiv);
document.getElementById('hintName').style = 'display: none;';
document.getElementById('closeBottomBox').style = 'display: none;';
document.getElementById('bottomBox').style = 'display: none;';

var hints = [];
autocomplete(document.getElementById("myInput"), hints);

document.getElementById('directions').addEventListener('click', function() {
    checkResultClassName(100, updateAutoComplete);
});

function checkResultClassName(interval, callback) {
    setTimeout(function(){
        let resultClassName = document.getElementById('result').className;
        if (resultClassName != 'hidden') {
            checkResultClassName(interval, callback);
        } else {
            callback();
        }
    }, interval);
}

function updateAutoComplete() {
    var hintOptions = document.getElementById('hintName').options;
    hints = [];
    for (i = 0; i < hintOptions.length; i++) {
        if  (hintOptions[i].value != 'null') {
            hints.push({text: hintOptions[i].text, value:hintOptions[i].value});
        }
    }
    autocompleteInput.disabled = false;
    autocompleteInput.value = '';
    autocompleteInput.placeholder = document.getElementById('hintName').options[0].text;
    autocomplete(autocompleteInput, hints);
}

function normatize(str) {
    var map = {
        '-' : ' ',
        '-' : '_',
        'a' : 'á|à|ã|â|À|Á|Ã|Â',
        'e' : 'é|è|ê|É|È|Ê',
        'i' : 'í|ì|î|Í|Ì|Î',
        'o' : 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
        'u' : 'ú|ù|û|ü|Ú|Ù|Û|Ü',
        'c' : 'ç|Ç',
        'n' : 'ñ|Ñ'
    };
    
    str = str.toLowerCase();
    
    for (var pattern in map) {
        str = str.replace(new RegExp(map[pattern], 'g'), pattern);
    };

    return str;
};

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;

    /*execute a function when someone writes in the text field:*/

    ['input', 'click'].forEach(function(event) {
        inp.addEventListener(event, function(e) {

            if (event == 'click') {
                this.value = '';
            }

            let val = this.value;
            
            /*close any already open lists of autocompleted values*/
            closeAllLists();
            currentFocus = -1;
            
            /*create a DIV element that will contain the items (values):*/
            let autoCompleteDiv = document.createElement("DIV");
            autoCompleteDiv.id = this.id + "autocomplete-list";
            autoCompleteDiv.classList = "autocomplete-items";

            /*append the DIV element as a child of the autocomplete container:*/
            this.parentNode.appendChild(autoCompleteDiv);

            /*for each item in the array...*/
            for (let i = 0; i < arr.length; i++) {
                /*check if the item starts with the same letters as the text field value:*/
                if (!val || normatize(arr[i].text.toLowerCase()).includes(normatize(val.toLowerCase()))) {
                    autoCompleteDiv.appendChild(
                        createAutoCompleteOption(inp, arr[i], i)
                    );
                }
            }
        });
    });
    
    function createAutoCompleteOption(inp, element, index) {
        /*create a DIV element for each matching element:*/
        let autoCompleteOptionDiv = document.createElement("div");
        autoCompleteOptionDiv.id = 'autoCompleteOption' + index;

        /*insert a input field that will hold the current array item's value:*/
        let autoCompleteOptionOption = document.createElement('option');
        autoCompleteOptionOption.text = element.text;
        autoCompleteOptionOption.value = element.value;
        autoCompleteOptionDiv.appendChild(autoCompleteOptionOption);

        /*execute a function when someone clicks on the item value (DIV element):*/
        autoCompleteOptionDiv.addEventListener("click", function(e) {
            
            /*insert the value for the autocomplete text field:*/
            inp.value = this.getElementsByTagName("option")[0].text;
            let hintName = document.getElementById('hintName');
            hintName.value = this.getElementsByTagName("option")[0].value;
            hintName.dispatchEvent(new Event('change'));

            /*close the list of autocompleted values,
            (or any other open lists of autocompleted values:*/
            closeAllLists();
        });

        return autoCompleteOptionDiv;
    }

    /*execute a function presses a key on the keyboard:*/
    ['keydown'].forEach(function(event) {
        inp.addEventListener(event, function(e) {
            
            let x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode == 40) {
                /*If the arrow DOWN key is pressed, increase the currentFocus variable:*/
                currentFocus++;
                /*and and make the current item more visible:*/
                addActive(x);
                
            } else if (e.keyCode == 38) { //up
                /*If the arrow UP key is pressed, decrease the currentFocus variable:*/
                currentFocus--;
                /*and and make the current item more visible:*/
                addActive(x);

            } else if (e.keyCode == 13) {
                /*If the ENTER key is pressed, prevent the form from being submitted,*/
                e.preventDefault();
                
                if (currentFocus > -1) {
                    /*and simulate a click on the "active" item:*/
                    if (x) x[currentFocus].click();
                }
            }
        });
    });

    /*a function to classify an item as "active":*/
    function addActive(x) {
        if (!x) return false;

        /*start by removing the "active" class on all items:*/
        removeActive(x);

        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
        x[currentFocus].scrollIntoView();
    }

    /*a function to remove the "active" class from all autocomplete items:*/
    function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    
    /*close all autocomplete lists in the document, except the one passed as an argument:*/
    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}