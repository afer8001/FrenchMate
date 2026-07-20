async function showSuggestions(){

const input =
document
.getElementById("searchWord")
.value
.trim()
.toLowerCase();

const box =
document
.getElementById("suggestions");

box.innerHTML = "";

if(input.length < 1){

box.style.display = "none";
return;

}

const firstLetter =
input[0];

const words =
await loadLetter(firstLetter);

const matches =
words.filter(item =>
item.word
.toLowerCase()
.startsWith(input)
);

if(matches.length === 0){

box.style.display = "none";
return;

}

box.style.display = "flex";

matches
.slice(0,10)
.forEach(item=>{

const div =
document.createElement("div");

div.className =
"suggestion";

div.textContent =
item.word;

div.onclick = ()=>{

document.getElementById(
"searchWord"
).value =
item.word;

box.innerHTML = "";
box.style.display = "none";

manualSearch();

};

box.appendChild(div);

});

}
