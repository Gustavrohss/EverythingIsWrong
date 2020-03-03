const firebaseConfig = {
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

// Used in js as well, might be moved there entirely!
// Possibly integrated into redux?

export const FIRESTORE = firebase.firestore()
export const FUNCTIONS = firebase.functions()
export const DATABASE = firebase.database()