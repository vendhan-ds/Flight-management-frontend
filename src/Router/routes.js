import {FlightList, Login,Register} from "../Pages";
import Dashboard from "../Pages/Customer";

const routes = [
    {
        title : "Login",
        path : "/",
        description : "Login Page",
        element  : <Login />,
    },
    {
        title : "Register",
        path : "/register",
        description : "Register Page",
        element  : <Register />,
    },
    
    
];


export default routes;