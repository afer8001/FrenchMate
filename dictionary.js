let favorites =
JSON.parse(
localStorage.getItem("favorites")
) || [];

let words = [];

const homePage = `

<div class="hero-card">

<h1>📚 FrenchMate Dictionary</h1>

<h2>Learn French Through Real Usage</h2>

<p>
Definitions • Examples • Synonyms • Phrases
</p>

</div>

<div class="feature-card">

<h2>📖 Dictionary</h2>

<p>
French words with complete definitions and examples.
</p>

</div>

<div class="feature-card">

<h2>🔄 Synonyms & Antonyms</h2>

<p>
Discover similar and opposite words instantly.
</p>

</div>

<div class="feature-card">

<h2>💬 Phrases</h2>

<p>
Learn real French expressions and daily usage.
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

    let antonymsHTML = "";
    
    let synonymsHTML = "";

    let phrasesHTML = "";

    let dictionaryHTML = "";
    
if(found.examples){

found.examples.forEach((ex,index)=>{

examplesHTML += `

<div class="example-item">

<div class="example-header">

<span>
Example ${index + 1}
</span>

<button onclick="speakFrench('${ex.fr}')">
🔊
</button>

</div>

<div class="example-fr">

${ex.fr}

</div>

<div class="example-fa">

${ex.fa}

</div>

</div>

`;

});

}

    if(found.dictionary){

found.dictionary.forEach((item,index)=>{

dictionaryHTML += `

<div class="dictionary-entry">

<div class="dictionary-number">

${index + 1}.

</div>

<div class="dictionary-content">

<div class="dictionary-fr">

${item.meaning_fr}

</div>

<div class="dictionary-fa">

${item.meaning_fa}

</div>

</div>

</div>

`;

});

}
    
    if(found.phrases){

found.phrases.forEach(item=>{

phrasesHTML += `

<div class="example-item">

<div class="example-header">

<span>Phrase</span>

<button onclick="speakFrench('${item.fr}')">
🔊
</button>

</div>

<div class="example-fr">
${item.fr}
</div>

<div class="example-fa">
${item.fa}
</div>

</div>

`;

});

}
    
   if(found.antonyms){

found.antonyms.forEach(item=>{

antonymsHTML += `
<li>
<a href="#" onclick="openWord('${item}')">
${item}
</a>
</li>
`;

});

}
    
    
    if(found.synonyms){

found.synonyms.forEach(item=>{

synonymsHTML += `
<li>
<a href="#" onclick="openWord('${item}')">
${item}
</a>
</li>
`;

});

}
    
document.getElementById("content").innerHTML = `

<button id="homeBtn">
🏠 Home
</button>

<div class="header-card">

<h1>

${found.word}

<button
onclick="toggleFavorite('${found.word}')">

${favorites.includes(found.word)
? "⭐"
: "☆"}

</button>

<button
onclick="speakFrench('${found.word}')">

🔊

</button>

</h1>

<button onclick="speakFrench('${found.word}')">
🔊
</button>

</h1>

<div class="header-fa">

${found.meaning || "-"}

</div>

<div class="header-en">

${found.english || "-"}

</div>

<div class="header-pronunciation">
🔊 ${found.pronunciation || "-"}
</div>

</div>

<div class="shortcut-card">

<a href="#dictionary">
📖 Dictionary
</a>

<a href="#examples">
📝 Examples
</a>

<a href="#phrases">
💬 Phrases
</a>

<a href="#synonyms">
🔄 Synonyms
</a>

<a href="#antonyms">
⚡ Antonyms
</a>

</div>

<div id="dictionary" class="dictionary-card">

<h2>📖 Dictionary</h2>

<div class="dictionary-meta">

${found.type || "-"} •
${found.gender || "-"} •
${found.level || "-"}

</div>

${dictionaryHTML}

</div>

<div id="examples" class="section-card">

<h2>
📖 Examples
</h2>

${examplesHTML}

</div>

<div id="phrases" class="section-card">

<h2>
💬 Phrases
</h2>

${phrasesHTML}

</div>

<div id="synonyms" class="section-card">

<h2>
🔄 Synonyms
</h2>

<ul>

${synonymsHTML}

</ul>

</div>

<div id="antonyms" class="section-card">

<h2>
⚡ Antonyms
</h2>

<ul>

${antonymsHTML}

</ul>

</div>


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

function openWord(word){

const found = words.find(
item =>
item.word.toLowerCase() === word.toLowerCase()
);

if(found){

showWordPage(found);

window.scrollTo({
top:0,
behavior:"smooth"
});

}

}

function toggleFavorite(word){

if(favorites.includes(word)){

favorites =
favorites.filter(
item => item !== word
);

}
else{

favorites.push(word);

}

localStorage.setItem(
"favorites",
JSON.stringify(favorites)
);

manualSearch();

}
