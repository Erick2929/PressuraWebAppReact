import firebase from "firebase/app";
import 'firebase/auth'

const app = firebase.initializeApp({

    apiKey: process.env.FIREBASE_apiKey,
    authDomain: process.env.FIREBASE_authDomain,
    projectId: process.env.FIREBASE_projectId ,
    storageBucket: process.env.FIREBASE_storageBucket ,
    messagingSenderId: process.env.FIREBASE_messagingSenderId ,
    appId: process.env.FIREBASE_appId

})

export const auth = app.auth()
export default app