import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyBpweQiQjEsLhwsava3OkKLrutUd07vAo4",
    authDomain: "flightmanagement-firebase.firebaseapp.com",
    projectId: "flightmanagement-firebase",
    storageBucket: "flightmanagement-firebase.appspot.com",
    messagingSenderId: "822635734769",
    appId: "1:822635734769:web:6a9491d1ab1b6c73bdab50",
    measurementId: "G-W23QYDREZG"
};


export function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      const app = initializeApp(firebaseConfig);
      const messaging = getMessaging(app);
      getToken(messaging, {
        vapidKey:
          "BGd9P5t9zpcD3ZNxyXexeqyTDxssxDk05zKr3ezbV1GEvo_TUpk3qZIi-VVpXI3n9-VUAqhheRxKTbGM2hVINfc",
      })
      .then((currentToken) => {
        if (currentToken) {
          console.log("currentToken: ", currentToken);
          // window.sessionStorage.setItem("FCMToken", currentToken);
        } else {
          console.log("Can not get token");
        }
      });
    } else {
      console.log("Do not have permission!");
    }
  });
}

