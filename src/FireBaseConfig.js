import { initializeApp } from "firebase/app";
import { getFirestore,doc, setDoc, collection, getDocs } from "firebase/firestore"; 
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyCovKxA3pm9h9e3edAzj958XDGegrTj8hg",
    authDomain: "flightmanagement-bc790.firebaseapp.com",
    projectId: "flightmanagement-bc790",
    storageBucket: "flightmanagement-bc790.appspot.com",
    messagingSenderId: "897119735824",
    appId: "1:897119735824:web:22dfce00409ee34a33ba95",
    measurementId: "G-005YLG7CBN"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

  const messaging = getMessaging(app);

  export const gettoken = () => {
    return getToken(messaging, {
      vapidKey: "BILCCmQ8auwVaGvW4Y7tcQt8iX5wPJbltjkmEHGwDH856DFuq74AhOWeLFkBTNTF_hVJfdBwr28TBh2gZHUC2bo",
    })
      .then((currentToken) => {
        if (currentToken) {
          console.log(currentToken);
          window.sessionStorage.setItem("FCMToken", currentToken);
          console.log("Token generated successfully ");
          // Track the token -> client mapping, by sending to backend server
          // show on the UI that permission is secured
        } else {
          console.log(
            "No registration token available. Request permission to generate one."
          );
          // shows on the UI that permission is required
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
        // catch error while creating client token
      });
  };
  
  export const onMessageListener = () =>
    new Promise((resolve) => {
      onMessage(messaging, (payload) => {
        resolve(payload);
      });
    });

    export const setDocData = async (user, FCM) => {
      await setDoc(doc(db, "userFCM",user), {
        username: user,
        FCMToken: FCM,
      }, {merge:true});
    }