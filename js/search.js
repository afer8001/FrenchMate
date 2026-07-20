async function searchWord(word){

if(!word) return null;

const firstLetter =
word[0].toLowerCase();

await loadLetter(firstLetter);

const found =
FrenchMate.loadedWords.find(
item =>
item.word.toLowerCase() ===
word.toLowerCase()
);

return found || null;

}
