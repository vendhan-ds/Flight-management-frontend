importScripts(
    "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
  );
  importScripts(
    "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
  );
  
  const firebaseConfig = {
      apiKey: "AIzaSyCovKxA3pm9h9e3edAzj958XDGegrTj8hg",
      authDomain: "flightmanagement-bc790.firebaseapp.com",
      projectId: "flightmanagement-bc790",
      storageBucket: "flightmanagement-bc790.appspot.com",
      messagingSenderId: "897119735824",
      appId: "1:897119735824:web:22dfce00409ee34a33ba95",
      measurementId: "G-005YLG7CBN"
  };
  // Initialize the Firebase app in the service worker by passing the generated config
  
  firebase.initializeApp(firebaseConfig);
  
  const messaging = firebase.messaging();
  
  messaging.onBackgroundMessage(function (payload) {
    console.log("Received background message ", payload);
  
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });