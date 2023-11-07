import React, { useEffect } from 'react'
import axios from 'axios'
import { useState} from 'react'
import { Link } from 'react-router-dom'
//import { Container } from '@mantine/core'
import {Switch, Input ,TextInput, Button ,Container } from '@mantine/core'
import { useNavigate } from 'react-router-dom'



const Login = () => {
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
      console.log("logger")
      var usr
      console.log(data1)
      axios.post('http://localhost:5000/login/login',data2).then((res)=>{
        console.log(res.data.user)
        usr=res.data.user
        console.log(usr)
        let typ=usr.type
        console.log("type",typ)
      if(!typ){
        navigate('/../../provider/',{state:{name:name}});
      }else{
        console.log(usr)
        navigate('/../../customer/',{state:{deet:usr}});
      }
      })
      


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
  }


  return (
    <div>
      <Container>
        {reg===1 && (<TextInput
              label="About"
              placeholder="Your about"
              value={about}
              onChange={(event) => setabout(event.currentTarget.value)}
              radius="md"
            />)}
          <br></br>
        {reg===1 && (<TextInput
              label="Email"
              placeholder="Your email"
              value={email}
              onChange={(event) => setemail(event.currentTarget.value)}
              radius="md"
            />)}
          <br></br>
        {reg===1 && (<Switch onChange={togl2} size="md" onLabel="C" offLabel="P"/>)}
          <br></br>
          <TextInput
              label="Name"
              placeholder="Your name"
              value={name}
              onChange={(event) => setname(event.currentTarget.value)}
              radius="md"
            />
            <br></br>
            <TextInput
              label="pass"
              placeholder="Your pwd"
              value={pass}
              onChange={(event) => setpass(event.currentTarget.value)}
              radius="md"
            />
            <br></br>

            <Button onClick={togl}>{reg==0?"Register":"Login"}</Button>
            <br></br><br></br>
        <Button onClick={sendpost}>Submit</Button>
      </Container>
    </div>
  )
}

export default Login



// // import './login.css';
// // import React from 'react';
// // import email_icon from '../Assets/email.png';
// // import password_icon from '../Assets/password.png';
// // import { useNavigate } from 'react-router-dom';
// // import { Button } from '@mantine/core';

// // function Login() {
// //   const navigate = useNavigate();
// //   return (
// //     <div className='container'>
// //       <div className='header'>
// //         <div className='text'>Login</div>
// //         <div className='underline'></div>
// //       </div>
// //       <div className='inputs'>
// //         <select name="type" id="type">
// //           <option value="customer">Customer</option>
// //           <option value="provider">Provider</option>
// //         </select>
// //         <div className='input'>
// //           <img src={email_icon} alt=""/>
// //           <input type='email' placeholder='Email ID'/>
// //         </div>
// //         <div className='input'>
// //           <img src={password_icon} alt=""/>
// //           <input type='password' placeholder='Password'/>
// //         </div>
// //         {/* <div className='forgotPassword'>Forgot Password? <span>Click Here</span></div> */}
// //         <div className='forgotPassword'>New User? <span onClick={() => {navigate('/Register')}}>Click Here</span></div>
// //         <div className='submitcontainer'>
// //           <div className="submit">Login</div>
// //         </div>
// //       </div>
// //     </div>
    
// //   );
// // }

// // export default Login;
// import { useEffect } from 'react';
// import { useToggle, upperFirst } from '@mantine/hooks';
// import { useForm } from '@mantine/form';
// import { Container } from '@mantine/core';
// import {
//   TextInput,
//   PasswordInput,
//   Text,
//   Paper,
//   Group,
//   Button,
//   Divider,
//   Checkbox,
//   Anchor,
//   Stack,
// } from '@mantine/core';
// import axios from 'axios';
// // import { GoogleButton } from './GoogleButton';
// // import { TwitterButton } from './TwitterButton';

// function Login(props) {
//   const [type, toggle] = useToggle(['login', 'register']);
//   const form = useForm({
//     initialValues: {
//       email: '',
//       name: '',
//       password: '',
//       terms: true,
//     },

//     validate: {
//       email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
//       password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
//     },

//   });
  


//   return (
//     <Paper radius="md" p="xl" withBorder {...props}>
      

//       <Container style={{padding:"10%"}}>

//       <form onSubmit={form.onSubmit(() => {})}>
//         <Stack>
//           {type === 'register' && (
            // <TextInput
            //   label="Name"
            //   placeholder="Your name"
            //   value={form.values.name}
            //   onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
            //   radius="md"
            // />
//           )}

//           <TextInput
//             required
//             label="Email"
//             placeholder="hello@mantine.dev"
//             value={form.values.email}
//             onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
//             error={form.errors.email && 'Invalid email'}
//             radius="md"
//           />

//           <PasswordInput
//             required
//             label="Password"
//             placeholder="Your password"
//             value={form.values.password}
//             onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
//             error={form.errors.password && 'Password should include at least 6 characters'}
//             radius="md"
//           />

//           {type === 'register' && (
//             <Checkbox
//               label="I accept terms and conditions"
//               checked={form.values.terms}
//               onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
//             />
//           )}
//         </Stack>

//         <Group justify="space-between" mt="xl">
//           <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
//             {type === 'register'
//               ? 'Already have an account? Login'
//               : "Don't have an account? Register"}
//           </Anchor>
//           <Button type="submit" radius="xl">
//             {upperFirst(type)}
//           </Button>
//         </Group>
//       </form>
//       </Container>

//     </Paper>
//   );
// }

// export default Login
