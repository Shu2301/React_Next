import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/database';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDGT0-gCzWaHA2_9ztMGHhQQgNZ4OALjWo",
    authDomain: "exercise2-messaging-app.firebaseapp.com",
    projectId: "exercise2-messaging-app",
    storageBucket: "exercise2-messaging-app.appspot.com",
    messagingSenderId: "76676713957",
    appId: "1:76676713957:web:1c529270b2a10fee08730c"
};

const firebaseApp = firebase.initalizeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db