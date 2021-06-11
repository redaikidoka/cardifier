// Firebase App (the core Firebase SDK) is always required and must be listed first
const firebase = require('firebase')

const firebaseConfig = {
  apiKey: "AIzaSyCkKKSqbGqlH77JpjVYiUNdDgtghTms6-g",
  authDomain: "cardifier-test.firebaseapp.com",
  databaseURL: "https://cardifier-test-default-rtdb.firebaseio.com",
  projectId: "cardifier-test",
  storageBucket: "cardifier-test.appspot.com",
  messagingSenderId: "910809679109",
  appId: "1:910809679109:web:6030dd582f02683c1e636c",
  measurementId: "G-01Z6BD1L9X"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

const userId = 1;

// Callbacks for data events
const userGamesListener = (games) => {
  const gameIds = [];
  games.forEach((child) => gameIds.push(child.key));
  listenGames(gameIds, printObject);
};

// Set up listeners

// Listen the list of user's games and subscribe to them
listenUserGames(userId, userGamesListener);

/**
 * Listen to updates to a user's games 
 */
function listenUserGames(userId, cb) {
  const userGamesRef = database.ref(`users/${userId}/games`);
  userGamesRef.on('value', (snapshot) => {
    cb(snapshot);
  });
}

/**
 * Listen to updates to a list of games
 */
function listenGames(gameIds, cb) {
  gameIds.forEach(gameId => {
    const gamesRef = database.ref(`games/${gameId}`);
    gamesRef.on('value', (snapshot) => cb(snapshot));
  });
}

/**
 * Adds a user to a game
 * @param {} userId 
 * @param {} gameId 
 */
function addUserToGame(userId, gameId) {
  // Set the user id in the game
  const gameUsersRef = database.ref(`games/${gameId}/users`);
  gameUsersRef.set({ [userId]: true });

  // Set the game id in the user
  const userGamesRef = database.ref(`users/${userId}/games`);
  userGamesRef.set({ [gameId]: true });
}

// Utilities

function printObject(o) {
  console.log(JSON.stringify(o));
}

function findMethods(o) {
  return Object.getOwnPropertyNames(o).filter(function(property) {
      return true; //typeof o[property] == "function";
  });
}

// addUserToGame(1, 1);

// async function writeTestData(id, data) {
//   return firebase.database().ref('dummy/').set({
//     data: data
//   }, (e) => {
//     console.log(`Errorrr: ${e}`);
//   });
// }

// async function pushTestData(data) {
//   const dummyRef = database.ref('dummy');
//   const pushRef = dummyRef.push();
//   return pushRef.set({
//     data: data
//   });
// }

// async function listenTestData() {
//   const dummyRef = firebase.database().ref('dummy/-Mbt0BkgPLGDNAvS6n57');
//   dummyRef.on('value', (snapshot) => {
//     const data = snapshot.val();
//     printObject(data);
//   });
// }

// function writeUserData(userId, name, email, imageUrl) {
//   database.ref('users/' + userId).set({
//     username: name,
//     email: email,
//     profile_picture : imageUrl
//   });
// }