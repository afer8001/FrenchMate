const FrenchMate = {

loadedWords: [],

currentWord: null,

favorites: JSON.parse(
localStorage.getItem("favorites")
) || []

};
