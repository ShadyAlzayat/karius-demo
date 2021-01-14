import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
  databaseURL: `${process.env.REACT_APP_DATABASE_URL}`,
  projectId: `${process.env.REACT_APP_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_APP_ID}`,
};

let fbConfig = {};

export const initApp = async () => {
  const response = await fetch('/__/firebase/init.json');
  fbConfig = await response.json();
  firebase.initializeApp(fbConfig);
  firebase.firestore(); // <- needed if using firestore
  //   firebase.functions(); // <- needed if using httpsCallable
};

// need IF prod condition
// initApp();
//dev init
firebase.initializeApp(config);

export default firebase;
