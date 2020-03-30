import firebase from 'firebase/app'
import 'firebase/firebase-firestore'
import 'firebase/firebase-functions'
import 'firebase/firebase-database'

const firebaseConfig = {
    // API key is public and required to connect
    apiKey: "AIzaSyBwiuE2VZI9bM21dbpJ9MgJbs0A-5IJtaE",
    authDomain: "micro-harbor-239311.firebaseapp.com",
    databaseURL: "https://micro-harbor-239311.firebaseio.com",
    projectId: "micro-harbor-239311",
    storageBucket: "micro-harbor-239311.appspot.com",
    messagingSenderId: "521646409448",
    appId: "1:521646409448:web:633791726ff0795c56eb5d"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export const fbStore = firebase.firestore()
export const fbFunctions = firebase.functions()
export const fbDatabase = firebase.database()