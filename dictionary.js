let words = [];

fetch("dictionary.json")
.then(response => response.json())
.then(data => {

    words = data;

});

function speakFrench(text){

const utterance =
new SpeechSynthesisUtterance(text);

utterance.lang = "fr-FR";

speechSynthesis.speak(utterance);

}

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

result.innerHTML = `
<h2>
${found.word}
<button onclick="speakFrench('${found.word}')">🔊</button>
</h2>

<p><strong>نوع:</strong> ${found.type}</p>

<p><strong>تلفظ:</strong> ${found.pronunciation}</p>

<p><strong>معنی:</strong> ${found.meaning}</p>

<p><strong>مثال:</strong> ${found.example}</p>

<p><strong>ترجمه:</strong> ${found.translation}</p>
`;

    }
    else{

        result.textContent =
        "Word Not Found";

    }

}

function showSuggestions(){

const input =
document
.getElementById("searchWord")
.value
.toLowerCase();

const suggestions =
document
.getElementById("suggestions");

suggestions.innerHTML = "";

if(input.length === 0){

return;

}

const matches =
words.filter(
item =>
item.word
.toLowerCase()
.startsWith(input)
);

matches
.slice(0,5)
.forEach(item => {

const div =
document.createElement("div");

div.className =
"suggestion";

div.textContent =
item.word;

div.onclick = () => {

document
.getElementById("searchWord")
.value =
item.word;

suggestions.innerHTML = "";

};

suggestions.appendChild(div);

});

}
