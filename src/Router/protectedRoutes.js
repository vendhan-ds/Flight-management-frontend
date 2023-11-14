import {Dashboard, FlightList} from "../Pages";


const protectedRoutes = [
    
    {
        title : "Customer",
        path : "/customer",
        description : "Customer Dashboard",
        element  : <Dashboard/>,
    },
    {
        title : "Provider",
        path : "/provider",
        description : "Provider Dashboard",
        element  : <FlightList company="AirIndia"/>,
    },
];


export default protectedRoutes;