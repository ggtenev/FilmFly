import firebase from 'firebase'
import 'firebase/firebase-firestore'
import 'firebase/firebase-auth'
import 'firebase/firebase-storage'


var firebaseConfig = {
  apiKey: "AIzaSyBTQ7Zps4hqkMqo0ykmlgOTl16HUV_ygOI",
  authDomain: "film-fly-app.firebaseapp.com",
  projectId: "film-fly-app",
  storageBucket: "film-fly-app.appspot.com",
  messagingSenderId: "651534750541",
  appId: "1:651534750541:web:d650b7a058b60ebe145d04",
  measurementId: "G-N3K002K3QH"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

firebase.firestore()
firebase.storage()

export default firebase