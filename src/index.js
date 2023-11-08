import React from 'react';
import { MantineProvider } from '@mantine/core';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './firebase-messaging-sw';

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpweQiQjEsLhwsava3OkKLrutUd07vAo4",
  authDomain: "flightmanagement-firebase.firebaseapp.com",
  projectId: "flightmanagement-firebase",
  storageBucket: "flightmanagement-firebase.appspot.com",
  messagingSenderId: "822635734769",
  appId: "1:822635734769:web:6a9491d1ab1b6c73bdab50",
  measurementId: "G-W23QYDREZG"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MantineProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </MantineProvider>
);

const getAllDocs = async () => {
  const querySnapshot = await getDocs(collection(db, "userFCM"));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
}

// getAllDocs();

const setDocData = async (user, FCM) => {
  await setDoc(doc(db, "userFCM", user), {
    FCMToken: FCM,
  }, {merge : true});
}
var user = window.sessionStorage.getItem("username");
var FCM = window.sessionStorage.getItem("FCMToken");
if(user)
{
  setDocData(user, FCM)
}

