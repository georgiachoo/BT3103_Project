import firebase from 'firebase/compat/app'

/*const firebaseConfig = {
    apiKey: "AIzaSyDUwI_RNBITayvz2cb-JvQAiy1f0YbFLno",
    authDomain: "bt3103-f6b2e.firebaseapp.com",
    projectId: "bt3103-f6b2e",
    storageBucket: "bt3103-f6b2e.appspot.com",
    messagingSenderId: "588147986857",
    appId: "1:588147986857:web:66f43af419da6e2b6474b8"
  };*/
  const firebaseConfig = {
    apiKey: "AIzaSyBFey_PtGKxSJhpspHGQlyPFKv-6m5frs8",
    authDomain: "bt3103demo-16937.firebaseapp.com",
    projectId: "bt3103demo-16937",
    storageBucket: "bt3103demo-16937.appspot.com",
    messagingSenderId: "293423883020",
    appId: "1:293423883020:web:1c8593e35965a60352df29"
  };
  

firebase.initializeApp(firebaseConfig);

export default firebase;