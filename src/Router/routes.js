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
    {
        title : "Provider",
        path : "/provider",
        description : "Provider Dashboard",
        element  : <FlightList company="AirIndia"/>,
    },
    {
        title : "Customer",
        path : "/customer",
        description : "Customer Dashboard",
        element  : <Dashboard/>,
    },
];


export default routes;