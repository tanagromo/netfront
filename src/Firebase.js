import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyC0VcHis2QhGVEUMIlMs9g_V0uByvppN-8",
    authDomain: "nectflix-t.firebaseapp.com",
    databaseURL: "https://nectflix-t.firebaseio.com",
    projectId: "nectflix-t",
    storageBucket: "nectflix-t.appspot.com", //storage
    messagingSenderId: "369156185760"
  };
  export default firebase.initializeApp(config);