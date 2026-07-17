let words = [];

fetch("dictionary.json")
.then(response => response.json())
.then(data => {

    words = data;

});

function speakFrench(text){

speechSynthesis.cancel();

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

<p>
<strong>مثال:</strong>
${found.example}

<button
onclick="speakFrench('${found.example}')">
🔊
</button>

</p>

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

    searchWord();
    
};

suggestions.appendChild(div);

});

}

window.onload = () => {

const params =
new URLSearchParams(
window.location.search
);

const word =
params.get("word");

if(word){

document
.getElementById("searchWord")
.value = word;

searchWord();

}

};

function showWordPage(found){

document.getElementById("content").innerHTML = `

<h1>
${found.word}
<button onclick="speakFrench('${found.word}')">
🔊
</button>
</h1>

<p><b>Type:</b> ${found.type || "-"}</p>

<p><b>Pronunciation:</b> ${found.pronunciation || "-"}</p>

<p><b>Meaning:</b> ${found.meaning || "-"}</p>

<p><b>Example:</b> ${found.example || "-"}</p>

<p><b>Translation:</b> ${found.translation || "-"}</p>

`;

}
