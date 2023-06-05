import firebase from 'firebase/compat/app';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyANIAT1993c3syWPB0eaYdk9onsw8aeUAo",
    authDomain: "app-bookwish-778e1.firebaseapp.com",
    projectId: "app-bookwish-778e1",
    storageBucket: "app-bookwish-778e1.appspot.com",
    messagingSenderId: "503616924507",
    appId: "1:503616924507:web:f50be42058a9e87163087e",
    measurementId: "G-B89YYKL1M5"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;