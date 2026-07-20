async function searchWord(word){

if(!word) return null;

const firstLetter =
word[0].toLowerCase();

const words =
await loadLetter(firstLetter);

return words.find(
item =>
item.word.toLowerCase() === word.toLowerCase()
);

}
