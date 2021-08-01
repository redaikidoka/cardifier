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

// users
dataObjectFromFile.users.forEach(function (user) {
  console.log('processing user: ', user.idUser);
  db.collection("users").doc(user.idUser).set(user)
    .then(function (docRef) {
      console.log(user.idUser, " -> user doc written : ", user.userName);
    })
    .catch(function (error) {
      console.error("Error setting doc: ", error);
    });
});
