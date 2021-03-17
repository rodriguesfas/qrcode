const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const text = urlParams.get('text')

var qrcode = new QRCode("qrcode");

function makeCode() {
    var elText = document.getElementById("text");

    if (!elText.value) {
        alert("Informe alguma coisa ;)");
        elText.focus();
        return;
    }

    if (text) {
        qrcode.makeCode(text);
        var canvas = document.querySelector("#qrcode canvas");
        var img = canvas.toDataURL("image/png");
        // window.location.href = img;
        canvas.toBlob(blob => {
            const objectURL = URL.createObjectURL(blob);
            window.open(objectURL);
        }, 'image/png');
    } else {
        qrcode.makeCode(elText.value);
    }
}

makeCode();

$("#text").
on("blur", function() {
    makeCode();
}).
on("keydown", function(e) {
    if (e.keyCode == 13) {
        makeCode();
    }
});