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

let db = firebase.firestore();

// games
dataObjectFromFile.games.forEach(function (game) {
  console.log('game: ', game.idGame, '(', game.gameTitle, ')');
  let docRef = db.collection("games").doc(game.idGame).set(game)
    .then(function (docRef) {
      console.log('- created game', game.idGame);
    })
    .catch(function (error) {
      console.error("Error setting doc: ", game.idGame, error);
    });

});

