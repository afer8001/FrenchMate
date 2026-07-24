function renderWord(found){

if(!found){

document.getElementById("content").innerHTML=`
<div class="hero-card">
<h1>❌ Word Not Found</h1>
</div>
`;

return;

}

let dictionaryHTML="";
let examplesHTML="";
let phrasesHTML="";
let synonymsHTML="";
let antonymsHTML="";



if(found.dictionary){

found.dictionary.forEach((item,index)=>{

dictionaryHTML+=`

<div class="dictionary-entry">

<div class="dictionary-number">
${index+1}
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



if(found.examples){

found.examples.forEach(ex=>{

examplesHTML+=`

<div class="example-item">

<div class="example-fr">

${ex.fr}

<button
onclick="speakFrench('${ex.fr}')">

🔊

</button>

</div>

<div class="example-fa">
${ex.fa}
</div>

</div>

`;

});

}



if(found.phrases){

found.phrases.forEach(item=>{

phrasesHTML+=`

<div class="example-item">

<div class="example-fr">

${item.fr}

<button
onclick="speakFrench('${item.fr}')">

🔊

</button>

</div>

<div class="example-fa">
${item.fa}
</div>

</div>

`;

});

}



if(found.synonyms){

found.synonyms.forEach(item=>{

synonymsHTML+=`

<li>

<a href="#"
onclick="openWord('${item}')">

${item}

</a>

</li>

`;

});

}



if(found.antonyms){

found.antonyms.forEach(item=>{

antonymsHTML+=`

<li>

<a href="#"
onclick="openWord('${item}')">

${item}

</a>

</li>

`;
});

}



document.getElementById("content").innerHTML=`

<div class="header-card">

<h1>

${found.word}

<button
id="favoriteBtn"
onclick="toggleFavorite('${found.word}')">

${isFavorite(found.word)
? "⭐"
: "☆"}

</button>

<button
onclick="speakFrench('${found.word}')">

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
${found.pronunciation || "-"}
</div>

<div class="dictionary-meta">

${found.type || "-"}

•

${found.gender || "-"}

•

${found.level || "-"}

</div>

</div>


<div class="shortcut-card">

<button onclick="goToSection('dictionary')">
📖 Dictionary
</button>

<button onclick="goToSection('examples')">
📝 Examples
</button>

<button onclick="goToSection('phrases')">
💬 Phrases
</button>

<button onclick="goToSection('synonyms')">
🔄 Synonyms
</button>

<button onclick="goToSection('antonyms')">
⚡ Antonyms
</button>

</div>

<div class="section-card">

<h2>📌 Usage</h2>

<p>

${found.usage || "-"}

</p>

</div>

<div id="dictionary" class="dictionary-card">

<h2>📖 Dictionary</h2>

${dictionaryHTML}

</div>

<div id="examples" class="section-card">

<h2>📝 Examples</h2>

${examplesHTML}

</div>



<div id="phrases" class="section-card">

<h2>💬 Phrases</h2>

${phrasesHTML}

</div>



<div id="synonyms" class="section-card">

<h2>🔄 Synonyms</h2>

<ul>
${synonymsHTML}
</ul>

</div>



<div id="antonyms" class="section-card">

<h2>⚡ Antonyms</h2>

<ul>
${antonymsHTML}
</ul>

</div>

`;

}

function goToSection(id){

const section =
document.getElementById(id);

if(!section) return;

section.scrollIntoView({

behavior:"smooth",

block:"start"

});

}
