let favorites =
JSON.parse(
localStorage.getItem("favorites")
) || [];

function isFavorite(word){

return favorites.includes(word);

}

function toggleFavorite(word){

if(isFavorite(word)){

favorites =
favorites.filter(
item => item !== word
);

}else{

favorites.push(word);

}

localStorage.setItem(
"favorites",
JSON.stringify(favorites)
);

}

function showFavorites(){

let html = `

<div class="header-card">

<h1>⭐ Favorites</h1>

</div>

`;

if(favorites.length === 0){

html += `

<div class="section-card">

<p>No favorite words yet.</p>

</div>

`;

}else{

favorites.forEach(word=>{

html += `

<div class="section-card">

<a href="#"
onclick="openWord('${word}')">

${word}

</a>

</div>

`;

});

}

document.getElementById(
"content"
).innerHTML = html;

}
