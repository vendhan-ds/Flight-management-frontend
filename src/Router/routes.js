import {FlightList, Login,Register} from "../Pages";

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
    {
        title : "Provider",
        path : "/provider",
        description : "Provider Dashboard",
        element  : <FlightList company="AirIndia"/>,
    },
];


export default routes;