async function loadLetter(letter){

letter = letter.toLowerCase();

try{

const response =
await fetch(`data/${letter}.json`);

const data =
await response.json();

FrenchMate.loadedWords = data;

return data;

}
catch(error){

console.error(error);

FrenchMate.loadedWords = [];

return [];

}

}
