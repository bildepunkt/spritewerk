/* eslint-disable */

function getHighlightedCode (code) {
    return Prism ? Prism.highlight(code, Prism.languages.javascript) : contents
}

function loadFileText (path, selector) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", path, true);

    xhr.onload = function() {
        if (this.status == 200) {
            document.querySelector(selector).innerHTML = getHighlightedCode(this.responseText);
        }
    };

    xhr.send();
}

window.onload = function () {
    loadFileText("main.js", "#demo");
};
