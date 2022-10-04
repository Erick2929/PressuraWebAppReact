import firebase from "firebase/app";
import 'firebase/auth'

const app = firebase.initializeApp({

    apiKey: "AIzaSyB1WGUlDpicPh4AxAxmHMyViVfB4E1azf8",
  authDomain: "pressuraapp.firebaseapp.com",
  projectId: "pressuraapp",
  storageBucket: "pressuraapp.appspot.com",
  messagingSenderId: "780305792682",
  appId: "1:780305792682:web:e0e6079a047f9d1ecc9ad3"
})

export const auth = app.auth()
export default app