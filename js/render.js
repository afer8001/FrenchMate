function renderWord(found){

if(!found){

document.getElementById("content").innerHTML = `
<div class="hero-card">
<h1>❌</h1>
<h2>Word Not Found</h2>
</div>
`;

return;

}

let dictionaryHTML = "";

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

document.getElementById("content").innerHTML = `

<div class="header-card">

<h1>${found.word}</h1>

<div class="header-fa">
${found.meaning || "-"}
</div>

<div class="header-en">
${found.english || "-"}
</div>

<div class="header-pronunciation">
${found.pronunciation || "-"}
</div>

</div>

<div class="dictionary-card">

<h2>📖 Dictionary</h2>

<div class="dictionary-meta">

${found.type || "-"} •
${found.gender || "-"} •
${found.level || "-"}

</div>

${dictionaryHTML}

</div>

`;

}
