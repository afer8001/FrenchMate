function renderWord(found){

if(!found){

document.getElementById("content").innerHTML = `
<h2>Word Not Found</h2>
`;

return;
}

document.getElementById("content").innerHTML = `

<div class="header-card">

<h1>
${found.word}
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

</div>

`;

}
