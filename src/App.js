import Router from './Router';
import "@mantine/core/styles.css"
import { gettoken, onMessageListener, setDocData} from "./FireBaseConfig";

function App() {
  gettoken();
  onMessageListener()
    .then((payload) => {
      console.log(payload);
      alert(payload.notification.title + " " + payload.notification.body)
    })
    .catch((err) => console.log("failed: ", err));

  var user = window.sessionStorage.getItem("username");
  var FCM = window.sessionStorage.getItem("FCMToken");
  console.log("user : ", user)
  console.log("FCM from var: ", FCM)
    
  if(user)
  {
    console.log("Setting user")
    setDocData(user, FCM)
  }


  return (
    <Router />
  );
}

export default App;
