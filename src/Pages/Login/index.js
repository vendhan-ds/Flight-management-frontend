import axios from 'axios'
import { useState} from 'react'
//import { Container } from '@mantine/core'
import img from "../Assets/flight-booking.jpg"
import {Switch ,TextInput, Button ,Container, Center, Text, Image } from '@mantine/core'
import { useNavigate } from 'react-router-dom'



const Login = () => {
  sessionStorage.clear()
  const [name,setname]=useState("Name")
  const [pass,setpass]=useState()
  const [about,setabout]=useState("enter a few words")
  const [type,settype]=useState(0)
  const [reg,setreg]=useState(0)
  const [email,setemail]=useState("example.com")
  const navigate = useNavigate();

  function sendpost(){
    console.log("sendpost")
    var data1={name:name, password:pass, about:about, type:type, email:email}
    var data2={name:name,password:pass}
    

    if(reg){
      axios.post('http://localhost:5000/login/register',data1).then((res)=>{
        //console.log(res.data)
      })
      setreg(0)
      
    }else{
      window.sessionStorage.setItem("username",name)
      console.log("logger")
      var usr
      //console.log(data1)
      window.sessionStorage.setItem("username",name)
      try{
        axios.post('http://localhost:5000/login/login',data2).then((res)=>{
          console.log("returned")
          console.log(res.data.message)
            if(res.data.message=='Invalid'){
              alert("Error : incorrect password and user")
            }
            else{
              console.log(res.data.user)
            usr=res.data.user
            let typ=Number(usr.type)
            
          if(typ!=1){
            window.sessionStorage.setItem("name",name)
            navigate('/provider/',{state:{name:name}});
          }else{
            console.log("checkk")
            console.log(usr)
            window.sessionStorage.setItem("custName",usr.name)
            window.sessionStorage.setItem("custMail",usr.email)
            window.sessionStorage.setItem("custId",usr.ID)
            navigate('/customer/',{state:{deet:usr}});
            }

            }
            
          })
        }
        catch(err){
          alert("Error : incorrect password and user")
        }
      
      
    }
  }
//0:Provider ,1:Consumer
  function togl(){
    if(reg){setreg(0)}
    else setreg(1)
  }
  function togl2(){
    if(type){settype(0)}
    else settype(1)
    if(type){settype(0)}
    else settype(1)
  }


  return (
    <div>
      <Center mt={'0.5%'}>
        <Image src={img}/>
      </Center>
      <Center>
        <Text style={{fontSize: 60}}>Flight Booking</Text>
      </Center>
      <Center >
        {reg===1 && (<Text style={{fontSize: 30}}>Register</Text>)}
        {reg===0 && (<Text style={{fontSize: 30}}>Login</Text>)}
        <Switch ml={'md'} mt={'xs'} onChange={togl2} size="lg" onLabel="Customer" offLabel="Provider"/>
      </Center>
      
      <Container size={"20%"}>
      
      {reg===1 && (<TextInput
              label="Email"
              placeholder="Your email"
              onChange={(event) => setemail(event.currentTarget.value)}
              radius="md"
            />)}
          <TextInput
              label="Name"
              placeholder={name}
              onChange={(event) => setname(event.currentTarget.value)}
              radius="md"
            />
            <TextInput
              label="Password"
              type='password'
              placeholder="Your password"
              value={pass}
              onChange={(event) => setpass(event.currentTarget.value)}
              radius="md"
            />
            <Center>
            
            </Center>
            {reg===1 && (<TextInput
              label="About"
              placeholder="Enter your details"
              onChange={(event) => setabout(event.currentTarget.value)}
              radius="md"
            />)}
            <Center mt={'1%'}>
              <Button mt={'xs'} mr={20} onClick={togl}>{reg===0?"Register":"Login"}</Button>
              <Button onClick={sendpost} mt={'xs'}>Submit</Button>
            </Center>
      </Container>
    </div>
  )
}

export default Login

