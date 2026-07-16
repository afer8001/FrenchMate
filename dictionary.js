const words = {

bonjour : "سلام",

chat : "گربه",

chien : "سگ",

manger : "خوردن",

aller : "رفتن"

};

function searchWord(){

const word =
document
.getElementById("searchWord")
.value
.toLowerCase();

const result =
document
.getElementById("result");

if(words[word]){

result.textContent =
words[word];

}
else{

result.textContent =
"Word Not Found";

}

}
