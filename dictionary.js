let words = [];

const homePage = `

<button id="homeBtn">
🏠 Home
</button>

<h1>Welcome To FrenchMate</h1>

<p>
Search a word to start learning French.
</p>

<hr>

<div class="feature-card">

<h2>📝 Grammar</h2>

<p>
French grammar lessons coming soon.
</p>

</div>

<div class="feature-card">

<h2>🔄 Conjugation</h2>

<p>
French verb conjugator coming soon.
</p>

</div>

<div class="feature-card">

<h2>🎯 Quiz</h2>

<p>
Interactive quizzes coming soon.
</p>

</div>

`;

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

document.getElementById("searchWord").value =
item.word;

suggestions.innerHTML = "";

showWordPage(item);

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

let examplesHTML = "";

if(found.examples){

found.examples.forEach((ex,index)=>{

examplesHTML += `

<div class="example-box">

<h3>
Example ${index + 1}
<button onclick="speakFrench('${ex.fr}')">
🔊
</button>
</h3>

<p>
${ex.fr}
</p>

<p>
${ex.fa}
</p>

</div>

`;

});

}

document.getElementById("content").innerHTML = `

<button id="homeBtn">
🏠 Home
</button>

<h1>
${found.word}
<button onclick="speakFrench('${found.word}')">
🔊
</button>
</h1>

<div class="word-card">

<h3>معنای فارسی</h3>

<p>
${found.meaning || "-"}
</p>

</div>

<div class="word-card">

<h3>Type</h3>

<p>
${found.type || "-"}
</p>

</div>

<div class="word-card">

<h3>Definition</h3>

<p>
${found.definition_fr || "-"}
</p>

</div>

${examplesHTML}

`;

}


function manualSearch(){

const word =
document
.getElementById("searchWord")
.value
.toLowerCase();

const found =
words.find(
item =>
item.word.toLowerCase() === word
);

if(found){

showWordPage(found);

}
else{

document
.getElementById("content")
.innerHTML = `

<button id="homeBtn">
🏠 Home
</button>

<h2>
Word Not Found
</h2>

`;

}

}

document.addEventListener(
"click",
function(event){

if(event.target.id === "homeBtn"){

document
.getElementById("content")
.innerHTML =
homePage;

}

});

document
.getElementById("searchWord")
.addEventListener(
"keydown",
function(event){

if(event.key === "Enter"){

manualSearch();

}

});
