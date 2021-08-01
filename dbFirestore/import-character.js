const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

const dataObjectFromFile = require('./fire-data.json');

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyCkKKSqbGqlH77JpjVYiUNdDgtghTms6-g",
  authDomain: "cardifier-test.firebaseapp.com",
  projectId: "cardifier-test",
  storageBucket: "cardifier-test.appspot.com",
  messagingSenderId: "910809679109",
  appId: "1:910809679109:web:6030dd582f02683c1e636c",
  measurementId: "G-01Z6BD1L9X"
});

var db = firebase.firestore();

// characters <- games
dataObjectFromFile.characters.forEach(function (char) {
  console.log('processing character: ', char.idCharacter);
  db.collection("games").doc(char.idGame)
    .collection("characters").doc(char.idCharacter).set(char)
    .then(function (docRef) {
      console.log(char.idGame, " -> characters doc written : ", char.idCharacter);
    })
    .catch(function (error) {
      console.error("Error setting doc: ", error);
    });
});
