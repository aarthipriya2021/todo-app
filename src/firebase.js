import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAl42Z8bLN7a3n-kzQPHDpOxGuKvFVIhPw",
    authDomain: "todo-app-f0b26.firebaseapp.com",
    projectId: "todo-app-f0b26",
    storageBucket: "todo-app-f0b26.appspot.com",
    messagingSenderId: "161577162651",
    appId: "1:161577162651:web:08a11740dd65d317b9333e",
    measurementId: "G-WVPTZKM5F7"
})

const db = firebaseApp.firestore();

export { db };
