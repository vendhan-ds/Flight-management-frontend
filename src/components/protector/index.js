
import { useEffect,useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Protected = (props) =>{
    const navigate = useNavigate();
    const {children} = props;
    const [logged, setlogged] = useState(null);
    
    const getLogin = async() => {
        console.log("protection")
        console.log(window.sessionStorage.getItem("username"))
        console.log(window.sessionStorage.getItem("custName"))
        let data1=window.sessionStorage.getItem("username")
        let data2=window.sessionStorage.getItem("custName");

        
        if(data1){setlogged(data1);}
        if(data2){setlogged(data2);}

        if(data1 == null && data2==null){
            navigate('/');
        }
    }

    useEffect(() => {
        getLogin();
    },[])

    return logged? children:"Loading";
}

export default Protected;