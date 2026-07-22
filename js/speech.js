function speakFrench(text){

speechSynthesis.cancel();

const utterance =
new SpeechSynthesisUtterance(text);

utterance.lang = "fr-FR";

speechSynthesis.speak(utterance);

}
