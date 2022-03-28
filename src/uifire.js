import firebase from 'firebase/compat/app'

const firebaseConfig = {
    apiKey: "AIzaSyDUwI_RNBITayvz2cb-JvQAiy1f0YbFLno",
    authDomain: "bt3103-f6b2e.firebaseapp.com",
    projectId: "bt3103-f6b2e",
    storageBucket: "bt3103-f6b2e.appspot.com",
    messagingSenderId: "588147986857",
    appId: "1:588147986857:web:66f43af419da6e2b6474b8"
  };
  

firebase.initializeApp(firebaseConfig);

export default firebase;