const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

const dataObjectFromFile = require('./fire-data.json');



console.log('data file ', dataObjectFromFile);

// var myData = JSON.parse(dataObjectFromFile);

// console.log('loaded data as object', myData);

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

// dataObjectFromFile.characters.forEach(function(char) {
//   console.log('character: ', char);
//   db.collection("characters").add(char)
//     .then(function(docRef) {
//     console.log("Document written with ID: ", docRef.id);
//   })
//     .catch(function(error) {
//       console.error("Error adding document: ", error);
//     });
// });

// characters
dataObjectFromFile.characters.forEach(function(char) {
  console.log('character: ', char.idCharacter);
  db.collection("characters").doc(char.idCharacter).set(char)
    .then(function(docRef) {
    console.log("character doc written : ", docRef);
  })
    .catch(function(error) {
      console.error("Error setting doc: ", error);
    });
});

// games

// gamechats
// dataObjectFromFile.gameChats.forEach(function(chat) {
//   console.log('chat: ', chat.message);
//   db.collection("gameChats").add(chat)
//     .then(function(docRef) {
//     console.log("gameChat written with ID: ", docRef.id);
//   })
//     .catch(function(error) {
//       console.error("Error adding document: ", error);
//     });
// });
dataObjectFromFile.gameChats.forEach(function(chat) {
  console.log('gameChat: ', chat.idGame);
  db.collection("gameChats").doc(chat.idGame).set(chat)
    .then(function(docRef) {
      console.log("dhat doc written : ", docRef);
    })
    .catch(function(error) {
      console.error("Error setting doc: ", error);
    });
});

// var menu =[
//   {
//     "id":1,
//     "name":"Focaccia al rosmarino",
//     "description":"Wood fired rosemary and garlic focaccia",
//     "price":8.50,
//     "type":"Appetizers"
//   },
//   {
//     "id":2,
//     "name":"Burratta con speck",
//     "description":"Burratta cheese, imported smoked prok belly prosciutto, pached balsamic pear",
//     "price":13.50,
//     "type":"Appetizers"
//   }
// ]
//
// menu.forEach(function(obj) {
//   db.collection("menu").add({
//     id: obj.id,
//     name: obj.name,
//     description: obj.description,
//     price: obj.price,
//     type: obj.type
//   }).then(function(docRef) {
//     console.log("Document written with ID: ", docRef.id);
//   })
//     .catch(function(error) {
//       console.error("Error adding document: ", error);
//     });
// });
