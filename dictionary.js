let words = [];

fetch("dictionary.json")
.then(response => response.json())
.then(data => {

    words = data;

});

function searchWord(){

    const word =
    document
    .getElementById("searchWord")
    .value
    .toLowerCase();

    const result =
    document
    .getElementById("result");

    const found =
    words.find(
        item =>
        item.word.toLowerCase() === word
    );

    if(found){

        result.textContent =
        found.meaning;

    }
    else{

        result.textContent =
        "Word Not Found";

    }

}
