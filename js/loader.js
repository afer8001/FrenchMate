const loadedLetters = {};

async function loadLetter(letter){

letter = letter.toLowerCase();

if(loadedLetters[letter]){
return loadedLetters[letter];
}

try{

const response =
await fetch(`data/${letter}.json`);

const data =
await response.json();

loadedLetters[letter] = data;

return data;

}
catch(error){

console.error(error);

return [];

}

}
